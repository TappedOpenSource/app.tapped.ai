import type { NextPage } from 'next/types';
import withSubscription from '@/domain/auth/withSubscription';
import { FaPaintBrush, FaBullhorn, FaNewspaper, FaBalanceScale, FaLock } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import { MdMessage } from 'react-icons/md';
import { useRouter } from 'next/router';

const Team: NextPage = () => {
  return (
    <div className="bg-[#63b2f2] min-h-screen p-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-2">your AI Team</h1>
      <h2 className="text-center text-lg font-bold my-4">credits: 500</h2>
      <div className="grid grid-cols-2 gap-4 flex-grow">
        <Panel label="Designer" icon={<FaPaintBrush size={20} color="#63b2f2" />} clickable />
        <LockedPanel label="Social Media Manager" icon={<BsPeopleFill size={20} color="#63b2f2" />} />
        <LockedPanel label="Marketer" icon={<FaBullhorn size={20} color="#63b2f2" />} />
        <LockedPanel label="Publicist" icon={<FaNewspaper size={20} color="#63b2f2" />} />
        <LockedPanel label="A&R" icon={<MdMessage size={20} color="#63b2f2" />} />
        <LockedPanel label="Lawyer" icon={<FaBalanceScale size={20} color="#63b2f2" />} />
      </div>
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
