
export type AiModel = {
    id: string;
    generatorId: string;
    type: AiModelType;
    status: AiModelStatus;
};

export type AiModelType = "llm" | "sd";

export type AiModelStatus = "initial"
    | "training"
    | "ready"
    | "inferring";

// Large Language Model
export type LlmModel = AiModel & { type: "llm" };

// Stable Diffusion Model
export type SdModel = AiModel & { type: "sd" }

