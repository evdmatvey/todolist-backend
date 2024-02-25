import { Validation } from '../../../utils/validation/index';
export class CreateTaskCommand {
  constructor(private _text: string) {}

  textValidator = new Validation<string>(this._text).validateString({
    required: 'Напишите задачу!',
    length: {
      min: 4,
      errorMessage: 'Длина задачи не менее 4 символов!',
    },
  });

  public get text() {
    return this._text;
  }
}
