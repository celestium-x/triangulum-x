"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { UPLOAD_IMAGE_URL } from "routes/api_routes";

export default function Test() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setUploadedUrl("");
        }
    };

    async function handleUpload() {
        if (!file) {
            alert("Please select a file");
            return;
        }
        setUploading(true);

        try {
            const { data } = await axios.post(UPLOAD_IMAGE_URL, {
                fileType: file.type,
            });

            const { uploadUrl, publicUrl } = data;
            if (!uploadUrl) {
                throw new Error("No upload URL received from backend");
            }

            await axios.put(uploadUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
                timeout: 30000,
            });
            setUploadedUrl(publicUrl);

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl("");
            }

            alert("File uploaded successfully!");
        } catch {
            alert("Upload failed: Unknown error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto space-y-6 p-6">
            <div className="space-y-2">
                <label htmlFor="file-input" className="block text-sm font-medium text-gray-700">
                    Select an image to upload
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                />
            </div>

            {previewUrl && (
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Preview:</h3>
                    <div className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
            <div className="flex gap-2">
                <Button
                    onClick={handleUpload}
                    disabled={uploading || !file}
                    className="flex-1"
                >
                    {uploading ? "Uploading..." : "Upload File"}
                </Button>
            </div>

            {uploadedUrl && (
                <div className="relative w-full h-64 overflow-hidden">
                    <Image
                        src={uploadedUrl}
                        alt="Uploaded image"
                        fill
                        className="object-contain"
                    />
                </div>
            )}
        </div>
    );
}