export const imageToDataURL = (url: string): Promise<any> => {
    return fetch(url)
        .then((response) => response.blob())
        .then(
            (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
        );
};


export const isImageURL = (url: string) => {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
export const isImgLink = (url: string) => {
    if (typeof url !== 'string') return false;
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
}