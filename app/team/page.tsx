import Advisors from "@/components/Advisors";
import Founders from "@/components/Founders";
import Nav from "@/components/landing/Nav";
import Team from "@/components/landing/Team";
import TeamMembers from "@/components/TeamMembers";

export default function Page() {
  return (
    <>
      <Nav />
      <Founders />
      <div className='h-[1px] bg-white/10' />
      <TeamMembers />
      <div className='h-[1px] bg-white/10' />
      <Advisors />
    </>
  );
}
