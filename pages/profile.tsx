import type { NextPage } from 'next/types';
import Head from 'next/head';
import Image from 'next/image';
// import {useRouter} from "next/router";
import { Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

import { Option, None, Some } from '@sniptt/monads';
import { generateAvatar, generateMarketingPlan, pollAvatarStatus } from '../domain/usecases/avatar_generator';
import database from '../data/database';
import firebase from '../utils/firebase';
import { Avatar } from '../domain/models/avatar';
import GeneratorCard from '../components/GeneratorCard';
import CreateGeneratorButton from '../components/CreateGeneratorButton';
import withAuth from '../domain/auth/withAuth';

const Profile: NextPage = () => {
  //   const {push} = useRouter();

  const maxRetries = 20;
  const [fiveWords, setFiveWords] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');
  // const [userPhotos, setUserPhotos] = useState<string>("");
  const [generating, isGenerating] = useState<boolean>(false);
  const [retry, setRetry] = useState(0);
  const [retryCount, setRetryCount] = useState(maxRetries);

  const [avatar, setAvatar] = useState<Option<Avatar>>(None);
  const [avatarUrl, setAvatarUrl] = useState<Option<string>>(None);

  const [marketingPlan, setMarketingPlan] = useState<Option<string>>(None);

  const FAKE_PROMPT = 'johannes playing the piano at a fancy opera house';

  useEffect(() => {
    const runRetry = async () => {
      if (retryCount === 0) {
        console.log(`Model still loading after ${maxRetries} retries`);
        console.log('Try again in 5 minutes');
        setRetryCount(maxRetries);
        return;
      }

      console.log(`Trying again in ${retry} seconds.`);

      await sleep(retry * 1000);

      await pollBranding(avatar.unwrap());
    };

    if (retry === 0) {
      return;
    }

    runRetry();
  }, [retry, avatar]);

  const pollBranding = async (a: Avatar) => {
    const uuid = a.id;
    const status = await pollAvatarStatus(uuid);
    switch (status) {
    case 'initial':
      setRetry(5);
      break;
    case 'generating':
      // const { estimatedTime } = imageResp.data as { estimatedTime: number };
      // setRetry(estimatedTime);
      setRetry(20);
      break;
    case 'complete':
      const avatar = await database.getAvatar({
        id: uuid,
        userId: firebase.JOHANNES_USERID,
      });
      const imageUrl = avatar.unwrap().url;
      const image = imageUrl;
      setAvatarUrl(image);
      isGenerating(false);
      break;
    case 'error':
      isGenerating(false);
      console.log('error');
      break;
    }
  };

  const generateBranding = async () => {
    isGenerating(true);

    const [a, market] = await Promise.all([
      generateAvatar({
        prompt: FAKE_PROMPT,
      }),
      generateMarketingPlan({
        artistName: 'Johannes',
        artistGenres: 'classical, piano, jazz',
        igFollowerCount: 0,
      }),
    ]);
    setAvatar(Some(a));
    setMarketingPlan(Some(market));

    await pollBranding(a);
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <>
      <Head>
        <title>Bob from Tapped | Dashboard</title>
      </Head>
      {/* <button
                className=""
            >
                Connect Spotify
            </button> */}
      <div
        className="flex flex-col items-center bg-white pr-12 pl-12"
      >
        <div className="pt-12"></div>
        {generating ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={generateBranding}
            color="primary">
            Make a Thing
          </Button>
        )}
        <div className="pt-12"></div>
        {avatarUrl.isSome() && (
          <div className="output-content">
            <Image
              src={avatarUrl.unwrap()}
              width={512}
              height={512}
              alt={'johannes input'}
            />
            {/* <p>{finalPrompt}</p> */}
          </div>
        )}
        <div className="pt-12"></div>
        {marketingPlan.isSome() && (
          <p>
            {marketingPlan.unwrap()}
          </p>
        )}
      </div>
      <CreateGeneratorButton />
      <GeneratorCard />
    </>
  );
};

export default withAuth(Profile);
