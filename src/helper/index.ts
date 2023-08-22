


 export const convertedImages = (imageUrl:string) => {
    const baseUrl = imageUrl?.substring(0, imageUrl.lastIndexOf("/100x100bb.jpg"));
    const convertedImageUrl = `${baseUrl}/800x800bb.jpg`;
    return convertedImageUrl;
  };

  export const fetcher = async (...args: any[]) => {
    const response = await fetch(...args);
    const data = await response.json();
    return data;
  };

   export const  addThreeDotsAfter15Letters = (inputText: string) => {
    if (inputText.length > 15) {
        return inputText.substring(0, 15) + '...';
    } else {
        return inputText;
    }
}

