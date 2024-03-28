"use client";
 
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "react-toastify";
 
export default function UploadBtn() {
  return (
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          toast.success("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />  
  );
}