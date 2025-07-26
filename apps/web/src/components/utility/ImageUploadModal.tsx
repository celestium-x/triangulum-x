'use client';
// import DragImageBackground from "@/components/utility/DragImageBackground";
// import { useRef, useState, useEffect } from "react";
// import { FaMountainSun } from "react-icons/fa6";

// interface ImageUploadModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onImageSelect: (file: File, preview: string) => void;
// }

// export default function ImageUploadModal({ isOpen, onClose, onImageSelect }: ImageUploadModalProps) {
//     const [dragActive, setDragActive] = useState(false);
//     const [fileDialogOpened, setFileDialogOpened] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         if (isOpen && !fileDialogOpened) {
//             const timeout = setTimeout(() => {
//                 fileInputRef.current?.click();
//                 setFileDialogOpened(true);
//             }, 50);
//             return () => clearTimeout(timeout);
//         }
//     }, [isOpen, fileDialogOpened]);

//     useEffect(() => {
//         if (!isOpen) {
//             setFileDialogOpened(false);
//             setDragActive(false);
//         }
//     }, [isOpen]);

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const selectedImage = e.target.files[0];
//             const preview = URL.createObjectURL(selectedImage);
//             onImageSelect(selectedImage, preview);
//             onClose();
//         }
//     };

//     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         setDragActive(false);

//         const file = e.dataTransfer.files?.[0];
//         if (file && file.type.startsWith("image/")) {
//             const preview = URL.createObjectURL(file);
//             onImageSelect(file, preview);

//             if (fileInputRef.current) {
//                 fileInputRef.current.value = '';
//             }

//             onClose();
//         }
//     };

//     const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         setDragActive(true);
//     };

//     const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         const rect = e.currentTarget.getBoundingClientRect();
//         const x = e.clientX;
//         const y = e.clientY;

//         if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
//             setDragActive(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <DragImageBackground onBackgroundClick={onClose}>
//             <div className="w-[90vw] h-[85vh] mx-auto">
//                 <div
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                     className={`
//                         w-full h-full border-2 border-dashed rounded-4xl
//                         flex flex-col items-center justify-center gap-4
//                         transition-all duration-200 ease-in-out
//                         ${dragActive
//                             ? 'border-blue-500 bg-blue-50 dark:bg-[#092427]'
//                             : 'border-neutral-300 dark:border-[#276369]'
//                         }
//                     `}
//                 >
//                     <FaMountainSun
//                         size={64}
//                         className={`${dragActive ? 'text-blue-500' : 'text-neutral-400'} transition-colors duration-200`}
//                     />
//                     <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
//                         Upload image here
//                     </p>
//                 </div>
//                 <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageChange}
//                 />
//             </div>
//         </DragImageBackground>
//     );
// }

export default function ImageUploadModal() {}
