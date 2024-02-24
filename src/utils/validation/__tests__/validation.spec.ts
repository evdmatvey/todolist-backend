import { Validation } from '../index';

interface MockData {
  title: string;
}

describe('Validation', () => {
  it('required | result should be false', () => {
    const data = { title: '' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage = 'Укажите название!';

    const isTitleExist = () =>
      dataValidator.validate('title', {
        required: errorMessage,
      });

    expect(isTitleExist).toThrow(errorMessage);
  });

  it('required | result should be true', () => {
    const data = { title: 'title' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage = 'Укажите название!';

    const isTitleExist = dataValidator.validate('title', {
      required: errorMessage,
    });

    expect(isTitleExist).toBe(true);
  });

  it('required | result should be false again', () => {
    const data = { title: '  ' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage = 'Укажите название!';

    const isTitleExist = () =>
      dataValidator.validate('title', {
        required: errorMessage,
      });

    expect(isTitleExist).toThrow(errorMessage);
  });

  it('length | result should be false (min)', () => {
    const data = { title: 'title' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage = 'Длина названия должна быть не меньше 6 символов!';

    const isTitleLengthCorrect = () =>
      dataValidator.validate('title', {
        length: {
          min: 6,
          errorMessage,
        },
      });

    expect(isTitleLengthCorrect).toThrow(errorMessage);
  });

  it('length | result should be false (max)', () => {
    const data = { title: 'new title' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage = 'Длина названия должна быть не больше 6 символов!';

    const isTitleLengthCorrect = () =>
      dataValidator.validate('title', {
        length: {
          max: 6,
          errorMessage,
        },
      });

    expect(isTitleLengthCorrect).toThrow(errorMessage);
  });

  it('length | result should be true', () => {
    const data = { title: 'title' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage =
      'Длина названия должна быть не меньше 4 и не больше 6 символов!';

    const isTitleLengthCorrect = dataValidator.validate('title', {
      length: {
        max: 6,
        min: 4,
        errorMessage,
      },
    });

    expect(isTitleLengthCorrect).toBe(true);
  });

  it('required & length | result should be true', () => {
    const data = { title: 'title' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage =
      'Длина названия должна быть не меньше 4 и не больше 6 символов!';

    const isTitleLengthCorrect = dataValidator.validate('title', {
      required: errorMessage,
      length: {
        max: 6,
        min: 4,
        errorMessage,
      },
    });

    expect(isTitleLengthCorrect).toBe(true);
  });

  it('required & length | result should be false (required)', () => {
    const data = { title: '' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage =
      'Длина названия должна быть не меньше 4 и не больше 6 символов!';
    const requiredErrorMessage = 'Укажите название';

    const isTitleLengthCorrect = () =>
      dataValidator.validate('title', {
        required: requiredErrorMessage,
        length: {
          max: 6,
          min: 4,
          errorMessage,
        },
      });

    expect(isTitleLengthCorrect).toThrowError(requiredErrorMessage);
  });

  it('required & length | result should be false (length)', () => {
    const data = { title: 'name' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage =
      'Длина названия должна быть не меньше 4 и не больше 6 символов!';
    const requiredErrorMessage = 'Укажите название';

    const isTitleLengthCorrect = () =>
      dataValidator.validate('title', {
        required: requiredErrorMessage,
        length: {
          max: 6,
          min: 4,
          errorMessage,
        },
      });

    expect(isTitleLengthCorrect).toThrowError(errorMessage);
  });
});
