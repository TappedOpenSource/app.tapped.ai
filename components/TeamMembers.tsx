import Member, { MemberProps } from './TeamMember';

export default function TeamMembers() {
  return (
    <>
      <div className="flex justify-center flex-col">
        <div className='flex justify-center'>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center">
            {teamMembers.map((member, i) => (
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

const teamMembers: MemberProps[] = [
  {
    image: '/images/masters/bryan.png',
    name: 'bryan frumkin',
    title: 'data entry',
    subtitle: null,
  },
  {
    image: '/images/masters/armaanomar.png',
    name: 'armaan omarzai',
    title: 'engineer',
    subtitle: null,
  },
  {
    image: '/images/masters/avidshotz.jpeg',
    name: 'charles legard',
    title: 'engineer',
    subtitle: null,
  },
];
