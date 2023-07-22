import { AvatarStatus } from "../models/avatar";

export const generateAvatar = async ({ prompt }: {
    prompt: string,
}): Promise<string> => {
    return 'the ID';
};

export const pollAvatarStatus = async ({ id }: {
    id: string,
}): Promise<AvatarStatus> => {
    return 'complete'
}