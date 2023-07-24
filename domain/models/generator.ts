import { LlmModel, SfModel } from "./ai_model";
import { ImageAttachment } from "./image_attachment";

export type Generator = {
    id: string;
    userId: string;
    name: string;
    quota: number;
    updatedAt: Date;
    createdAt: Date;

    // Generator Input
    referenceImages: ImageAttachment[];

    // Generator Output
    avatarImages: string[]; // image URLs
    stageImages: string[] // image URLs
    marketingPlans: string[];

    llmModel: LlmModel;
    sfModel: SfModel;
};
