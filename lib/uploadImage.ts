import { ID, storage } from "@/appwrite"

export async function uploadImage(image: File) {
  if (!image) return

  const uploadedImage = await storage.createFile(process.env.NEXT_PUBLIC_IMAGE_BUCKET_ID!, ID.unique(), image)

  return uploadedImage
}