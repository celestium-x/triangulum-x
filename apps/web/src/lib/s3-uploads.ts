import axios from 'axios';
import { UPLOAD_IMAGE_URL } from 'routes/api_routes';

export async function handleUpload(file: File) {
    if (!file) {
        alert('Please select a file');
        return;
    }

    try {
        const { data } = await axios.post(UPLOAD_IMAGE_URL, {
            fileType: file.type,
        });

        const { uploadUrl, publicUrl } = data;
        if (!uploadUrl) {
            throw new Error('No upload URL received from backend');
        }

        await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
            timeout: 30000,
        });

        return publicUrl;
    } catch {
        console.error('Error while uploading image');
    }
}
