
import Image from 'next/image';

export type MemberProps = {
  image: string;
  name: string;
  title: string;
  subtitle: string | null;
};


export default function Member({ image, name, title, subtitle }: MemberProps) {
  return (
    <div>
      <div className='relative rounded-xl w-[192px] h-[288px] mx-4 my-4 hover:scale-110'>
        <Image src={image} alt={name} fill className='rounded-xl' style={{ objectFit: 'cover' }} />
        <div className='absolute h-full w-full bg-gradient-to-t from-black from-10% via-transparent via-50% to-transparent' />
        <div className='absolute bottom-0 left-0 px-2 py-2'>
          <p className='font-bold'>{name}</p>
          <p className='text-sm'>{title}</p>
          {subtitle !== null ? <p className='font-thin text-xs'>{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
}
