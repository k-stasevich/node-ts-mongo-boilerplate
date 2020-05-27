export type UnsetAll<T> = {
  [p in keyof T]: 1;
};
