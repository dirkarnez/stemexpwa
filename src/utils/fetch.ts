export const FakeFetch = (p: any, data: any) => new Promise(res => {
    setTimeout(() => {
        res(data);
    }, 500)
});


export const WrappedFetchData = (url: string, params: RequestInit = {}) => {
    // return fetch(
    //     location.host.includes("localhost") ? 
    //     `https://localhost${url}`
    //     :
    //     url
    //     , 
    //     ...params
    // )
    const isDev = location.host.includes("localhost");

    var abortController = new AbortController();

    var myHeaders = new Headers();
    // myHeaders.append("pragma", "no-cache");
    // myHeaders.append("Cache-Control", "no-cache");

    const input = isDev
        ?
        `https://localhost:443${url}`
        :
        url;

    const include: RequestCredentials = "include"

    const obj: RequestInit = {
        signal: abortController.signal,
        headers: myHeaders,
        credentials: include,
        // cache: "no-cache",
        // credentials: 'same-origin',
        // redirect: 'follow',
        // referrerPolicy: 'no-referrer',
        ...params
    };

    return [
        fetch(input, obj)
            .then(response => {
                if (response.ok && response.status >= 200 && response.status < 300) {
                    return response.arrayBuffer()
                } else {
                    return response.text().then(a => {
                        throw a
                    })
                }
            }),
        abortController
    ];
}

type WrappedFetchReturns =  [Promise<any>, AbortController];
export const WrappedFetch = (url: string, params: RequestInit = {}): WrappedFetchReturns => {
    // return fetch(
    //     location.host.includes("localhost") ? 
    //     `https://localhost${url}`
    //     :
    //     url
    //     , 
    //     ...params
    // )
    const isDev = location.host.includes("localhost");

    var abortController = new AbortController();

    var myHeaders = new Headers();
    // myHeaders.append("pragma", "no-cache");
    // myHeaders.append("Cache-Control", "no-cache");
    
    const input = isDev
        ?
        `https://localhost:443${url}`
        :
        url;

    const include: RequestCredentials = "include"

    const obj: RequestInit = {
        signal: abortController.signal,
        headers: myHeaders,
        credentials: include,
        // cache: "no-cache",
        // credentials: 'same-origin',
        // redirect: 'follow',
        // referrerPolicy: 'no-referrer',
        ...params
    };

    return [
        fetch(input, obj)
            .then(response => {
                if (response.ok && response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return response.text().then(a => {
                        throw a
                    })
                }
            }),
        abortController
    ];
}

// const [  wrappedFetchPromise , abort ] = WrappedFetchPOST("/api/login", JSON.stringify(myForm.summary()));
export const WrappedFetchPOST = (url: string, stringifiedJSON: string) => {
    return WrappedFetch(url, {
        method: "POST",
        body: stringifiedJSON
    });
}

// const [  wrappedFetchPromise , abort ] = WrappedFetchPOST("/api/login", JSON.stringify(myForm.summary()));
export const WrappedFetchPOSTMultipart = (url: string, formData: FormData) => {
    //const formData = new FormData();

   //objectToFormData(obj, formData, "");

    return WrappedFetch(url, {
        method: "POST",
        body: formData
    });
}


function objectToFormData(obj: any, formData: FormData, parentKey: string) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const formKey = parentKey ? `${parentKey}[${key}]` : key;

            if (typeof value === 'object' && !Array.isArray(value) && Object.prototype.toString.call(value) != "[object File]" && value !== null) {
                objectToFormData(value, formData, formKey);
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    const arrayKey = `${formKey}[${index}]`;
                    objectToFormData(item, formData, arrayKey);
                });
            } else {
                formData.append(formKey, value);
            }
        }
    }
}
