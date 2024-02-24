import { Validation } from '../index';

interface MockData {
  title: string;
}

describe('Validation', () => {
  it('required | result should throw error', () => {
    const data = { title: '' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage = 'Укажите название!';

    const isTitleExist = () =>
      dataValidator.validate('title', {
        required: errorMessage,
      });

    expect(isTitleExist).toThrow(errorMessage);
  });

  it('required | result should return true', () => {
    const data = { title: 'title' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage = 'Укажите название!';

    const isTitleExist = dataValidator.validate('title', {
      required: errorMessage,
    });

    expect(isTitleExist).toBe(true);
  });

  it('required | result should throw error', () => {
    const data = { title: '  ' };
    const dataValidator = new Validation<MockData>(data);
    const errorMessage = 'Укажите название!';

    const isTitleExist = () =>
      dataValidator.validate('title', {
        required: errorMessage,
      });

    expect(isTitleExist).toThrow(errorMessage);
  });

  it('length (min) | result should throw error', () => {
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

  it('length (max) | result should return error', () => {
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

  it('length (min & max) | result should return true', () => {
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

  it('required & length | result should return  true', () => {
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

  it('required & length (required) | result should throw error', () => {
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

  it('required & length (length) | result should throw error', () => {
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

  it('validation string (required) | should return true', () => {
    const mockString = 'test';
    const isMockStringExist = new Validation<string>(mockString).validateString(
      { required: 'Укажите строку!' },
    );

    expect(isMockStringExist).toBe(true);
  });

  it('validation string (required) | should return error', () => {
    const mockString = ' ';
    const errorMessage = 'Укажите строку!';
    const isMockStringExist = () =>
      new Validation<string>(mockString).validateString({
        required: errorMessage,
      });

    expect(isMockStringExist).toThrow(errorMessage);
  });

  it('validation string (min) | should return true', () => {
    const mockString = 'test';
    const isMockStringLengthCorrect = new Validation<string>(
      mockString,
    ).validateString({
      length: { min: 3 },
    });

    expect(isMockStringLengthCorrect).toBe(true);
  });

  it('validation string (min) | should return error', () => {
    const mockString = '';
    const errorMessage = 'Укажите строку, длина которой не меньше 3';
    const isMockStringLengthCorrect = () =>
      new Validation<string>(mockString).validateString({
        length: { min: 3, errorMessage },
      });

    expect(isMockStringLengthCorrect).toThrow(errorMessage);
  });

  it('validation string (max) | should return true', () => {
    const mockString = 'test';
    const isMockStringLengthCorrect = new Validation<string>(
      mockString,
    ).validateString({
      length: { max: 5 },
    });

    expect(isMockStringLengthCorrect).toBe(true);
  });

  it('validation string (max) | should return error', () => {
    const mockString = 'test';
    const errorMessage = 'Укажите строку, длина которой не больше 3';
    const isMockStringLengthCorrect = () =>
      new Validation<string>(mockString).validateString({
        length: { max: 3, errorMessage },
      });

    expect(isMockStringLengthCorrect).toThrow(errorMessage);
  });

  it('validation string (max) | should return true', () => {
    const mockString = 'test';
    const isMockStringLengthCorrect = new Validation<string>(
      mockString,
    ).validateString({
      required: 'Укажите строку',
      length: { max: 5 },
    });

    expect(isMockStringLengthCorrect).toBe(true);
  });

  it('validation string (required & length) | should return error', () => {
    const mockString = '';
    const errorMessage =
      'Укажите строку, длина которой не больше 5 и не меньше 3 символов!';
    const requiredErrorMessage = 'Укажите строку';
    const isMockStringLengthCorrect = () =>
      new Validation<string>(mockString).validateString({
        required: requiredErrorMessage,
        length: { min: 3, max: 5, errorMessage },
      });

    expect(isMockStringLengthCorrect).toThrow(requiredErrorMessage);
  });
});
