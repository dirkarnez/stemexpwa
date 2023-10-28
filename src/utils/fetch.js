export const FakeFetch = (p, data) => new Promise(res => {
    setTimeout(() => {
        res(data);
    }, 2000)
});

export const WrappedFetch = (url, params = {}) => {
    // return fetch(
    //     location.host.includes("localhost") ? 
    //     `https://localhost${url}`
    //     :
    //     url
    //     , 
    //     ...params
    // )
    const isDev =  location.host.includes("localhost");

    var abortController = new AbortController();

    var myHeaders = new Headers();
	// myHeaders.append("pragma", "no-cache");
	// myHeaders.append("Cache-Control", "no-cache");

    const input = isDev 
    ?
    `https://localhost:443${url}`
    :
    url;

    const obj = {
        signal: abortController.signal,
        headers: myHeaders,
        credentials: "include",
        // cache: "no-cache",
        // credentials: 'same-origin',
        // redirect: 'follow',
        // referrerPolicy: 'no-referrer',
        ...params
    };

    return [
        fetch(input, obj)
        .then(response => {
            debugger;
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
export const WrappedFetchPOST = (url, stringifyJSON) => {
    return WrappedFetch(url, {
        method: "POST",
        body: stringifyJSON
    });
}

// const [  wrappedFetchPromise , abort ] = WrappedFetchPOST("/api/login", JSON.stringify(myForm.summary()));
export const WrappedFetchPOSTMultipart = (url, obj) => {
    const formData  = new FormData();
      
    for(const name in obj) {
      formData.append(name, obj[name]);
    }
    
    return WrappedFetch(url, {
        method: "POST",
        body: formData
    });
}

