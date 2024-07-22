interface Array<T> {
  isEmpty(): boolean;

  objectSort<T>(key: string, order: "asc" | "desc"): Array<T>;

  /**
   * Remove duplicate object by key
   * @param key
   * @return Array
   */
  removeDuplicatedObj<T>(key: string): Array<T>;
}

interface String {
  capitalizeFirstLetter(): string;
}
