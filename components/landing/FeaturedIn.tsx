
import Image from 'next/image';
import Link from 'next/link';

const FeaturedIn = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center py-12">
        <p className="font-extrabold opacity-80">FEATURED IN</p>
        <div>
          <Link
            href="https://nyweekly.com/business/how-tapped-ai-and-ilias-anwar-are-making-record-labels-more-fair/"
          >
            <Image
              src="/images/ny-weekly.png"
              alt="new york weekly logo"
              width={124}
              height={124}
              className='rounded-lg'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }} />
          </Link>
        </div>
        <div>
          <Link
            href="https://calipost.com/empowering-artists-tappedai-and-johannes-naylor-welcome-first-10-artists-to-ai-powered-record-label/"
          >
            <Image
              src="/images/calipost.png"
              alt="calipost logo"
              width={124}
              height={124}
              className='rounded-lg'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }} />
          </Link>
        </div>
        <div>
          <Link
            href="https://news.vcu.edu/article/2023/07/starting-with-a-blog-during-freshman-year-vcu-alum-ilias-anwar-has-built-a-creative-agency"
          >
            <Image
              src="/images/vcu-news.png"
              alt="vcu news logo"
              width={124}
              height={124}
              className='rounded-lg'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedIn;
