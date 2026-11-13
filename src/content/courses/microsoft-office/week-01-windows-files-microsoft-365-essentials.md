---
title: "Windows, Files and Microsoft 365 Essentials"
course: microsoft-office
order: 1
week: 1
summary: "Organise a safe work folder, use File Explorer and understand local, cloud and Office files."
estimatedHours: 8
tools: ["Windows", "File Explorer", "OneDrive", "Microsoft 365 apps"]
downloads:
  - label: "Fictional dummy files list"
    href: "/downloads/microsoft-office/dummy-files-list.md"
  - label: "Folder structure template"
    href: "/downloads/microsoft-office/folder-structure-template.md"
  - label: "Windows shortcuts cheat sheet"
    href: "/downloads/microsoft-office/windows-shortcuts-cheat-sheet.md"
draft: false
---
**Goal:** Build a reliable, safe file routine and understand how Microsoft 365 apps and storage fit together.

## Learning Objectives

By the end of this week, you can:

- Find apps, settings and files using Windows Start, taskbar, search and File Explorer.
- Create folders; copy, move and rename files; recognise extensions and safely work with ZIP files and USB drives.
- Apply a consistent date-first naming pattern and place 15 practice files in a useful folder structure.
- Explain the difference between local storage, cloud storage and synchronised folders.
- Use a view-only OneDrive sharing link with an authorised test recipient and check version history.
- Describe AutoSave, AutoRecover, account safety and basic screenshot, scan and PDF workflows.

## Tools / Accounts Needed This Week

A Windows computer with keyboard and mouse or touchpad, File Explorer, and a local practice folder. A personal Microsoft account or an organisation-provided account is optional for OneDrive and web apps; use only an account you control or are authorised to use. You can practise file management without signing in or buying a subscription. Have a USB drive only if you can scan it safely and it is not the only copy of important files.

## Pre-Session Resources (about 2 hours)

- Search YouTube: **"Kevin Stratvert Windows 11 File Explorer basics folders files"**.
- Search YouTube: **"Kevin Stratvert OneDrive share files version history"**.
- Read the official Microsoft pages for Microsoft 365 for the web and OneDrive in the course Resources list; check account and regional availability.
- Practise opening File Explorer, making a folder and saving a harmless text file. Spend the remaining time sorting the 15 names in the supplied dummy list.

## Lessons

### Lesson 1: The Windows desktop and finding what you need

The desktop is a workspace, not a filing system. The **Start menu** opens apps and account or power controls. The **taskbar** shows pinned and running apps. **Windows Search** can find apps, settings and files. **Settings** is where device, display, network and account options are organised; managed work or school computers may restrict some changes.

Press **Win+E** to open File Explorer and **Win+S** to search. You can pin the apps you use often, but keep the desktop uncluttered. When a setting is hard to locate, search for its name rather than clicking through every page. On a shared computer, check whose Windows account is active before saving or signing in.

### Lesson 2: File Explorer, file types and removable media

In File Explorer, a **folder** groups related files; a **file** contains the document or data. Create a folder from the toolbar or right-click menu. Select a file and use **F2** to rename it. **Copy** makes a second version; **move** changes its location. If you are unsure, copy first and confirm the new copy opens before deleting the original.

The filename extension follows the final dot: `.docx` is a Word document, `.xlsx` an Excel workbook, `.pptx` a PowerPoint presentation, `.pdf` a portable document, and `.csv` plain comma-separated data. Windows may hide known extensions. In File Explorer, use **View → Show → File name extensions** where available. Do not change an extension just to make a file open; changing `report.csv` to `report.xlsx` does not convert it. Open the file in the correct app and use **Save As** or **Export**.

A ZIP file is an archive that can hold many files. Use **Extract all** into a new folder before working with its contents. Do not run a program just because it came inside an archive. Unknown USB drives can carry malicious files or shortcuts. Use only a drive you trust, avoid opening unexpected executables, scan it with current security software, and do not plug in a found device. The [Cybersecurity Foundations course](/courses/cybersecurity/) covers safer device and USB habits in more detail.

