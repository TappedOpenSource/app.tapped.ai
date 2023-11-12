import Image from 'next/image';
import React, { useState } from 'react';
import api from '../data/api';
import { Prompt } from '@/domain/models/avatar';
import { useRouter } from 'next/router';
import auth from '@/data/auth';
import { getLatestImageModel } from '@/data/database';


const AestheticPage: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<Prompt>('');
  const router = useRouter();
  const userIdOption = auth.getCurrentUserId();
  let currUid;
  const handleStyleSelection = (style: Prompt) => {
    setSelectedStyle(style);
  };

  const getBorderStyle = (style: Prompt) => {
    return selectedStyle === style ? 'border-white border-2 rounded-xl' : '';
  };

  const createAvatarWithStyle = async () => {
    if (userIdOption.isSome()) {
      currUid = userIdOption.unwrap().uid;
    } else {
      console.log('No user is currently signed in.');
    }

    const imageModel = await getLatestImageModel(currUid);
    await imageModel.match({
      none: async () => {
        console.log('No image model found.');
      },
      some: async (model) => {
        console.log(model);
        if (selectedStyle) {
          const result = await api.createAvatarInferenceJob({
            modelId: model.id,
            prompt: selectedStyle,
          });
          router.push(`/results?inferenceId=${result.inferenceId}`);
        }
      },
    });
  };

  return (
    <div className="flex flex-col bg-[#63b2f2] items-center justify-center min-h-screen">
      <header className="mb-8 md:mb-0">
        <h1 className="text-3xl font-semibold">Pick your aesthetic</h1>
      </header>

      <div className='flex flex-wrap justify-center mb-8'>
        <div className="m-2">
          <button
            className={getBorderStyle('8k portrait of @subject in the style of jackson pollock\'s \'abstract expressionism,\' featuring drips, splatters, and energetic brushwork.' as Prompt)}
            onClick={() => handleStyleSelection('8k portrait of @subject in the style of jackson pollock\'s \'abstract expressionism,\' featuring drips, splatters, and energetic brushwork.' as Prompt)}>
            <Image src='/images/aesthetics/one.png' alt='one' width={150} height={150} className='rounded-xl'/>
          </button>
        </div>
        <div className="m-2">
          <button
            className={getBorderStyle('8k portrait of @subject in the style of salvador dalí\'s \'surrealism,\' featuring unexpected juxtapositions, melting objects, and a dreamlike atmosphere.' as Prompt)}
            onClick={() => handleStyleSelection('8k portrait of @subject in the style of salvador dalí\'s \'surrealism,\' featuring unexpected juxtapositions, melting objects, and a dreamlike atmosphere.' as Prompt)}>
            <Image src='/images/aesthetics/two.png' alt='one' width={150} height={150} className='rounded-xl'/>
          </button>
        </div>
        <div className="m-2">
          <button
            className={getBorderStyle('8k portrait of @subject in the style of Leonardo da Vinci\'s \'Renaissance,\' with realistic proportions, sfumato technique, and classical composition.') as Prompt}
            onClick={() => handleStyleSelection('8k portrait of @subject in the style of Leonardo da Vinci\'s \'Renaissance,\' with realistic proportions, sfumato technique, and classical composition.' as Prompt)}>
            <Image src='/images/aesthetics/three.png' alt='one' width={150} height={150} className='rounded-xl'/>
          </button>
        </div>
        <div className="m-2">
          <button
            className={getBorderStyle('8k portrait of @subject in the style of Retro comic style artwork, highly detailed spiderman, comic book cover, symmetrical, vibrant') as Prompt}
            onClick={() => handleStyleSelection('8k portrait of @subject in the style of Retro comic style artwork, highly detailed spiderman, comic book cover, symmetrical, vibrant' as Prompt)}>
            <Image src='/images/aesthetics/four.png' alt='one' width={150} height={150} className='rounded-xl'/>
          </button>
        </div>
        <div className="m-2">
          <button
            className={getBorderStyle('an anime portrait of @subject, an anime portrait, high resolution, sharp features, 32k, super-resolution, sharp focus, depth of field, bokeh, official media, trending on pixiv, oil painting, yoji shinakawa, studio gainax, y2k design, anime, dramatic lighting') as Prompt}
            onClick={() => handleStyleSelection('an anime portrait of @subject, an anime portrait, high resolution, sharp features, 32k, super-resolution, sharp focus, depth of field, bokeh, official media, trending on pixiv, oil painting, yoji shinakawa, studio gainax, y2k design, anime, dramatic lighting' as Prompt)} >
            <Image src='/images/aesthetics/five.png' alt='one' width={150} height={150} className='rounded-xl'/>
          </button>
        </div>
        <div className="m-2">
          <button
            className={getBorderStyle('8k high-fashion shot of @subject, ken from barbie on a beach, 8k high-fashion shot, blonde hair, wearing pink, vibrant backdrop of malibu beach, styled in a chic and tailored pastel suit without a tie, iconic windswept hair, flawless dramatic lighting with soft shadows, captured with a 100mm leica summilux f/1.4 lens, showcasing intricate details and capturing the essence of modern masculinity and style') as Prompt}
            onClick={() => handleStyleSelection('8k high-fashion shot of @subject, ken from barbie on a beach, 8k high-fashion shot, blonde hair, wearing pink, vibrant backdrop of malibu beach, styled in a chic and tailored pastel suit without a tie, iconic windswept hair, flawless dramatic lighting with soft shadows, captured with a 100mm leica summilux f/1.4 lens, showcasing intricate details and capturing the essence of modern masculinity and style' as Prompt)}>
            <Image src='/images/aesthetics/six.png' alt='one' width={150} height={150} className='rounded-xl'/>
          </button>
        </div>
        <div className="m-2">
          <button
            className={getBorderStyle('8k ultra realistic animation of @subject, ultra realistic animation, as disney prince pixar style pixar 3d cartoon style gorgeous tangled beautiful animation character art') as Prompt}
            onClick={() => handleStyleSelection('8k ultra realistic animation of @subject, ultra realistic animation, as disney prince pixar style pixar 3d cartoon style gorgeous tangled beautiful animation character art' as Prompt)}>
            <Image src='/images/aesthetics/seven.png' alt='one' width={150} height={150} className='rounded-xl'/>
          </button>
        </div>
        <div className="m-2">
          <button
            className={getBorderStyle('8k close up linkedin profile picture of @subject, professional jack suite, professional headshots, photo-realistic, 4k, high-resolution image, workplace settings, upper body, modern outfit, professional suit, businessman, blurred background, glass building, office window') as Prompt}
            onClick={() => handleStyleSelection('8k close up linkedin profile picture of @subject, professional jack suite, professional headshots, photo-realistic, 4k, high-resolution image, workplace settings, upper body, modern outfit, professional suit, businessman, blurred background, glass building, office window' as Prompt)}>
            <Image src='/images/aesthetics/eight.png' alt='one' width={150} height={150} className='rounded-xl'/>
          </button>
        </div>
      </div>
      <div>
        <button onClick={createAvatarWithStyle} className="tapped_btn_rounded">
          Create Avatar
        </button>
      </div>
    </div>
  );
};

export default AestheticPage;
