export const getHost = () => {
    const isDev =  location.host.includes("localhost");

    return isDev 
    ?
    `https://localhost`
    :
    "";
}

export const getResourcesAPIByID = (id: string) => `${getHost()}${!!id ? `/api/resourses?id=${id}` : ""}`;