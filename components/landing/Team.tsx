import Image from 'next/image';


type MemberProps = {
  image: string;
  name: string;
  title: string;
  subtitle: string;
};

function Member({ image, name, title, subtitle }: MemberProps) {
  return (
    <div>

      <div className='relative rounded-xl w-[192px] h-[288px] mx-4 my-4'>
        <Image src={image} alt={name} fill className='rounded-xl' style={{ objectFit: 'cover' }} />
        <div className='absolute h-full w-full bg-gradient-to-t from-black from-10% via-transparent via-50% to-transparent' />
        <div className='absolute bottom-0 left-0 px-2 py-2'>
          <p className='font-bold'>{name}</p>
          <p className='text-sm'>{title}</p>
          <p className='font-thin text-xs'>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <>
      <div className="flex justify-center flex-col">
        <h2 className="text-center text-4xl">founding team</h2>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {team.map((member, i) => (
            <div key={i}>
              <Member {...member} />
            </div>

          ))}
        </div>
        <h2 className="text-center text-4xl">advisors & investors</h2>
        <div className='flex justify-center'>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center">
            {advisors.map((member, i) => (
              <div key={i}>
                <Member {...member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const team: MemberProps[] = [
  {
    image: '/images/masters/johannes.jpeg',
    name: 'johannes naylor',
    title: 'founder',
    subtitle: 'prev. audius, capital one',
  },
  {
    image: '/images/masters/ilias.jpeg',
    name: 'ilias anwar',
    title: 'founder',
    subtitle: 'prev. tcc entertainment, gold media agency',
  },
];

const advisors: MemberProps[] = [
  {
    image: '/images/masters/chibu.jpg',
    name: 'chibu',
    title: 'owner of playmakrs ent.',
    subtitle: 'prev. exec producer of french montana, #1 Billboard hit single with drake',
  },
  {
    image: '/images/masters/quinelle.jpg',
    name: 'quinelle holder',
    title: 'exec. at the grammys',
    subtitle: 'ceo of medium creative agency, curator at digilog',
  },
  {
    image: '/images/masters/mic.png',
    name: 'mic plug nation',
    title: 'ceo of plug nation bookings',
    subtitle: 'named #1 booking agent of nyc head of booking @ concert crave',
  },
  {
    image: '/images/masters/daveharris.jpg',
    name: 'dave harris jr.',
    title: 'ceo of blank kanvaz records',
    subtitle: 'prev. death row records exec, angel investor',
  },
  {
    image: '/images/masters/navarro.png',
    name: 'navarro w. gray',
    title: 'lawyer label exec',
    subtitle: 'representing fetty wap, rated #1 hip hop lawyer, sony/atv music publishing deal',
  },
  {
    image: '/images/masters/dheeraj.jpeg',
    name: 'dheeraj manjunath',
    title: 'angel investor',
    subtitle: 'prev. head of eng. at audius, founder of triblio (acq.), eloqua (acq.)',
  },
];
