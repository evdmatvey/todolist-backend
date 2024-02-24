import { Colors } from '@/domains/types';

export class TagEntity {
  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private _color: Colors,
  ) {}

  public getTagData() {
    return { id: this._id, title: this._title, color: this._color };
  }

  public isSought(searchQuery: string): boolean {
    return this._title.toLowerCase().includes(searchQuery);
  }

  public updateColor(color: Colors) {
    this._color = color;
  }
}
