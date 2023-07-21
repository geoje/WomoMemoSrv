export function compareObject(arg1: any, arg2: any): boolean {
  if (
    Object.prototype.toString.call(arg1) ===
    Object.prototype.toString.call(arg2)
  ) {
    if (
      Object.prototype.toString.call(arg1) === "[object Object]" ||
      Object.prototype.toString.call(arg1) === "[object Array]"
    ) {
      if (Object.keys(arg1).length !== Object.keys(arg2).length) {
        return false;
      }
      return Object.keys(arg1).every((key) =>
        compareObject(arg1[key], arg2[key])
      );
    }
    return arg1 === arg2;
  }
  return false;
}
