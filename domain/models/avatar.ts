import { DocumentSnapshot, Timestamp } from 'firebase/firestore';
import { Option, Some, None } from '@sniptt/monads';

export type Avatar = {
    id: string;
    userId: string;
    prompt: string;
    url: Option<string>;
    errorMsg: Option<string>;
    timestamp: Date;
};

export type Prompt = '8k close up linkedin profile picture of @subject, professional jack suite, professional headshots, photo-realistic, 4k, high-resolution image, workplace settings, upper body, modern outfit, professional suit, businessman, blurred background, glass building, office window'
                   | '8k ultra realistic animation of @subject, ultra realistic animation, as disney prince pixar style pixar 3d cartoon style gorgeous tangled beautiful animation character art'
                   | '8k high-fashion shot of @subject, ken from barbie on a beach, 8k high-fashion shot, blonde hair, wearing pink, vibrant backdrop of malibu beach, styled in a chic and tailored pastel suit without a tie, iconic windswept hair, flawless dramatic lighting with soft shadows, captured with a 100mm leica summilux f/1.4 lens, showcasing intricate details and capturing the essence of modern masculinity and style'
                   | 'an anime portrait of @subject, an anime portrait, high resolution, sharp features, 32k, super-resolution, sharp focus, depth of field, bokeh, official media, trending on pixiv, oil painting, yoji shinakawa, studio gainax, y2k design, anime, dramatic lighting'
                   | '8k portrait of @subject in the style of Retro comic style artwork, highly detailed spiderman, comic book cover, symmetrical, vibrant'
                   | '8k portrait of @subject in the style of Leonardo da Vinci\'s \'Renaissance,\' with realistic proportions, sfumato technique, and classical composition.'
                   | '8k portrait of @subject in the style of salvador dalí\'s \'surrealism,\' featuring unexpected juxtapositions, melting objects, and a dreamlike atmosphere.'
                   | '8k portrait of @subject in the style of jackson pollock\'s \'abstract expressionism,\' featuring drips, splatters, and energetic brushwork.'
                   | '';

export const avatarConverter = {
  toFirestore: (avatar: Avatar) => {
    return {
      ...avatar,
      errorMsg: avatar.errorMsg.isSome() ? avatar.errorMsg.unwrap() : null,
      timestamp: Timestamp.fromDate(avatar.timestamp),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options): Avatar => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      userId: data.userId,
      prompt: data.prompt,
      url: data.url,
      errorMsg: data.errorMsg ? Some(data.errorMsg) : None,
      timestamp: data.timestamp.toDate(),
    };
  },
};
