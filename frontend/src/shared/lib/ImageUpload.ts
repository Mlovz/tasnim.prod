export const checkImage = (file: File) => {
    let err = "";
    if (file.size > 1024 * 1024)
      // 1mb
      err = "Размер фото слишком большой (1mb)";

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/avif"
    )
      err = "Формат изображении не (jpeg, png)!";
    return err;
  };


interface IImageUpload{
    public_id: string,
    url: string
}
export const ImageUpload = async (images: File[]):Promise<IImageUpload[]> => {
    const newImages = []

    for (const img of images) {
        const formData = new FormData()

        formData.append('file', img)

        formData.append('cloud_name', 'daggokgzh')
        formData.append('upload_preset', 'douxuvry')

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/daggokgzh/upload',
            {
                method: 'POST',
                body: formData,
            }
        )
        const data = await res.json()
        newImages.push({
            public_id: data.public_id,
            url: data.secure_url,
        })
    }
    return newImages
}
