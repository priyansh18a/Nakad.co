import express, { Request, Response } from "express";
import multer from "multer";
import mime from "mime-types";
import {
  BlobSASPermissions,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
export const router = express.Router();
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");
import { config } from "dotenv";
config();
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const STORAGE_ACCOUNT_KEY = process.env.STORAGE_ACCOUNT_KEY;
const storageSharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY);
const containerName = "images";

const containerClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING).getContainerClient(
  containerName
);

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, ""); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};

router.post("/upload", uploadStrategy, async (req: Request, res: Response) => {
  const blobName = getBlobName(req.file.originalname);
  const streamLength = req.file.buffer.length;
  const contentType = mime.lookup(req.file.originalname) || null;
  try {
    const response = await containerClient.uploadBlockBlob(blobName, req.file.buffer, streamLength, {
      blobHTTPHeaders: { blobContentType: contentType },
    });

    // const blobSAS = generateBlobSASQueryParameters(
    //   {
    //     containerName, // Required
    //     blobName, // Required
    //     permissions: BlobSASPermissions.parse("r"), // Required
    //     startsOn: new Date(new Date().valueOf() - 600_000), // Optional
    //     expiresOn: new Date(new Date().valueOf() + 600_000), // Required. Date type
    //   },
    //   storageSharedKeyCredential
    // ).toString();

    res.json({ fileUrl: containerClient.getBlobClient(blobName).url });
    res.end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
