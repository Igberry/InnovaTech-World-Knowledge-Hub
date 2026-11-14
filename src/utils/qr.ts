import qrcode from 'qrcode-generator';

/**
 * Build a self-contained, scalable QR code as an inline SVG string.
 * Pure JS (no Node APIs), so it works in the browser and in serverless.
 * Error-correction level M survives a little print smudging.
 */
export function qrSvg(text: string, cellSize = 4, margin = 0): string {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize, margin, scalable: true });
}
