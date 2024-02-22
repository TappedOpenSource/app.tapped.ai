import { Option } from '@sniptt/monads';

const defaultImages = [];

export function getDefaultImage(id: Option<string>) {
  // calculate mod of id on default iamge length
  const numOfImages = defaultImages.length;
  const index = id.map((id) => id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % numOfImages);

  return index.match({
    some: (index) => defaultImages[index],
    none: () => {
      const randomIndex = Math.floor(Math.random() * numOfImages);
      return defaultImages[randomIndex];
    },
  });
}
