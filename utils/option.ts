import { None, Some, Option } from '@sniptt/monads';

export function optionFromNullable<T>(value: T | null): Option<T> {
  return value === null ? None : Some(value);
}

export function optionToNullable<T>(option: Option<T>): T | null {
  return option.match({
    some: (value) => value,
    none: () => null,
  });
}
