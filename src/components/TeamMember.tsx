import Image from "next/image";
import Link from "next/link";

export type MemberProps = {
  image: string;
  name: string;
  title: string;
  subtitle: string | null;
  url: string | null;
};

function Card({ image, name, title, subtitle }: MemberProps) {
  return (
    <div className="relative mx-4 my-4 h-[288px] w-[192px] transform rounded-xl transition-all duration-200 ease-in-out hover:scale-105">
      <Image
        src={image}
        alt={name}
        fill
        className="rounded-xl"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute h-full w-full bg-gradient-to-t from-black from-10% via-transparent via-50% to-transparent" />
      <div className="absolute bottom-0 left-0 px-2 py-2">
        <p className="font-bold text-white">{name}</p>
        <p className="text-sm text-white">{title}</p>
        {subtitle !== null ? (
          <p className="text-xs font-thin text-white">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function Member(props: MemberProps) {
  return (
    <div>
      {props.url === null ? (
        <Card {...props} />
      ) : (
        <Link href={props.url}>
          <Card {...props} />
        </Link>
      )}
    </div>
  );
}
