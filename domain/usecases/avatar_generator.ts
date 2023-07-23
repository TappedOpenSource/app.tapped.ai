import { v4 as uuidv4 } from 'uuid';
import { createAvatar, getAvatar } from "../../data/firestore";
import { Avatar, AvatarStatus } from "../models/avatar";
import { None, Option } from '@sniptt/monads';
import { pollHuggingFaceAvatarModel } from '../../data/functions';

export const generateAvatar = async ({ prompt }: {
    prompt: string,
}): Promise<string> => {
    const uuid = uuidv4();
    const avatar: Avatar = {
        id: uuid,
        userId: '123', // TODO: get from auth
        prompt,
        status: "initial",
        url: None,
        errorMsg: None,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const avatarId = await createAvatar({ avatar });

    return avatarId;
};

export const pollAvatarStatus = async (
    avatarId: string,
): Promise<AvatarStatus> => {
    const avatar = await getAvatar(avatarId);

    return avatar.match({
        some: (avatar: Avatar): AvatarStatus => {
            const status = avatar.status;

            console.log(`avatar status: ${status}`);

            if (status !== "generating") {
                return status;
            }

            const prompt = avatar.prompt;
            pollHuggingFaceAvatarModel({prompt, avatarId: avatar.id}).catch((error) => {
                console.error(error);
            });

            return status;
        },
        none: (): AvatarStatus => {
            console.log("No avatar found")
            return "error";
        },
    });

}