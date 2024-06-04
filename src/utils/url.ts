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

export function convertYouTubeUrl(url: string) {
	// Parse the URL using the URL class
	const parsedUrl = new URL(url);
  
	// Extract the video ID from the URL parameters
	const videoId = parsedUrl.searchParams.get('v');
  
	// Construct the embed URL
	const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
	return embedUrl;
  }
  