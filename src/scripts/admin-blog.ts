import {
  deleteInsightPost,
  getInsightPosts,
  saveInsightPost,
  uploadInsightImage,
  type AdminInsightPost,
  type InsightPostInput,
} from '../lib/admin';
import { withBase } from '../utils/links';

const escapeHtml = (value: string | null | undefined) =>
  String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]!);

function localDateTime(value: string | null): string {
  if (!value) return '';
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function initAdminBlog(): void {
  const form = document.querySelector<HTMLFormElement>('[data-blog-form]');
  const list = document.querySelector<HTMLElement>('[data-blog-post-list]');
  const message = document.querySelector<HTMLElement>('[data-blog-message]');
  const imageFile = document.querySelector<HTMLInputElement>('[data-blog-image-file]');
  const imageUrl = document.querySelector<HTMLInputElement>('[data-blog-image-url]');
  const imagePreview = document.querySelector<HTMLImageElement>('[data-blog-image-preview]');
  const imageAlt = document.querySelector<HTMLInputElement>('[data-blog-image-alt]');
  const clearImage = document.querySelector<HTMLButtonElement>('[data-blog-image-clear]');
  const status = document.querySelector<HTMLSelectElement>('[data-blog-status]');
  const scheduleField = document.querySelector<HTMLElement>('[data-blog-schedule-field]');
  const scheduledAt = document.querySelector<HTMLInputElement>('[data-blog-scheduled-at]');
  if (!form || !list || !message || !imageFile || !imageUrl || !imagePreview || !imageAlt || !clearImage || !status || !scheduleField || !scheduledAt) {
    throw new Error('The Insights editor is missing required form elements.');
  }

  let posts: AdminInsightPost[] = [];

  const setMessage = (text: string, isError = false) => {
    message.textContent = text;
    message.className = isError ? 'err' : 'ok';
  };

  const setImage = (url: string, alt: string) => {
    imageUrl.value = url;
    imageAlt.value = alt;
    imagePreview.src = url;
    imagePreview.hidden = !url;
    clearImage.hidden = !url;
  };

  const resetForm = () => {
    form.reset();
    (form.querySelector('[data-blog-id]') as HTMLInputElement).value = '';
    (form.querySelector('[data-blog-author]') as HTMLInputElement).value = 'InnovaTech World';
    setImage('', '');
    scheduledAt.value = '';
    scheduleField.hidden = status.value !== 'scheduled';
    setMessage('');
  };

  const renderPosts = () => {
    if (posts.length === 0) {
      list.innerHTML = '<p class="muted">No Insights posts yet. Create a draft to get started.</p>';
      return;
    }
    list.innerHTML = posts.map((post) => `
      <article class="blog-post-card">
        <h4>${escapeHtml(post.title)}</h4>
        <div class="blog-post-meta">
          <span class="blog-status">${escapeHtml(post.status)}</span>
          <span>${escapeHtml(post.category || 'Uncategorized')}</span>
          <time datetime="${escapeHtml(post.updated_at)}">Updated ${new Date(post.updated_at).toLocaleDateString()}</time>
        </div>
        <p>${escapeHtml(post.description)}</p>
        <div class="blog-post-actions">
          <button type="button" class="btn btn-secondary" data-blog-edit="${escapeHtml(post.id)}">Edit</button>
          ${post.status !== 'draft' ? `<a class="btn btn-secondary" href="${withBase(`/insights/${encodeURIComponent(post.slug)}/`)}">View</a>` : ''}
          <button type="button" class="btn btn-secondary" data-blog-delete="${escapeHtml(post.id)}">Delete</button>
        </div>
      </article>
    `).join('');

    list.querySelectorAll<HTMLButtonElement>('[data-blog-edit]').forEach((button) => {
      button.addEventListener('click', () => {
        const post = posts.find((item) => item.id === button.dataset.blogEdit);
        if (!post) return;
        (form.querySelector('[data-blog-id]') as HTMLInputElement).value = post.id;
        (form.querySelector('[data-blog-title]') as HTMLInputElement).value = post.title;
        (form.querySelector('[data-blog-slug]') as HTMLInputElement).value = post.slug;
        (form.querySelector('[data-blog-description]') as HTMLTextAreaElement).value = post.description;
        (form.querySelector('[data-blog-category]') as HTMLInputElement).value = post.category ?? '';
        (form.querySelector('[data-blog-tags]') as HTMLInputElement).value = post.tags.join(', ');
        (form.querySelector('[data-blog-author]') as HTMLInputElement).value = post.author;
        (form.querySelector('[data-blog-body]') as HTMLTextAreaElement).value = post.body_markdown;
        status.value = post.status;
        scheduledAt.value = localDateTime(post.scheduled_at);
        scheduleField.hidden = status.value !== 'scheduled';
        setImage(post.featured_image_url ?? '', post.featured_image_alt ?? '');
        setMessage(`Editing “${post.title}”.`);
        form.querySelector<HTMLInputElement>('[data-blog-title]')?.focus();
      });
    });

    list.querySelectorAll<HTMLButtonElement>('[data-blog-delete]').forEach((button) => {
      button.addEventListener('click', async () => {
        const post = posts.find((item) => item.id === button.dataset.blogDelete);
        if (!post || !window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
        button.disabled = true;
        const result = await deleteInsightPost(post.id);
        if (!result.ok) {
          setMessage(result.error, true);
          button.disabled = false;
          return;
        }
        posts = posts.filter((item) => item.id !== post.id);
        renderPosts();
        setMessage('Post deleted.');
      });
    });
  };

  const loadPosts = async () => {
    list.innerHTML = '<p class="muted">Loading posts…</p>';
    const result = await getInsightPosts();
    if (!result.ok) {
      list.innerHTML = `<p class="err" role="alert">Could not load posts: ${escapeHtml(result.error)}. Confirm migration 0006 has been applied.</p>`;
      return;
    }
    posts = result.data;
    renderPosts();
  };

  status.addEventListener('change', () => {
    scheduleField.hidden = status.value !== 'scheduled';
    scheduledAt.required = status.value === 'scheduled';
  });

  imageFile.addEventListener('change', async () => {
    const file = imageFile.files?.[0];
    if (!file) return;
    setMessage('Uploading image…');
    const result = await uploadInsightImage(file);
    if (!result.ok) {
      setMessage(result.error, true);
      imageFile.value = '';
      return;
    }
    setImage(result.data.url, imageAlt.value);
    setMessage('Image uploaded. Add alternative text before saving.');
  });

  clearImage.addEventListener('click', () => {
    imageFile.value = '';
    setImage('', '');
  });

  document.querySelector<HTMLButtonElement>('[data-blog-new]')?.addEventListener('click', () => {
    resetForm();
    form.querySelector<HTMLInputElement>('[data-blog-title]')?.focus();
  });
  document.querySelector<HTMLButtonElement>('[data-blog-cancel]')?.addEventListener('click', resetForm);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const saveButton = form.querySelector<HTMLButtonElement>('[data-blog-save]')!;
    if (imageUrl.value && !imageAlt.value.trim()) {
      setMessage('Add alternative text for the featured image.', true);
      imageAlt.focus();
      return;
    }
    if (status.value === 'scheduled' && !scheduledAt.value) {
      setMessage('Choose a publication date and time for scheduled posts.', true);
      scheduledAt.focus();
      return;
    }

    const id = (form.querySelector('[data-blog-id]') as HTMLInputElement).value || undefined;
    const input: InsightPostInput = {
      slug: (form.querySelector('[data-blog-slug]') as HTMLInputElement).value.trim(),
      title: (form.querySelector('[data-blog-title]') as HTMLInputElement).value.trim(),
      description: (form.querySelector('[data-blog-description]') as HTMLTextAreaElement).value.trim(),
      body_markdown: (form.querySelector('[data-blog-body]') as HTMLTextAreaElement).value,
      category: (form.querySelector('[data-blog-category]') as HTMLInputElement).value.trim() || null,
      tags: (form.querySelector('[data-blog-tags]') as HTMLInputElement).value.split(','),
      author: (form.querySelector('[data-blog-author]') as HTMLInputElement).value.trim(),
      status: status.value as InsightPostInput['status'],
      scheduled_at: status.value === 'scheduled' ? new Date(scheduledAt.value).toISOString() : null,
      published_at: id ? posts.find((post) => post.id === id)?.published_at ?? null : null,
      featured_image_url: imageUrl.value || null,
      featured_image_alt: imageUrl.value ? imageAlt.value.trim() : null,
    };

    saveButton.disabled = true;
    setMessage('Saving post…');
    const result = await saveInsightPost(input, id);
    saveButton.disabled = false;
    if (!result.ok) {
      setMessage(result.error, true);
      return;
    }
    posts = [result.data, ...posts.filter((post) => post.id !== result.data.id)];
    posts.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    renderPosts();
    resetForm();
    setMessage(`“${result.data.title}” saved as ${result.data.status}.`);
  });

  void loadPosts();
}
