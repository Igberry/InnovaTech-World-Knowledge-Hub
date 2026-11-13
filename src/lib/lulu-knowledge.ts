import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { resources } from '../data/resources';
import { HIDDEN_SECTION_HEADINGS } from '../config/hidden-sections.mjs';
import { emailUrl, phoneUrl, whatsappUrl, withBase } from '../utils/links';
import { removeHiddenContent, selectKnowledge } from './lulu-content.mjs';

interface KnowledgeDocument {
  title: string;
  content: string;
  reference?: string;
  category?: string;
}

let documentsPromise: Promise<KnowledgeDocument[]> | undefined;

function stripPrivateCourseContent(body: string): string {
  return removeHiddenContent(body, HIDDEN_SECTION_HEADINGS);
}

async function loadPublicKnowledge(): Promise<KnowledgeDocument[]> {
  const [courses, lessons, insights] = await Promise.all([
    getCollection('courses'),
    getCollection('lessons'),
    getCollection('insights'),
  ]);
  const courseBySlug = new Map(courses.map((course) => [course.data.slug, course]));
  const result: KnowledgeDocument[] = [
    {
      title: 'InnovaTech World Knowledge Hub',
      category: 'Business information',
      reference: withBase('/about/'),
      content: [
        site.description,
        `Location: ${site.location}.`,
        `Training services: ${site.services.join(', ')}.`,
        'The website publishes practical digital-skills training, courses, resources and Insights articles.',
        'Course availability, duration and outcomes should be answered from the current published course information. Do not invent prices, schedules, credentials, partnerships, or guaranteed work or income.',
      ].join('\n\n'),
    },
    {
      title: 'Business contact and escalation',
      category: 'Contact',
      reference: withBase('/contact/'),
      content: [
        `Location: ${site.location}.`,
        emailUrl() ? `Email: ${site.contact.email}.` : '',
        phoneUrl() ? `Phone: ${site.contact.phone}.` : '',
        whatsappUrl('training') ? `WhatsApp contact: ${whatsappUrl('training')}.` : '',
        'If a question needs a staff member, is not answered by published information, or concerns a specific enrolment, offer the official Contact page and configured WhatsApp contact.',
      ].filter(Boolean).join('\n\n'),
    },
    {
      title: 'Privacy policy and terms of use',
      category: 'Policies',
      reference: withBase('/privacy/'),
      content: 'For current information about personal data, accounts, retention, website use and legal terms, direct visitors to the published Privacy Policy and Terms of Use. Do not provide legal advice or claim a policy says something not included in the retrieved public content.',
    },
    ...site.services.map((service) => ({
      title: service,
      category: 'Services',
      reference: withBase('/services/'),
      content: `InnovaTech World lists ${service} among its services. Details, availability, scope and pricing should be confirmed with the business through its published contact channels.`,
    })),
    ...resources.map((resource) => ({
      title: resource.title,
      category: resource.category,
      reference: resource.url,
      content: resource.description,
    })),
  ];

  for (const course of courses) {
    const data = course.data;
    result.push({
      title: `${data.title} course`,
      category: data.category,
      reference: withBase(`/courses/${data.slug}/`),
      content: [
        `Status: ${data.status}.`,
        `Level: ${data.level ?? 'not specified'}.`,
        `Duration: ${data.duration ?? 'not specified'}.`,
        `Format: ${data.format ?? 'not specified'}.`,
        `Summary: ${data.summary}`,
        `Outcomes: ${(data.outcomes ?? []).join('; ')}.`,
        `Tools: ${(data.tools ?? []).join(', ')}.`,
        stripPrivateCourseContent(course.body ?? ''),
      ].join('\n\n'),
    });
  }

  for (const lesson of lessons) {
    const course = courseBySlug.get(lesson.data.course);
    if (!course || course.data.status !== 'available' || lesson.data.draft) continue;
    result.push({
      title: `${course.data.title}: ${lesson.data.title}`,
      category: 'Course lesson',
      reference: withBase(`/courses/${course.data.slug}/${lesson.id.split('/').pop()}/`),
      content: stripPrivateCourseContent(lesson.body ?? ''),
    });
  }

  for (const insight of insights) {
    if (insight.data.draft) continue;
    result.push({
      title: insight.data.title,
      category: 'Insights',
      reference: withBase(`/insights/${insight.id.replace(/\.md$/, '')}/`),
      content: stripPrivateCourseContent(insight.body ?? ''),
    });
  }

  return result.filter((document) => document.content.trim().length > 0);
}

export async function getRelevantLuluKnowledge(query: string): Promise<string[]> {
  const currentDocuments = documentsPromise ??= loadPublicKnowledge();
  try {
    const documents = await currentDocuments;
    return selectKnowledge(documents, query, { maxSnippets: 8, maxCharacters: 9000 });
  } catch (error) {
    if (documentsPromise === currentDocuments) documentsPromise = undefined;
    throw error;
  }
}

