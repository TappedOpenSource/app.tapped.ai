import type { NextPage } from 'next/types';
import withSubscription from '@/domain/auth/withSubscription';
import { FaPaintBrush, FaBullhorn, FaNewspaper, FaBalanceScale, FaLock } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import { MdMessage } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, doc, query, getDocs, orderBy, limit } from 'firebase/firestore';
import firebase from '../utils/firebase';
import FirebaseAuth from '@/data/auth';

const Team: NextPage = () => {
  const router = useRouter();
  const userIdOption = FirebaseAuth.getCurrentUserId();
  const [currUid, setCurrUid] = useState<string | null>(null);
  const [modelStatus, setModelStatus] = useState<string | null>(null);

  useEffect(() => {
    if (userIdOption.isSome()) {
      setCurrUid(userIdOption.unwrap().uid);
    } else {
      console.log('No user is currently signed in.');
    }
  }, [userIdOption]);

  useEffect(() => {
    if (currUid) {
      (async () => {
        const modelId = await fetchLatestModelId(currUid);
        if (!modelId) {
          router.push('/face_capture');
        }
      })();
    }
  }, [currUid, router]);

  const fetchLatestModelId = async (userId) => {
    const aiModelsCollection = collection(firebase.db, 'aiModels');
    const userDoc = doc(aiModelsCollection, userId);
    const imageModelsSubCollection = collection(userDoc, 'imageModels');

    const q = query(imageModelsSubCollection, orderBy('timestamp', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const status = querySnapshot.docs[0].data().status;
      setModelStatus(status);
      return querySnapshot.docs[0].data().id;
    } else {
      console.log('No modelId found for user!');
      return null;
    }
  };

  return (
    <div className="bg-[#63b2f2] min-h-screen p-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-2">your AI Team</h1>
      <h2 className="text-center text-lg font-bold my-4">credits: 500</h2>
      {modelStatus === 'training' && (
        <div className="text-center font-semibold mt-40">
          The model is still training, come back when it&apos;s ready.
        </div>
      )}
      {modelStatus === 'ready' && (
        <div className="grid grid-cols-2 gap-4 flex-grow">
          <Panel label="Designer" icon={<FaPaintBrush size={20} color="#63b2f2" />} clickable />
          <LockedPanel label="Social Media Manager" icon={<BsPeopleFill size={20} color="#63b2f2" />} />
          <LockedPanel label="Marketer" icon={<FaBullhorn size={20} color="#63b2f2" />} />
          <LockedPanel label="Publicist" icon={<FaNewspaper size={20} color="#63b2f2" />} />
          <LockedPanel label="A&R" icon={<MdMessage size={20} color="#63b2f2" />} />
          <LockedPanel label="Lawyer" icon={<FaBalanceScale size={20} color="#63b2f2" />} />
        </div>
      )}
      {modelStatus === 'errored' && (
        <div className="text-center font-semibold mt-40">
          <p>There seems to have been an error with your model creation, let&apos;s go make another one.</p>
          <button
            className="tapped_btn_rounded"
            onClick={() => router.push('/face_capture')}
          >
            Capture Again
          </button>
        </div>
      )}
      {!modelStatus && (
        <div className="flex justify-center items-center mt-40">
          <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

const Panel = ({ label, icon, clickable = false }: { label: string; icon: JSX.Element; clickable?: boolean }) => {
  const router = useRouter();

  const content = (
    <div className={`bg-white p-3 rounded-lg shadow-lg flex flex-col items-center justify-center h-full ${clickable ? 'cursor-pointer' : ''}`}>
      {icon}
      <p className="mt-2 text-xs text-[#63b2f2] font-medium">{label}</p>
    </div>
  );

  if (clickable && label === 'Designer') {
    return <button onClick={() => router.push('/designer')}>{content}</button>;
  } else if (clickable) {
    return <button onClick={() => console.log(`${label} clicked`)}>{content}</button>;
  }

  return content;
};

const LockedPanel = (props: { label: string; icon: JSX.Element }) => {
  return (
    <div className="relative">
      <Panel {...props} />
      <div className="absolute inset-0 bg-black rounded-lg opacity-70 flex items-center justify-center">
        <FaLock size={20} color="#63b2f2" />
      </div>
    </div>
  );
};

export default withSubscription(Team);
