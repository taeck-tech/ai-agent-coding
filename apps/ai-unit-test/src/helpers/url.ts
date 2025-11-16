import { compile } from 'path-to-regexp';

type PathParams = Record<string, string | number>;

export const pathToUrl = (path: string, params: PathParams = {}): string =>
  compile(path)(params);


