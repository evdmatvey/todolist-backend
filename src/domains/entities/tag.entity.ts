import { Color } from '@/domains/types';

export class TagEntity {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _title: string,
    private _color: Color,
  ) {}

  public getTagData() {
    return {
      id: this._id,
      userId: this._userId,
      title: this._title,
      color: this._color,
    };
  }

  public isSought(searchQuery: string): boolean {
    return this._title.toLowerCase().includes(searchQuery);
  }

  public updateColor(color: Color) {
    this._color = color;
  }
}