| Extension | Common use | Important distinction |
|---|---|---|
| `.docx` | Editable Word document | Keeps document structure and formatting |
| `.xlsx` | Excel workbook | Can hold formulas, multiple sheets and charts |
| `.csv` | Plain tabular data | Does not preserve workbook formatting or formulas |
| `.pdf` | Portable viewing copy | Usually not the best editable source |
| `.zip` | Compressed archive | Extract it before working with its contents |

### Lesson 3: Naming conventions and a work folder system

Names such as `new`, `final-final`, or `document (4)` do not explain what a file is or which version is current. Use the same order each time:

```text
YYYY-MM-DD_Client_Document_v01.ext
```

For example, `2026-11-12_FreshBites_SupplierLetter_v01.docx` is a fictional practice name. The date sorts chronologically, the client or project is visible, the document purpose is clear, and the version is easy to identify. Do not put a real customer's sensitive information into a filename. Avoid slash characters, which Windows does not allow in a file name, and avoid using the extension to describe the content.

Start from the supplied folder structure template. Keep untouched starter files in `00_Inbox_Originals`; make working copies in a suitable project folder; export approved sharing versions into `07_Exports`. Use a consistent convention for spaces or underscores rather than mixing them. When revising, increase the version (`v02`) and keep a brief note about what changed. A file named `final` is not proof that it was reviewed.

To move a file, select it, cut, open the destination and paste. Check the destination before removing the source. When copying many items, use a small test copy first. Sort by **Name**, **Date modified** or **Type** to find things; do not assume that a file is missing just because it is not on the desktop.

### Lesson 4: OneDrive, syncing and sharing permissions

OneDrive stores files online and can synchronise selected folders to a device. A **sync** means changes may travel between the local device and cloud copy. It can help with access across devices, but it is not an independent backup: accidental deletion or unwanted edits may synchronise too. Keep a second copy of important work and check the sync status before relying on an upload.

For the Week 1 exercise, create a practice folder and share it with a second account you own or a recipient explicitly supplied for training. Choose **Can view**, not edit, when read access is enough. Inspect whether the link works for named people or anyone with the link; select the narrowest option that works. After practice, remove access. Never put real client, student or financial records into a training folder. Do not send a sharing link to a stranger or paste it into a public chat.

> **Privacy:** A sharing link is a permission, not just a convenient URL. Use only the fictional practice folder, confirm who can open it, and remove access when the exercise ends.

OneDrive version history can help restore an earlier file version when the feature is available for that account and file. Deleted files may appear in a recycle bin for a limited period, which depends on account type and policy. Locate the file first, then inspect the version or recycle-bin options; do not overwrite a file while trying to recover it. If this is an organisation account, ask its administrator about retention rules.

### Lesson 5: Microsoft 365 apps across devices

Word creates text documents, Excel handles workbooks and tables, PowerPoint builds slide presentations, Outlook handles email and calendar, Teams supports chat and meetings, and OneNote organises notebooks and notes. OneDrive provides cloud file storage and sharing. The exact app set depends on whether you use a personal, school or work account, desktop license, web app or phone.

Free browser versions of Word, Excel and PowerPoint are listed on Microsoft's official page as of November 2026. A connection and supported account are needed for many web tasks, and some advanced features differ from desktop apps. Office 2019/2021 also differ from the current Microsoft 365 Apps. Identify your version before following menu instructions.

**AutoSave** can save changes automatically in supported apps and storage locations; it is not a substitute for checking the save location. **Co-authoring** allows more than one authorised person to work on a supported cloud file. Before collaborating, confirm that you are in the correct copy, know who can edit, and agree how comments and versions will be handled. For private information, use only a policy-approved account.

### Lesson 6: Screenshots, print, scan and PDF

Use the Snipping Tool or **Win+Shift+S** to capture a selected part of the screen. Before sharing a screenshot, close unrelated windows and check that no personal account details, notifications or private records are visible. A screenshot is evidence of a view, not a replacement for the editable file.

Use **File → Print** to preview page count, orientation and margins before printing. If the task is digital, export or save as PDF and reopen the PDF to check the layout. To scan paper, use a trusted scanner or a device app approved for that document. Save the scan to a controlled folder, use a clear filename, and do not scan identity documents into a practice folder.

### Lesson 7: Account safety and fake sign-in pages

Use a unique password for your Microsoft account and enable two-step verification (also called multi-factor authentication) if available. A verification code is a secret; legitimate support staff should not ask you to read it aloud or send it in chat. Store recovery information safely and keep your recovery email or phone current.

