// Minimal type declarations for qrcode-generator (the package ships none).
declare module 'qrcode-generator' {
  interface QRCode {
    addData(data: string, mode?: string): void;
    make(): void;
    createSvgTag(opts?: { cellSize?: number; margin?: number; scalable?: boolean }): string;
    createDataURL(cellSize?: number, margin?: number): string;
    getModuleCount(): number;
    isDark(row: number, col: number): boolean;
  }
  type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
  function qrcode(typeNumber: number, errorCorrectionLevel: ErrorCorrectionLevel): QRCode;
  export = qrcode;
}
