
import { v4 as uuidv4 } from "uuid";
import { BrandGenerator } from "../models/brand_generator";
import database from "../../data/database";
import firebase from "../../utils/firebase";

export const submitCreateGeneratorForm = async (formInputs: {
    name: string;
    artistName: string;
    referenceImages: string[];
    genres: string[];
    socialFollowing: string;
    sellingPoint: string;
    theme: string;
    planLength: string;
    postFreq: string;
}) => {
  // TODO: upload images to cloudinary

  // Create new generator object
  const uuid = uuidv4();
  const llmModelId = uuidv4();
  const sfModelId = uuidv4();
  const generator: BrandGenerator = {
    id: uuid,
    userId: firebase.JOHANNES_USERID, // TODO Change later
    name: formInputs.name,
    quota: 100,
    updatedAt: new Date(),
    createdAt: new Date(),
    // inputs
    artistName: formInputs.artistName,
    referenceImages: formInputs.referenceImages,
    genres: formInputs.genres,
    socialFollowing: formInputs.socialFollowing,
    sellingPoint: formInputs.sellingPoint,
    theme: formInputs.theme,
    planLength: formInputs.planLength,
    postFreq: formInputs.postFreq,

    // outputs
    stageImages: [],
    avatarImages: [],
    marketingPlans: [],

    llmModel: {
      id: llmModelId,
      generatorId: uuid,
      type: "llm",
      status: "initial",
    },
    sdModel: {
      id: sfModelId,
      generatorId: uuid,
      type: "sd",
      status: "initial",
    },
  };

  // Add to DB
  database.createGenerator(generator);
};