Before entering a password, inspect the address bar and confirm the domain is Microsoft's real sign-in page. A logo or familiar colours do not prove a page is genuine. Treat unexpected messages about a locked account, prize or urgent file as suspicious; navigate to the official site yourself rather than tapping the message link. Do not open unexpected attachments, enable macros in a file you did not expect, or approve a sign-in prompt you did not initiate. Report a suspected fake page using the organisation's normal process.

### Lesson 8: Time-saving Windows shortcuts

Learn a few reliable actions before memorising a long list: **Win+E** opens File Explorer, **Win+S** opens search, **Alt+Tab** switches apps, **F2** renames a selection, and **Ctrl+S** saves in most Office apps. The supplied cheat sheet includes more. Shortcuts can vary by device, app and accessibility setup; when unsure, use the menu and read its label.

## Common Mistakes

- Renaming a file extension instead of converting or exporting the file.
- Editing the only copy of a starter or assuming OneDrive sync is a backup.
- Sharing with "Anyone with the link" when a named, view-only recipient would work.
- Moving files before confirming their new location.
- Using a fake sign-in link from an unexpected email or text.
- Taking a screenshot that exposes a private account, message or notification.
- Assuming a free web app has every desktop feature or works offline in the same way.

## Practice Exercises

1. Use Start and Search to open File Explorer, Settings and Word or another text editor.
2. Create the supplied folder structure. Copy a harmless practice file into it, then confirm both copies exist.
3. Show file extensions and explain the difference between `.csv`, `.xlsx` and `.pdf`.
4. Rename all 15 dummy files using the date-first pattern and place them in suitable folders.
5. Create a ZIP archive of a practice folder and extract it to a new location. Do not run any file inside it.
6. If you have OneDrive, share a non-sensitive test folder as view-only with an account you control; then remove access. If you do not have it, describe which permission you would choose and why.
7. Export a short sample note as PDF, reopen it, and check its page layout.
8. Use **Win+Shift+S** to capture only the practice note, then check that no unrelated personal information is visible.

## Weekly Assignment (Due Before Week 2)

Submit a screenshot or checklist of the organised work folder system, all 15 dummy files renamed and correctly placed, a one-page file-naming guide, and evidence that one non-sensitive practice folder was shared with view-only permission to a test address you own or are authorised to use. Remove sharing access after the exercise. If you cannot use OneDrive, submit a short explanation of the permission and recovery steps you would use instead.

**Grading guide:** folder structure 35%, naming consistency 30%, sharing and permissions 20%, guide clarity 15%.

**Definition of done**

- [ ] The folder tree matches the template or a clearly explained equivalent.
- [ ] All 15 filenames use a consistent date-first pattern and correct extension.
- [ ] No real personal or customer data appears in the screenshots.
- [ ] The shared folder is view-only and access is removed after practice, or an approved alternative is documented.
- [ ] The one-page guide explains versioning, local/cloud location and one recovery check.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 min | Check device access, accessibility needs and safe practice folder setup |
| 10–25 min | Demonstrate Start, Search, File Explorer and file extensions |
| 25–45 min | Learners organise sample files and practise copy, move and rename |
| 45–60 min | Discuss local storage, OneDrive sync, view-only links and recovery |
| 60–75 min | Practise PDF export, screenshot cropping and account safety scenarios |
| 75–85 min | Learners explain one naming or permission decision |
| 85–90 min | Review assignment, confirm safe sharing boundaries and next steps |

## Facilitator Notes

Use a device with no private files visible during screen sharing. Do not ask learners to disclose passwords, verification codes or personal Microsoft account information. Provide an offline equivalent for anyone without an account or stable connection. Verify that every learner can locate a local copy before discussing OneDrive recovery. Encourage learners with assistive technology or managed devices to use their normal settings rather than changing them for the class. The dummy files and fictional case are for practice; do not request that learners upload personal documents.

## Self-Check Questions

1. What does changing a file extension do, and how is that different from converting a file?
2. Why is synchronisation not the same as an independent backup?
3. When should you choose a view-only sharing link?
4. Name two signs that a sign-in page might be fake.
5. What should you check before sending a screenshot?
