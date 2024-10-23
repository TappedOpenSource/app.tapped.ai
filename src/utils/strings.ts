export function convertToNullableString(input: string | null | undefined) {
  return input === "" || input === null || input === undefined ? null : input;
}
