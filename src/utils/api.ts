export const getHost = () => {
    const isDev =  location.host.startsWith("localhost");
    
    return isDev 
    ?
    `https://localhost:4443`
    :
    "";
}

export const getResourcesAPIByID = (id: string) => !!id ? `${getHost()}${!!id ? `/api/resourse?id=${id}` : ""}` : "";