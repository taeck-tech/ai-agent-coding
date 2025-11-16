export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T | null | undefined,
  ...propNames: readonly K[]
): Pick<T, K> => {
  if (!obj || !propNames) {
    return {} as Pick<T, K>;
  }

  return Object.keys(obj).reduce((acc, key) => {
    if (propNames.includes(key as K)) {
      (acc as Record<string, unknown>)[key] = obj[key as K];
    }

    return acc;
  }, {} as Pick<T, K>);
};

export const debounce = <F extends (...args: unknown[]) => unknown>(
  fn: F,
  wait: number,
) => {
  let timeout: number | null = null;

  return (...args: Parameters<F>) => {
    const later = () => {
      timeout = -1;
      fn(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const parseJSON = <T = unknown>(value: string | null | undefined): T | null | undefined => {
  if (!value) {
    return value as null | undefined;
  }

  const result = JSON.parse(value) as unknown;

  return (typeof result === 'string' ? JSON.parse(result) : result) as T;
};


