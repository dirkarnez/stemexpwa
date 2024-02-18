export const handleImageChange = <K extends keyof HTMLElementEventMap>(event: HTMLElementEventMap[K] & { target: HTMLInputElement }, callback: (result: string | ArrayBuffer | null, filename: string) => void) => {
    if (!!event.target.files && event.target.files.length == 1) {
        const file: File =  event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                callback(!!event.target ? event.target.result : null, file.name);
            };
    
            reader.readAsDataURL(file);
        }
    }
}


export const handleDocumentChange = <K extends keyof HTMLElementEventMap>(event: HTMLElementEventMap[K] & { target: HTMLInputElement }, callback: (file, File, filename: string) => void) => {
    if (!!event.target.files && event.target.files.length == 1) {
        const file: File =  event.target.files[0];
        if (file) {
            callback(file, file.name);
        }
    }
}
