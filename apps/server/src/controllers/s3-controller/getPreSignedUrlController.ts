import { Request, Response } from "express";
import S3ClientActions from "../../class/s3Client";

export default async function getPreSignedUrlController(req: Request, res: Response) {
    try {
        const { fileType } = req.body;
        if (!fileType) {
            res.status(400).json({ message: "File type is required" });
            return;
        }

        if (!fileType.includes("/")) {
            res.status(400).json({ message: "Invalid file type format. Expected format: 'image/png'" });
            return;
        }

        const s3Actions = new S3ClientActions();
        const { signedUrl, publicUrl, key } = await s3Actions.getPresignedUrl(fileType);

        res.json({
            success: true,
            uploadUrl: signedUrl,
            publicUrl,
            key
        });
        return;
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate pre-signed URL"
        });
        return;
    }
}