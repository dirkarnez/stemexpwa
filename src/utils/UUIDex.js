export const isUUIDexEqual = (a, b) =>
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((element, index) => element === b[index]);