export class TaskEntity {
  constructor(
    private readonly _id: string,
    private _text: string,
    private _status: boolean,
    private _folder?: string,
    private _tag?: string,
  ) {}

  public getTaskData() {
    return {
      id: this._id,
      text: this._text,
      folder: this._folder,
      tag: this._tag,
      status: this._status,
    };
  }

  public isSought(searchText: string) {
    return this._text.toLowerCase().includes(searchText.toLowerCase());
  }
}
