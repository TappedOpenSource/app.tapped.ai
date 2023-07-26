import { Resize } from "@cloudinary/url-gen/actions";
import cloudinary from "../utils/cloudinary";

const INPUT_IMAGE_WIDTH = 512;
const INPUT_IMAGE_HEIGHT = 512;

export type Storage = {
    uploadInputImage: (input: UploadInputImageInput) => Promise<UploadInputImageOutput>;
};

type UploadInputImageInput = {
    imagePath: string;
};

type UploadInputImageOutput = {
    url: string;
};

const CloudinaryStorage: Storage = {
  uploadInputImage: async ({ imagePath }: UploadInputImageInput): Promise<UploadInputImageOutput> => {
    // eslint-disable-next-line camelcase
    const { public_id } = await cloudinary.v2.uploader.upload(imagePath, {
      upload_preset: "input_images",
    });

    const uploadedImage = cloudinary.cld.image(public_id);
    uploadedImage.resize(Resize
      .scale()
      .width(INPUT_IMAGE_WIDTH)
      .height(INPUT_IMAGE_HEIGHT),
    );
    const resizedUrl = uploadedImage.toURL();
    return { url: resizedUrl };
  },
};

export default CloudinaryStorage;
