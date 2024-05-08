import Member, { MemberProps } from "./TeamMember";

export default function Advisors() {
  return (
    <>
      <div className="flex justify-center flex-col">
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

const advisors: MemberProps[] = [
  {
    image: "/images/masters/chibu.jpg",
    name: "chibu",
    title: "owner of playmakrs ent.",
    subtitle: "prev. exec producer of french montana, #1 Billboard hit single with drake",
    url: null,
  },
  {
    image: "/images/masters/quinelle.jpg",
    name: "quinelle holder",
    title: "exec. at the grammys",
    subtitle: "ceo of medium creative agency, curator at digilog",
    url: null,
  },
  {
    image: "/images/masters/mic.png",
    name: "mic plug nation",
    title: "ceo of plug nation bookings",
    subtitle: "named #1 booking agent of nyc head of booking @ concert crave",
    url: null,
  },
  {
    image: "/images/masters/daveharris.jpg",
    name: "dave harris jr.",
    title: "ceo of blank kanvaz records",
    subtitle: "prev. death row records exec, angel investor",
    url: null,
  },
  {
    image: "/images/masters/navarro.png",
    name: "navarro w. gray",
    title: "lawyer label exec",
    subtitle: "representing fetty wap, rated #1 hip hop lawyer, sony/atv music publishing deal",
    url: null,
  },
  {
    image: "/images/masters/dheeraj.jpeg",
    name: "dheeraj manjunath",
    title: "angel investor",
    subtitle: "prev. head of eng. at audius, founder of triblio (acq.), eloqua (acq.)",
    url: null,
  },
];
