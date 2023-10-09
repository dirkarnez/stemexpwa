export const isUUIDexEqual = (a, b) =>
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((element, index) => element === b[index]);

export const toUUIDexString = a => a.map((value) => value.toString(16).padStart(2, '0')).join("")