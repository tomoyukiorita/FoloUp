"use client";

import { toast } from "sonner";
import { Inbox } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from 'pdfjs-dist';


type Props = {
  filekey: string;
  setFilekey: (fileKey: string) => void;
  isUploaded: boolean;
  setIsUploaded: (isUploaded: boolean) => void;
  fileName: string;
  setFileName: (fileName: string) => void;
  setUploadedDocumentContext: (context: string) => void;
};

const FileUpload = ({
  filekey,
  setFilekey,
  isUploaded,
  setIsUploaded,
  fileName,
  setFileName,
  setUploadedDocumentContext,
}: Props) => {
  const [uploading, setUploading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Please upload a file smaller than 10MB.", {
          position: "bottom-right",
          duration: 3000,
        });
        return;
      }

      try {
        setUploading(true);
        
        // Read the file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Load the PDF document
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        // Extract text from all pages
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }

        setUploadedDocumentContext(fullText);
        setIsUploaded(true);
      } catch (error) {
        console.log(error);
        toast.error("Error reading PDF", {
          description: "Please try again.",
          duration: 3000,
        });
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl w-full h-24">
      {!isUploaded ? (
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-4 flex justify-center items-center flex-col",
          })}
        >
          <input {...getInputProps()} />
          {/* <>
            {/* loading state 
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </> */}
          <>
            <>
              <Inbox className="w-8 h-8 text-blue-500" />
              <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
            </>
          </>
        </div>
      ) : (
        <div className="text-left">
          <p className="mt-2 text-sm text-slate-600">
            File uploaded successfully. {fileName}
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Do you want to{" "}
            <span
              className="underline text-slate-950 cursor-pointer font-semibold"
              onClick={() => setIsUploaded(false)}
            >
              Reupload?
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
