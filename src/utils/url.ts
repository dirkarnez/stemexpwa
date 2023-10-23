export const stringToURLPart = (a: string) => {
    console.log("stringToURLPart:", a);
    return a.replaceAll(/\s+/g, "-").replaceAll(/\//g, "_").toLowerCase();
}