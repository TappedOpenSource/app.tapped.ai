/* eslint-disable camelcase */
import { Resize } from '@cloudinary/url-gen/actions';
import cloudinary from '../utils/cloudinary';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { Transformation } from '@cloudinary/url-gen';
// import { opacity } from '@cloudinary/url-gen/actions/adjust';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { scale } from '@cloudinary/url-gen/actions/resize';

const INPUT_IMAGE_WIDTH = 512;
const INPUT_IMAGE_HEIGHT = 512;
const TAPPED_LOGO_PUBIC_ID = 'vuwaxz4rhimeqz4bm834';

export type Storage = {
    // uploadInputImage: (input: {
    //   imagePath: string;
    // }) => Promise<{ url: string }>;
    // deleteInputImage: (input: { public_id: string }) => Promise<void>;

    saveGeneratedAvatarImage: (input: {
      generatorId: string,
      avatarId: string,
      imageUrl: string,
    }) => Promise<{ url: string }>;
};

const FirebaseCloudinaryStorage: Storage = {
  // uploadInputImage: async ({ imagePath }: {
  //   imagePath: string;
  // }): Promise<{ url: string }> => {
  //   const { public_id } = await cloudinary.v2.uploader.upload(imagePath, {
  //     upload_preset: 'input_images',
  //   });
  //   const uploadedImage = cloudinary.cld.image(public_id);
  //   uploadedImage.resize(Resize
  //     .scale()
  //     .width(INPUT_IMAGE_WIDTH)
  //     .height(INPUT_IMAGE_HEIGHT),
  //   );
  //   const resizedUrl = uploadedImage.toURL();
  //   return { url: resizedUrl };
  // },
  // deleteInputImage: async ({ public_id }: { public_id: string }): Promise<void> => {
  // await cloudinary.v2.uploader.destroy(public_id);
  // },
  saveGeneratedAvatarImage: async ({
    generatorId,
    avatarId,
    imageUrl,
  }: {
    generatorId: string,
    avatarId: string,
    imageUrl: string,
  }): Promise<{ url: string }> => {
    // const { public_id } = await cloudinary.v2.uploader.upload(imageUrl, {
    //   folder: `generated_avatars/${generatorId}/${avatarId}`,
    //   upload_preset: 'generated_avatars',
    // });

    const public_id = 'generated_avatars/1/1/1';

    const uploadedImage = cloudinary.cld.image(public_id);
    const overlaidImage = uploadedImage
      .overlay(
        source(
          image(TAPPED_LOGO_PUBIC_ID).transformation(
            new Transformation().resize(scale().width(256).height(256))
          )
        ).position(
          new Position()
            .gravity(compass('south_east'))
            .offsetY(20)
        )
          .blendMode('overlay')
      )
      .format('png');
    const url = overlaidImage.toURL();

    return { url };
  },
};

export default FirebaseCloudinaryStorage;
