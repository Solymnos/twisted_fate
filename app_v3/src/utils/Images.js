export const preloadImagesFromUrlList = async ( urlList ) =>
{
    for ( const url of urlList )
    {
        await new Promise(( resolve , reject ) => 
        {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
        })
    }
}