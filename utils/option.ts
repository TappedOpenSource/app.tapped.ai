import { None, Some, Option } from '@sniptt/monads';

export function optionFromNullable<T>(value: T | null): Option<T> {
  return value === null ? None : Some(value);
}
