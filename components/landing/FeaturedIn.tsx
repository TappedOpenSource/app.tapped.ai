
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

const FeaturedIn = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:gap-12 items-center justify-center py-12">
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
            />
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
            />
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
            />
          </Link>
        </div>
      </div>
      <div className='flex flex-row justify-center'>
        <blockquote className="twitter-tweet" data-conversation="none" data-theme="dark">
          <p lang="en" dir="ltr">y&#39;all tapped in fr fr 🔥</p>&mdash; buildspace (@_buildspace) <a href="https://twitter.com/_buildspace/status/1700985304797372648?ref_src=twsrc%5Etfw">September 10, 2023</a>
        </blockquote>


        <Script async src="https://platform.twitter.com/widgets.js"></Script>
      </div>
    </div>
  );
};

export default FeaturedIn;
