"use client";
// import React, { useCallback, useState } from "react";
// import Modal from "./Modal";
// import { useDropzone } from "react-dropzone";
// import { Delete, File, XIcon } from "lucide-react";

// const UploadFiles = () => {
//   //   const [images, setImages] = useState<Array<string>>([]);

//   //   const onDrop = useCallback((acceptedFiles: any) => {
//   //     acceptedFiles.forEach((file: File) => {
//   //       const reader = new FileReader();

//   //       reader.onloadend = () => {
//   //         setImages(old => [...old, reader.result as string]);
//   //       };

//   //       reader.readAsDataURL(file);
//   //     });
//   //   }, []);

//   const [files, setFiles] = useState<Array<File>>([]);

//   // const onDrop = useCallback((acceptedFiles: any) => {
//   //   setFiles((old) => [...old, ...acceptedFiles]);
//   // }, []);
//   const onDrop = useCallback((acceptedFiles: any) => {
//     acceptedFiles.forEach((file: File) => {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const blob = new Blob([reader?.result as BlobPart], { type: file.type });
//         console.log(blob)
//         setFiles((old:any) => [...old, blob]);
//       };

//       reader.readAsArrayBuffer(file);
//     });
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const deleteFile = (index: number) => {
//     setFiles((old) => old.filter((file, i) => i !== index));
//   };
//   return (
//     <Modal
//       title="Ajouter un droits d'accès"
//       description="Trouvez et mettez à jour vos fonctions en quelques clics"
//       isOpen={true}
//       onChange={() => {}}
//     >
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <button
//             type="button"
//             className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               stroke="currentColor"
//               fill="none"
//               viewBox="0 0 48 48"
//               aria-hidden="true"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
//               />
//             </svg>
//             <span className="mt-2 block text-sm font-medium text-gray-100">
//               Drop the files here ...
//             </span>
//           </button>
//         ) : (
//           <button
//             type="button"
//             className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               stroke="currentColor"
//               fill="none"
//               viewBox="0 0 48 48"
//               aria-hidden="true"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
//               />
//             </svg>
//             <span className="mt-2 block text-sm font-medium text-gray-100">
//               Drag 'n' drop some files here, or click to select files
//             </span>
//           </button>
//         )}
//         </div>
//         {files.map((file, index) => (
//           //   <div
//           //     key={index}
//           //     className="flex items-center p-2 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 rounded-lg my-2"
//           //   >
//           //     <svg
//           //       className="w-6 h-6 mr-2  dark:text-gray-900"
//           //       fill="none"
//           //       stroke="currentColor"
//           //       viewBox="0 0 24 24"
//           //       xmlns="http://www.w3.org/2000/svg"
//           //     >
//           //       <path
//           //         strokeLinecap="round"
//           //         strokeLinejoin="round"
//           //         strokeWidth={2}
//           //         d="M13 5v6a2 2 0 002 2h6m-1-16h-5a2 2 0 00-2 2v5a2 2 0 002 2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V4a2 2 0 00-2-2h-7z"
//           //       ></path>
//           //     </svg>
//           //     <p className="text-gray-900 dark:text-gray-100">{file.name}</p>
//           //   </div>
//           // <div
//           //   key={index}
//           //   className="relative max-w-full my-2 rounded-lg border border-gray-300 dark:bg-gray-900 bg-gray-100 px-3 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//           // >
//           //   <div className="flex-shrink-0">
//           //     <File  className="h-7 w-7 " />
//           //   </div>
//           //   <div className="flex-1 min-w-0">
//           //     <a href="#" className="focus:outline-none">
//           //       <span className="absolute inset-0" aria-hidden="true" />
//           //       <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate overflow-ellipsis ">{file.name}</p>
//           //       <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{file.type}</p>
//           //     </a>
//           //   </div>
//           // </div>
//           <div
//             key={index}
//             className="relative max-w-full my- rounded-lg border border-gray-300 dark:bg-gray-900 bg-gray-100 px-3 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//           >
//             <div className="flex-shrink-0">
//               <File className="h-7 w-7" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <a href="#" className="focus:outline-none">
//                 <span className="absolute inset-0" aria-hidden="true" />
//                 <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate overflow-ellipsis">
//                   {file.name}
//                 </p>
//                 <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
//                   {file.type}
//                 </p>
//               </a>
//             </div>

//             <XIcon
//               onClick={() => deleteFile(index)}
//               className="text-gray-700 h-7 w-7 rounded-full relative cursor-pointer -top-8 -right-5 bg-red-600  hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-200"
//             />

//           </div>
//         ))}

//     </Modal>
//   );
// };

// export default UploadFiles;

import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import Link from "next/link";
import ExpandingArrow from "../expanding-arrow";
import Uploader from "../uploader";
import Modal from "./Modal";
import useUploadFileModal from "@/hooks/use-UploadFile-Modal";

const UploadFiles = () => {
  const {id,isOpen,onClose}=useUploadFileModal()
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      title="Téléverser un fichier"
      description="Formats acceptés : .pdf , .word"
      isOpen={isOpen}
      onChange={onClose}
    >
      <Uploader />
    </Modal>
  );
};

export default UploadFiles;
