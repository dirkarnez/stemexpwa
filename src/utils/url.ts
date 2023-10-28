export const stringToURLPart = (a: string) => {
    return a.replaceAll(/\s+/g, "-").replaceAll(/\//g, "_").toLowerCase();
}