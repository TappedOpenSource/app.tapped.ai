import { Option } from "@/domain/types/option";

const defaultImages = [];

export function getDefaultImage(id: Option<string>) {
  // calculate mod of id on default iamge length
  const numOfImages = defaultImages.length;
  const index = (id?.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) ?? 0) % numOfImages;

  return defaultImages[index];
}
