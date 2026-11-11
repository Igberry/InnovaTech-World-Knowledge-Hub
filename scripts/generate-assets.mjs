#!/usr/bin/env node
/**
 * Generate favicons, app icons and the default Open Graph image from the brand
 * assets. (WEBSITE-BUILD-PROMPT.md §2.1, §7.10 / §4 public/) Re-run any time the
 * logo changes:  npm run generate:assets
 *
 * Outputs into public/:
 *   - favicon-32.png, favicon-16.png  (from favicon.svg monogram)
 *   - apple-touch-icon.png (180x180, logo on white)
 *   - og-default.png (1200x630 social share image)
 */
import sharp from 'sharp';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public');
const LOGO = join(PUB, 'images', 'logo.png');
const FAVICON_SVG = join(PUB, 'favicon.svg');

const BLUE_50 = '#eaf1f7';
const BLUE_900 = '#04172b';

async function run() {
  if (!existsSync(LOGO)) {
    console.error(`[assets] Missing ${LOGO}. Put the logo there first.`);
    process.exit(1);
  }

  // Favicons & app icon from the LOGO's symbol (crop out the "INNOVATECH" wordmark,
  // which is unreadable at icon sizes). The logo is 447x347 with the symbol on top.
  const region = { left: 91, top: 0, width: 265, height: 265 };
  const transparent = { r: 255, g: 255, b: 255, alpha: 0 };

  // Build a WHITE silhouette of the symbol on a transparent background: use the
  // symbol's darkness as an alpha mask, then fill it white. More visible on dark tabs.
  const alphaRaw = await sharp(LOGO)
    .extract(region)
    .flatten({ background: '#ffffff' })
    .greyscale()
    .negate() // navy symbol -> high (opaque); white bg -> low (transparent)
    .linear(1.25, -10) // boost contrast so the shape is crisp
    .raw()
    .toBuffer();
  const whiteSymbol = await sharp({ create: { width: region.width, height: region.height, channels: 3, background: '#ffffff' } })
    .joinChannel(alphaRaw, { raw: { width: region.width, height: region.height, channels: 1 } })
    .png()
    .toBuffer();

  await sharp(whiteSymbol).resize(32, 32, { fit: 'contain', background: transparent }).png().toFile(join(PUB, 'favicon-32.png'));
  await sharp(whiteSymbol).resize(16, 16, { fit: 'contain', background: transparent }).png().toFile(join(PUB, 'favicon-16.png'));

  // Apple touch icon: white symbol on a navy brand tile (iOS needs an opaque icon).
  const appleSymbol = await sharp(whiteSymbol).resize(150, 150, { fit: 'contain', background: transparent }).toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: '#0b3b66' } })
    .composite([{ input: appleSymbol, gravity: 'center' }])
    .png()
    .toFile(join(PUB, 'apple-touch-icon.png'));

  // Open Graph image: a white card with the logo on a soft blue field + blue bar.
  const card = await sharp({ create: { width: 1000, height: 430, channels: 4, background: '#ffffff' } })
    .composite([
      {
        input: await sharp(LOGO).resize(560, 300, { fit: 'inside' }).toBuffer(),
        gravity: 'center',
      },
    ])
    .png()
    .toBuffer();

  await sharp({ create: { width: 1200, height: 630, channels: 4, background: BLUE_50 } })
    .composite([
      { input: card, gravity: 'center' },
      {
        input: { create: { width: 1200, height: 24, channels: 4, background: BLUE_900 } },
        gravity: 'south',
      },
    ])
    .png()
    .toFile(join(PUB, 'og-default.png'));

  console.log('[assets] Wrote favicon-32.png, favicon-16.png, apple-touch-icon.png, og-default.png to public/.');
}

run();
