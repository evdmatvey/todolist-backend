import { Validation } from '@/utils/validation';

export class CreateTagCommand {
  constructor(
    private readonly _title: string,
    private readonly _userId: string,
  ) {
    const titleValidator = new Validation<string>(this._title).validateString({
      required: 'Укажите название тега!',
      length: {
        min: 4,
        errorMessage: 'Длина названия тега должна быть больше 4 символов!',
      },
    });
  }

  public get title(): string {
    return this._title;
  }

  public get userId(): string {
    return this._userId;
  }
}
