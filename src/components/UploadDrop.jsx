"use client";
 
import { UploadDropzone  } from "@/lib/uploadthing";
import { toast } from "react-toastify";
 
export default function UploadDrop({handleSelectImages}) {
  return (
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {      
          handleSelectImages(res[0].url)         
          toast.success("Upload Completed");
        }}
        onUploadError={() => {        
          toast.error("Upload failed");
        }}
      />
  );
}