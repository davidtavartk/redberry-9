import debounce from "lodash.debounce";

export const debounceFn = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
) => debounce(func, delay);
