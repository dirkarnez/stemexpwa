export const handleImageChange = <K extends keyof HTMLElementEventMap>(event: HTMLElementEventMap[K] & { target: HTMLInputElement }, callback: (result: string | ArrayBuffer | null) => void) => {
    if (!!event.target.files && event.target.files.length == 1) {
        const file: File =  event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                callback(!!event.target ? event.target.result : null);
            };
    
            reader.readAsDataURL(file);
        }
    }
}
