---
title: "Setup Guide: Phone Video and Editing Tools"
course: video-editing
order: 0
summary: "Prepare a phone, storage, safe footage, editing software and a recoverable project folder."
estimatedHours: 3
tools: ["Phone camera", "CapCut", "DaVinci Resolve", "Shotcut"]
downloads:
  - label: "Video project folder template"
    href: "/downloads/video-editing/project-folder-template.md"
  - label: "Consent and permission one-pager"
    href: "/downloads/video-editing/consent-and-permission-one-pager.md"
  - label: "Shooting checklist"
    href: "/downloads/video-editing/shooting-checklist.md"
draft: false
---
**Goal:** Set up a safe, simple filming and editing workflow that works with the device and storage you already have.

## Before installing anything

Video editing can use significant storage, memory and battery. Check the free space on the phone and computer, and make a short test recording before planning a large shoot. Keep original footage on the phone or a local drive until you confirm a second copy opens. Cloud synchronisation is useful but is not the same as a separate backup.

Use the official CapCut site at [capcut.com](https://www.capcut.com/), the official DaVinci Resolve page at [Blackmagic Design](https://www.blackmagicdesign.com/products/davinciresolve), or [Shotcut.org](https://shotcut.org/) for downloads and product information. Confirm that the download matches your operating system and hardware. Read the current licence and privacy terms before signing in, uploading media or relying on any feature. Do not use unofficial download mirrors, cracks, key generators or borrowed accounts. Cracked installers can contain malware; the [Cybersecurity Foundations course](/courses/cybersecurity/) covers safer software habits.

CapCut is the primary editor in Weeks 1–5; DaVinci Resolve is the primary editor for Weeks 6–8. Shotcut is an alternative when hardware is limited. This course uses concepts that transfer between editors. Menus, free features, export limits, watermarks and minimum system requirements can change, and were not independently verified on the date this setup guide was written. Review the current official product pages before installation and ask the facilitator if a listed feature is unavailable.

## Prepare the phone and laptop

1. Clean the camera lens with a soft cloth. Check battery health and available storage.
2. Record a 10-second test clip in a quiet, well-lit place. Play it back with headphones and check picture, sound, focus and orientation.
3. Use the camera's normal video mode. If frame rate and resolution options are available, choose a consistent setting for the whole shoot rather than changing them clip by clip. Use 1080p only if the device and storage handle it comfortably; lower settings can be appropriate for a constrained device.
4. Turn on a grid if available. Keep exposure and focus steady by tapping and holding or using the device's lock controls only if supported. The names and gestures differ by phone.
5. Disable notifications or use an appropriate focus mode while filming, but do not disable emergency alerts or safety features. Keep the phone cool, out of direct sun, and away from water.
6. On the laptop, close unneeded applications before editing. Ensure the project and source files are on a drive with enough free space. Do not edit directly from an unreliable USB stick.

### File size and storage planning

File size depends on resolution, frame rate, codec, bitrate, scene detail and recording duration. Do not plan storage from a single universal number. Record a short sample using your planned settings, inspect its size, then estimate:

```text
Estimated footage size = sample file size × planned duration ÷ sample duration
```

For example, if a 10-second test is 24 MB and a shoot may contain 300 seconds, a rough estimate is `24 × 300 ÷ 10 = 720 MB`, before project files and exports. The real result may differ, so leave a margin and check actual free space. Delete only duplicate test files that you can safely identify; do not remove original footage until two verified copies exist.

### Low-spec laptop routine

- Prefer a short timeline and make a copy before testing demanding effects.
- Lower the preview/playback resolution if the editor offers that control; it changes preview smoothness, not necessarily final export quality.
- If the editor supports proxy or optimised media, make small working copies and keep the original clips untouched. The location and settings vary by app.
- Store footage on a fast local drive with free space. Avoid synchronising a large raw-footage folder while editing.
- Close browser tabs and other heavy applications; save before testing a new effect.
- If playback stutters, review a lower-resolution preview, shorten the timeline, or switch to Shotcut or a phone workflow. Do not assume the machine is broken.

## Project folders and backups

Create a separate folder for every project. Use the supplied template:

```text
FreshBites_Project/
  01-Raw/
  02-Audio/
  03-Graphics/
  04-Projects/
  05-Exports/
  06-Archive/
```

Copy original clips into `01-Raw` and treat them as read-only. Put voice recordings and licensed music in `02-Audio`, approved logos and title graphics in `03-Graphics`, editor project files and version notes in `04-Projects`, review and final videos in `05-Exports`, and a final compact delivery package or archive note in `06-Archive`. Name files with date, project, content and version, for example `2026-11-13_FreshBites_MenuCloseup_v01.mp4`. The case and all details are fictional.

Keep two copies on separate storage when possible: for example, the phone plus a computer drive, or a computer plus an external drive. Reopen a sample from the backup to confirm it copied. A second folder on the same drive is not a robust backup against drive failure. When a project includes private client footage, follow the client's retention and deletion instructions rather than keeping it indefinitely.

## Phone shooting basics

Hold the phone with both hands, keep elbows near your body, or rest it against a stable surface. Move deliberately; an unplanned fast pan is difficult to watch. Frame a shot, pause, record a few seconds before the action, let the action happen, and hold briefly before stopping. This gives an editor room to cut. For a moving subject, move your body smoothly only if the surface is safe. Do not walk backward while watching the screen.

Use soft window light when practical. Face the subject toward the light rather than placing a bright window behind them. Avoid mixing a very warm lamp with cool daylight if colour consistency matters. For food or products, move the subject or phone until texture and shape are visible; do not place a hot lamp or phone near an open flame, cooking oil or wet surface.

Audio is part of the shot. Move closer to the speaker, choose a quieter room, pause noisy appliances, and record a few seconds of room tone. If the phone is the only microphone, keep it near but outside the camera frame. Do not record private conversations without permission. A low-cost cardboard reflector or a white sheet of paper can bounce window light; ensure it is not near heat or food.

## Consent, licensing and safety

Before recording an identifiable person, explain where the video may appear, how it may be edited, and whether it is a practice exercise or client work. Ask for explicit permission in a way they understand. If they decline, do not film them. For a private business, event or home, ask the responsible owner or organiser before filming. For minors, obtain permission from a parent or guardian and follow venue rules; do not use a child's image in public practice work.

Use only your own footage, permitted client material, or assets with a licence that covers the planned use. Keep the asset name, source, licence, date checked and any attribution requirements in `licence-log-template.csv`. Save a copy or screenshot of the licence terms when permitted. Do not assume that music available inside an app is cleared for every client, region, account, platform, or monetised use. When uncertain, omit it or seek written permission.

Be alert to trip hazards, road traffic, crowds, cables, heat, weather, electrical equipment and theft. Keep gear secured and do not trespass or obstruct a public path. A gimbal is optional; use it only after learning its controls and keeping the route clear. Drone use is not taught here; do not fly one without checking current local rules, permissions and safety requirements.

## Accessibility and backups

Use a readable title, strong contrast, captions that are proofread, and enough display time to read each line. Keep text away from edges and app controls. Do not use flashing transitions. Make a separate caption file or transcript when the project workflow supports it, and keep a copy of the spoken script. Ask the viewer what access format they need when producing for a real client.

## Setup verification checklist

- [ ] I can record and replay a short test clip with clear picture and sound.
- [ ] I know how much storage a test clip uses and have room for a working copy.
- [ ] I downloaded software only from an official source and checked current terms.
- [ ] I created the project folders and know where original clips are stored.
- [ ] I can make and reopen a second copy of a small test file.
- [ ] I have a safe, consented subject and a plan that does not require filming strangers.
- [ ] I have a backup power and low-data plan before a longer shoot.

## Facilitator Notes

Do not ask learners to install software from unofficial links or provide account credentials. Have an offline editing alternative and paper shot-list exercise ready. Check that the practice subject has given permission and that no private data is visible in the frame. Do not collect copies of learner footage unless they explicitly agree and the storage method is approved.
