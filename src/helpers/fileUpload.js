export const fileUpload = async ( file ) => {
    if (!file) throw new Error('No hay archivo especificado')
    // Cloudinary URL
    const cloudUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
    const formData = new FormData();

    formData.append('upload_preset', 'journal-app');
    formData.append('file', file);

    try{
        const res = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        console.log(res)
        if (!res.ok) throw new Error('No se pudo subir imagen');

        const cloudRes = await res.json();
        console.log(cloudRes)
        
        return cloudRes.secure_url;

    } catch(error){
        console.log(error)
        throw new Error(error.message)
    }
}