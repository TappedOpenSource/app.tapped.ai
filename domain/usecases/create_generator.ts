
import { v4 as uuidv4 } from 'uuid';
import { BrandGenerator } from '../models/brand_generator';
import database from '../../data/database';
import firebase from '../../utils/firebase';

export const submitCreateGeneratorForm = async (formInputs: {
  artistDescription: string[];
  artistName: string;
  artistProfession: string;
  gender: string;
  modelName: string;
  postFreq: string;
  refImages: string[];
  sellingPoint: string;
  socialFollowing: number;
  theme: string;
}) => {
  // TODO: upload images to cloudinary

  // Create new generator object
  const uuid = uuidv4();
  const llmModelId = uuidv4();
  const sfModelId = uuidv4();
  const generator: BrandGenerator = {
    id: uuid,
    userId: firebase.JOHANNES_USERID, // TODO Change later
    quota: 100,
    updatedAt: new Date(),
    createdAt: new Date(),

    // inputs
    artistDescription: formInputs.artistDescription,
    artistName: formInputs.artistName,
    artistProfession: formInputs.artistProfession,
    gender: formInputs.gender,
    modelName: formInputs.modelName,
    postFreq: formInputs.postFreq,
    refImages: formInputs.refImages,
    sellingPoint: formInputs.sellingPoint,
    socialFollowing: formInputs.socialFollowing,
    theme: formInputs.theme,

    // outputs
    stageImages: [],
    avatarImages: [],
    marketingPlans: [],

    llmModel: {
      id: llmModelId,
      generatorId: uuid,
      type: 'llm',
      status: 'initial',
    },
    sdModel: {
      id: sfModelId,
      generatorId: uuid,
      type: 'sd',
      status: 'initial',
    },
  };

  // Add to DB
  database.createGenerator(generator);
};
