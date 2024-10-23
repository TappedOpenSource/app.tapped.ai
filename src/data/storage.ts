import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function uploadProfilePicture(userId: string, file: File): Promise<string> {
  const extension = file.name.split(".").pop();
  const prefix = userId === null ? "images/users" : `images/users/${userId}`;

  const uniquePhotoId = uuidv4();
  const imageRef = ref(storage, `${prefix}/userProfile_${uniquePhotoId}.${extension}`);
  await uploadBytes(imageRef, file);

  return await getDownloadURL(imageRef);
}

export async function uploadPressKit(userId: string, file: File): Promise<string> {
  const extension = file.name.split(".").pop();
  const prefix = userId === null ? "press_kits" : `press_kits/${userId}`;

  const uniquePhotoId = uuidv4();
  const imageRef = ref(storage, `${prefix}/press_kit_${uniquePhotoId}.${extension}`);
  await uploadBytes(imageRef, file);

  return await getDownloadURL(imageRef);
}

export async function uploadFlier(bookingId: string, file: File) {
  const extension = file.name.split(".").pop();
  const uniquePhotoId = uuidv4();
  const imageRef = ref(storage, `images/booking/${bookingId}/flier_${uniquePhotoId}.${extension}`);
  await uploadBytes(imageRef, file);

  return await getDownloadURL(imageRef);
}
