
import Image from 'next/image';
import nyweekly from '../../public/images/ny-weekly.png';
import calipost from '../../public/images/calipost.png';
import vcunews from '../../public/images/vcu-news.png';

const FeaturedIn = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-12 items-center justify-center py-12">
        <p className="font-extrabold opacity-80">FEATURED IN</p>
        <div>
          <Image
            src={nyweekly}
            alt="new york weekly logo"
            width={124}
          />
        </div>
        <div>
          <Image
            src={calipost}
            alt="calipost logo"
            width={124}
          />
        </div>
        <div>
          <Image
            src={vcunews}
            alt="vcu news logo"
            width={124}
          />
        </div>
      </div>
    </>
  );
};

export default FeaturedIn;
