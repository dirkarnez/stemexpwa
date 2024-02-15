export const stringToURLPart = (a: string) => {
    return a.replaceAll(/\s+/g, "-").replaceAll(/\//g, "_").toLowerCase();
}

export const mustMatchThenReplace = (regex: RegExp, stringtoreplace: string, replacer: (substring: string, ...args: any[]) => string) => {
	debugger;
	if (regex.test(stringtoreplace)) {
		return stringtoreplace.replace(regex,  replacer);
	} else {
		throw "!!!!";
	}
}