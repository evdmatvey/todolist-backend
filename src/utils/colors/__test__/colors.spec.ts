import { Color } from '@/domains/types';
import { Colors } from '../';

describe('Colors', () => {
  it('Colors | should generate correct color', () => {
    const color: Color = Colors.generateColor();
    expect(Colors.isColorCorrect(color)).toBe(true);
  });

  it('Colors | should return false', () => {
    const color: string = '#FFF000';
    expect(Colors.isColorCorrect(color)).toBe(false);
  });

  it('Colors | should return true', () => {
    const color: string = '#3496eb';
    expect(Colors.isColorCorrect(color)).toBe(true);
  });

  it('Colors | should return false', () => {
    const color: string = '3496EB';
    expect(Colors.isColorCorrect(color)).toBe(false);
  });

  it('Colors | should return false', () => {
    const color: string = '#000';
    expect(Colors.isColorCorrect(color)).toBe(false);
  });
});
