"use client";
import { useState, useCallback, useMemo, ChangeEvent } from "react";
import toast from "react-hot-toast";
import LoadingDots from "./loading-dots";
import { PutBlobResult } from "@vercel/blob";
import { File, FilePlus2Icon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { creatFile } from "@/actions/file.action";
import { useParams, useSearchParams } from 'next/navigation'
import useUploadFileModal from "@/hooks/use-UploadFile-Modal";
export default function Uploader() {
  const [data, setData] = useState({
    images: [] as string[],
  });
  const {onClose}=useUploadFileModal()
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // const onChangePicture = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     const fileList = event.currentTarget.files
  //     if (fileList) {
  //       const newFiles = Array.from(fileList)
  //       const totalSize = newFiles.reduce((acc, curr) => acc + curr.size, 0)
  //       if (totalSize / 1024 / 1024 > 50) {
  //         toast.error('Total file size too big (max 50MB)')
  //       } else {
  //         setFiles(newFiles)
  //         const images = newFiles.map(file => URL.createObjectURL(file))
  //         setData(prev => ({ ...prev, images }))
  //       }
  //     }
  //   },
  //   []
  // )
  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.currentTarget.files;
      if (fileList) {
        const newFiles = Array.from(fileList);
        const totalSize = newFiles.reduce((acc, curr) => acc + curr.size, 0);
        if (totalSize / 1024 / 1024 > 50) {
          toast.error("Total file size too big (max 50MB)");
        } else {
          setFiles((prevFiles) => [...prevFiles, ...newFiles]);
          const images = newFiles.map((file) => URL.createObjectURL(file));
          setData((prev) => ({ ...prev, images: [...prev.images, ...images] }));
        }
      }
    },
    []
  );
  const params = useSearchParams()
 
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  
  const id = Number(params.get('id'))
  const handleDelete = () => {
    // Delete operation goes here
    console.log("Delete operation triggered");
  };
  const [saving, setSaving] = useState(false);

  const saveDisabled = useMemo(() => {
    return files.length === 0 || saving;
  }, [files.length, saving]);

  const deleteFile = (index: number) => {
    setFiles((old) => old.filter((file, i) => i !== index));
  };

  return (
    <form
      className="grid gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
          console.log(file.name)
          fetch("/api/upload", {
            method: "POST",
            body: formData,
          }).then(async (res) => {
            if (res.ok) {

              const result = await res.json();
              await creatFile(id,file.name,result.url).then(()=>{
                toast.success("Files uploaded successfully!");
                onClose()
              }).catch(
                ()=>{
                  toast.error("error");
                }
              )
              console.log(result)
            } else {
              // Handle error
              const error = await res.text();
              toast.error(error);
            }
            setSaving(false);
          });
        });
      }}
    >
      <div>
        {/* <button
          type="button"
          className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
            />
          </svg>
          <span className="mt-2 block text-sm font-medium text-gray-900">
            Create a new database
          </span>
        </button> */}

        <label htmlFor="image-upload">
          <div
            className="cursor-pointer relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);

              const fileList = e.dataTransfer.files;
              if (fileList) {
                const newFiles = Array.from(fileList);
                const totalSize = newFiles.reduce(
                  (acc, curr) => acc + curr.size,
                  0
                );
                if (totalSize / 1024 / 1024 > 50) {
                  toast.error("Total file size too big (max 50MB)");
                } else {
                  setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                  const images = newFiles.map((file) =>
                    URL.createObjectURL(file)
                  );
                  setData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...images],
                  }));
                }
              }
            }}
          >
            <FilePlus2Icon className="mx-auto h-12 w-12 text-gray-400" />
            {/* <svg
              className="mx-auto h-12 w-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
              />
            </svg> */}
            <span className="mt-2 block text-sm font-medium dark:text-gray-100 text-gray-900">
              Drag And DROP File
            </span>
          </div>

          {/* <div
            className={`
               'border-2 border-black
             absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all 
              
                 bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md
                 bg-white opacity-100 hover:bg-gray-50
            `}
          >
            <svg
              className={`${
                dragActive ? "scale-110" : "scale-100"
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-sm text-gray-500">
              Drag and drop or click to upload.
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Max file size: 50MB
            </p>
            <span className="sr-only">Photo upload</span>
          </div> */}
          {/* {data.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="h-full w-full rounded-md object-cover"
            />
          ))} */}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="*"
            className="sr-only"
            multiple
            onChange={onChangePicture}
          />
        </div>
      </div>

      {files.map((file, index) => (
        //   <div
        //     key={index}
        //     className="flex items-center p-2 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 rounded-lg my-2"
        //   >
        //     <svg
        //       className="w-6 h-6 mr-2  dark:text-gray-900"
        //       fill="none"
        //       stroke="currentColor"
        //       viewBox="0 0 24 24"
        //       xmlns="http://www.w3.org/2000/svg"
        //     >
        //       <path
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         strokeWidth={2}
        //         d="M13 5v6a2 2 0 002 2h6m-1-16h-5a2 2 0 00-2 2v5a2 2 0 002 2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V4a2 2 0 00-2-2h-7z"
        //       ></path>
        //     </svg>
        //     <p className="text-gray-900 dark:text-gray-100">{file.name}</p>
        //   </div>
        // <div
        //   key={index}
        //   className="relative max-w-full my-2 rounded-lg border border-gray-300 dark:bg-gray-900 bg-gray-100 px-3 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        // >
        //   <div className="flex-shrink-0">
        //     <File  className="h-7 w-7 " />
        //   </div>
        //   <div className="flex-1 min-w-0">
        //     <a href="#" className="focus:outline-none">
        //       <span className="absolute inset-0" aria-hidden="true" />
        //       <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate overflow-ellipsis ">{file.name}</p>
        //       <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{file.type}</p>
        //     </a>
        //   </div>
        // </div>
        <div
          key={index}
          className="relative max-w-full my- rounded-lg border border-gray-300 dark:bg-gray-900 bg-gray-100 px-3 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <File className="h-7 w-7" />
          </div>
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate overflow-ellipsis">
                {file.name}
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
                {file.type}
              </p>
            </a>
          </div>

          <XIcon
            // onClick={handleDelete}
            onClick={() => deleteFile(index)}
            className="text-gray-700 h-7 w-7 rounded-full relative cursor-pointer -top-8 -right-5 bg-red-600  hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-200"
          />
        </div>
      ))}

      <Button
        disabled={saveDisabled}
      //   className={`${
      //     saveDisabled
      //       ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
      //       : "border-black bg-black text-white hover:bg-white hover:text-black"
      //   } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {saving ? (
          <LoadingDots color="#808080" />
        ) : (
           <>Confirm upload</>
        )}
      </Button>
    </form>
  );
}
