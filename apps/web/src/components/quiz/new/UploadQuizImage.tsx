"use client";
import ImageUploadModal from "@/components/utility/ImageUploadModal";
import ToolTipComponent from "@/components/utility/TooltipComponent";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaMountainSun, FaSquare } from "react-icons/fa6";
import { TfiLayoutListPost } from "react-icons/tfi";

export default function UploadQuizImage() {
    const [enableLeftView, setEnableLeftView] = useState(false);
    const [enableRightView, setEnableRightView] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleImageSelect = (file: File, preview: string) => {
        setImage(file);
        setImagePreview(preview);
        setUploadedUrl("");
    };

    return (
        <div className="w-full px-2 mt-6">
            <div className="flex items-center gap-x-1">
                <span className="text-sm font-normal text-dark-primary dark:text-light-base">
                    Add Image
                </span>
                <ToolTipComponent content="This image is particularly relevant to this question">
                    <AiOutlineQuestionCircle size={15} />
                </ToolTipComponent>
            </div>

            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 block">
                Add a relevant image to this question
            </span>

            <div className="flex items-start gap-4 mt-4">
                <div
                    onClick={() => setShowUploadModal(true)}
                    className="relative flex-1 border border-neutral-300 dark:border-neutral-700 hover:border-[#5e59b3] hover:border-dashed transition-colors duration-200 bg-white dark:bg-neutral-900 rounded-md flex items-center justify-center cursor-pointer px-3 py-2 min-h-[100px]"
                >
                    {imagePreview ? (
                        <>
                            <img
                                src={imagePreview}
                                alt="Selected Preview"
                                className="max-h-64 max-w-full object-contain rounded-md"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImagePreview(null);
                                    setImage(null);
                                }}
                                className="absolute top-2 right-2 bg-red-700 text-[#e4e4e4] rounded-full w-5 h-5 flex items-center justify-center text-[14px] hover:bg-red-800 transition-colors transform duration-200 cursor-pointer"
                            >
                                ×
                            </button>
                        </>
                    ) : (
                        <>
                            <FaMountainSun size={32} />
                            <span className="ml-3 text-xs text-neutral-500 dark:text-neutral-400">
                                Click to upload or drag an image here
                            </span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-x-3 mt-5 dark:text-neutral-300 text-neutral-700">
                <div
                    onClick={() => {
                        setEnableLeftView(!enableLeftView);
                        setEnableRightView(false);
                    }}
                    className={`flex items-center justify-center w-16 h-12 rounded-md gap-x-1.5 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-pointer ${enableLeftView
                        ? "border-2 border-neutral-600 dark:border-neutral-500"
                        : "border border-neutral-300 dark:border-neutral-600"
                        }`}
                >
                    <FaSquare size={20} className="rotate-90" />
                    <TfiLayoutListPost />
                </div>
                <div
                    onClick={() => {
                        setEnableRightView(!enableRightView);
                        setEnableLeftView(false);
                    }}
                    className={`flex items-center justify-center w-16 h-12 rounded-md gap-x-1.5 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-pointer ${enableRightView
                        ? "border-2 border-neutral-600 dark:border-neutral-500"
                        : "border border-neutral-300 dark:border-neutral-600"
                        }`}
                >
                    <TfiLayoutListPost className="scale-x-[-1]" />
                    <FaSquare size={20} />
                </div>
            </div>

            {/* // if image -> button should appear to send post request to backend and upload it  */}

            <ImageUploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onImageSelect={handleImageSelect}
            />
        </div>
    );
}
