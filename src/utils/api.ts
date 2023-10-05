export const getHost = () => {
    const isDev =  location.host.includes("localhost");

    return isDev 
    ?
    `https://localhost`
    :
    "";
}