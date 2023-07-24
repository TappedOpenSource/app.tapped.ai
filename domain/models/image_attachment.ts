
export type ImageAttachment = {
    url: string;
    status: ImagePipelineStatus;
}

export type ImagePipelineStatus = "initial" | "pending" | "complete";
