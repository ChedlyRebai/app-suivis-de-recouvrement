"use client";
import { useState, useCallback, useMemo, ChangeEvent } from "react";
import toast from "react-hot-toast";
import LoadingDots from "./loading-dots";
import { PutBlobResult } from "@vercel/blob";
import { File, FilePlus2Icon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { creatFile } from "@/actions/file.action";
import { useParams, useSearchParams } from "next/navigation";
// import pdfToText from 'react-pdftotext'

// function extractText(event) {
//     const file = event.target.files[0]
//     pdfToText(file)
//         .then(text => console.log(text))
//         .catch(error => console.error("Failed to extract text from pdf"))
// }
import useUploadFileModal from "@/hooks/use-UploadFile-Modal";
import extractTextFromPDF from "@/actions/utils.actions";

export default function Uploader() {
  const [data, setData] = useState({
    images: [] as string[],
  });
  const { onClose } = useUploadFileModal();
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

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
  const params = useSearchParams();

  const SUMARIZE_URL = "http://localhost:3000/api/summarize";

  const id = Number(params.get("id"));

  const [saving, setSaving] = useState(false);

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setSaving(true);

  //   try {
  //     const formData = new FormData();
  //     for (const file of files) {
  //       formData.append("files", file);
  //       const text = await extractTextFromPDF(file);
  //       console.log(`Extracted text from ${file.name}: ${text}`);
  //       // Uncomment the following block to send the extracted text to your backend for summarization
  //       // const summaryResponse = await fetch(SUMARIZE_URL, {
  //       //   method: "POST",
  //       //   headers: { "Content-Type": "application/json" },
  //       //   body: JSON.stringify({ text }),
  //       // });
  //       // const summaryData = await summaryResponse.json();
  //       // console.log(summaryData.summary);

  //       // Uncomment the following block to handle file upload
  //       // const uploadResponse = await fetch("/api/upload", {
  //       //   method: "POST",
  //       //   body: formData,
  //       // });
  //       // if (uploadResponse.ok) {
  //       //   const { url } = await uploadResponse.json();
  //       //   await creatFile(id, file.name, url);
  //       //   toast.success("Files uploaded successfully!");
  //       //   onClose();
  //       // } else {
  //       //   const error = await uploadResponse.text();
  //       //   toast.error(error);
  //       // }
  //     }
  //   } catch (error) {
  //     toast.error("Error uploading files");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const saveDisabled = useMemo(() => {
    return files.length === 0 || saving;
  }, [files.length, saving]);

  const deleteFile = (index: number) => {
    setFiles((old) => old.filter((file, i) => i !== index));
  };
  const summarizeText = (text: string) => {};
  return (
    <form
      className="grid gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData();

        files.forEach(async (file) => {
          formData.append("files", file);
          //const reader = new FileReader();
          // extractTextFromPDF(file).then((data) => {
          //   console.log(data);
          // });
          // const data = await extractTextFromPDF(file);

          // onLoadFile(file).then((data) => {
          //   console.log(data);
          // });

          let text = "hello my is chedly hello hi thank you very much";
          // fetch("/api/pdfreader", {
          //   method: "POST",
          //   headers: {
          //     "content-type": file?.type || "application/octet-stream",
          //   },
          //   body: formData,
          // }).then((res) => {
          //   // res.json();
          //   console.log(res.body);
          // });
          // .then((data) => {
          //   console.log(
          //     "***********************************************************************"
          //   );
          //   console.log(data.message.content);
          // });
          // fetch("/api/summarize", {
          //   method: "POST",
          //   body: JSON.stringify({
          //     text,
          //   }),
          // })
          //   .then((res) => res.json())
          //   .then((data) => {
          //     console.log(
          //       "***********************************************************************"
          //     );
          //     console.log(data.message.content);
          //   });
          fetch("/api/upload", {
            method: "POST",
            headers: {
              "content-type": file?.type || "application/octet-stream",
            },
            body: formData,
          }).then(async (res) => {
            if (res.ok) {
              const { url } = await res.json();
              await creatFile(id, file.name, url)
                .then(() => {
                  toast.success("Fichiers téléchargés avec succès !");

                  onClose();
                })
                .catch(() => {
                  toast.error("error");
                });
              console.log(url);
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

            <span className="mt-2 block text-sm font-medium dark:text-gray-100 text-gray-900">
              Drag And DROP File
            </span>
          </div>
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
            onClick={() => deleteFile(index)}
            className="text-gray-700 h-7 w-7 rounded-full relative cursor-pointer -top-8 -right-5 bg-red-600  hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-200"
          />
        </div>
      ))}

      <Button disabled={saveDisabled}>
        {saving ? <LoadingDots color="#808080" /> : <>Confirm upload</>}
      </Button>
    </form>
  );
}
