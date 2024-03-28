import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

import { OurFileRouter } from "@/src/app/api/uploadthing/core";

const UploadButton = generateUploadButton();
const UploadDropzone = generateUploadDropzone();

module.exports = { UploadButton, UploadDropzone };
