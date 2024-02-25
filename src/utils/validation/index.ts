interface ValidationLengthRules {
  min?: number;
  max?: number;
  errorMessage?: string;
}

interface ValidationRules {
  required?: string;
  length?: ValidationLengthRules;
}

export class Validation<T> {
  constructor(private readonly _data: T) {}

  public validate(target: keyof T, validationRules: ValidationRules) {
    const value = this._getValueByName(target);
    const isNotEmpty = validationRules.required
      ? this._checkingForEmptiness(value, validationRules.required)
      : true;
    const isLengthCorrect = validationRules.length
      ? this._checkingLength(value, validationRules.length)
      : true;

    return isNotEmpty && isLengthCorrect;
  }

  public validateString(validationRules: ValidationRules) {
    if (typeof this._data !== 'string')
      this._throwError('Validation | Переданное значние не является строкой!');

    const isNotEmpty = validationRules.required
      ? this._checkingForEmptiness(
          this._data as T[keyof T],
          validationRules.required,
        )
      : true;
    const isLengthCorrect = validationRules.length
      ? this._checkingLength(this._data as T[keyof T], validationRules.length)
      : true;

    return isNotEmpty && isLengthCorrect;
  }

  private _getValueByName<U extends keyof T>(key: U): T[U] {
    return this._data[key];
  }

  private _checkingForEmptiness(
    value: T[keyof T],
    errorMessage: string,
  ): boolean {
    if (typeof value === 'string') {
      return Boolean(value.trim()) ? true : this._throwError(errorMessage);
    }

    return Boolean(value) ? true : this._throwError(errorMessage);
  }

  private _checkingLength(
    value: T[keyof T],
    validationLengthRules: ValidationLengthRules,
  ): boolean {
    if (typeof value !== 'string') {
      this._throwError('Validation | Указанное поле не является строкой!');
    }

    const { min, max } = validationLengthRules;

    if (min && value.trim().length <= min)
      this._throwError(validationLengthRules.errorMessage);

    if (max && value.trim().length >= max)
      this._throwError(validationLengthRules.errorMessage);

    return true;
  }

  private _throwError(message: string): never {
    throw new Error(message);
  }
}
