import { Color } from '@/domains/types';

export class Colors {
  private static readonly _colors: Color[] = [
    '#FFFFFF',
    '#000000',
    '#EB3434',
    '#EBA834',
    '#3496EB',
    '#B734EB',
    '#ADADAD',
    '#34C6EB',
  ];

  public static generateColor(): Color {
    const randomIndex = Math.floor(Math.random() * this._colors.length);
    return this._colors[randomIndex];
  }

  public static isColorCorrect(color: string): boolean {
    if (!color.includes('#') || color.length < 7) return false;

    const isCorrect = this._colors.includes(color.toUpperCase() as Color);
    return isCorrect;
  }
}
