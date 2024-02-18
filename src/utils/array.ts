export const splitArrayToArrayGroups = <T>(array: Array<T>, numOfGroups: number) => (array || []).reduce(
    (p, currentValue, currentIndex) => {
        const dstIndex = currentIndex % numOfGroups;
        return [...p.slice(0, dstIndex), [...p[dstIndex], currentValue], ...p.slice(dstIndex + 1)]
    },
    Array(numOfGroups).fill([]),
);

export const hasAtLeastOneItemInArray =  <T>(array: Array<T>) => {
    return Array.isArray(array) && array.length > 0;
}