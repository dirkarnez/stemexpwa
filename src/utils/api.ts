export const getHost = () => {
    const isDev =  location.host.includes("localhost");
    
    return isDev 
    ?
    `https://dummy.localhost:4437`
    :
    "";
}

export const getResourcesAPIByID = (id: string) => !!id ? `${getHost()}${!!id ? `/api/resourse?id=${id}` : ""}` : "";