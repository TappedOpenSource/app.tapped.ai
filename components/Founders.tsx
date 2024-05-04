import Member, { MemberProps } from './TeamMember';

export default function Founders() {
  return (
    <>
      <div className="flex justify-center flex-col">
        <h2 className="text-center text-4xl">team</h2>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {founders.map((member, i) => (
            <div key={i}>
              <Member {...member} />
            </div>

          ))}
        </div>
      </div>
    </>
  );
}

const founders: MemberProps[] = [
  {
    image: '/images/masters/johannes.png',
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

