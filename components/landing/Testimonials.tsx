
import Image from 'next/image';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Andrew Rohlk',
    text: 'I love Tapped! Great team and great product. I\'ve gotten so many more bookings since I started using it.',
    photo: '/images/512x512/andrew.512x512.png',
    url: 'https://music.apple.com/us/artist/andrew-rohlk/592655140',
  },
  {
    name: 'Niral',
    text: 'I started my music career about 8 months ago and I\'ve been using Tapped since day 1. They played a crucial role to my success and ulitmately to getting signed to a label.',
    photo: '/images/512x512/niral.512x512.png',
    url: 'https://music.apple.com/us/artist/niral-desai/1682714169',
    signed: true,
  },
  {
    name: 'Jayduhhhh',
    text: 'Tapped Ai played a huge role in getting me my highest paying booking to date. I\'m so grateful for the team and the product.',
    photo: '/images/512x512/jayduhhh.512x512.png',
    url: 'https://music.apple.com/us/artist/jay-duhhh/1573379288',
    signed: true,
  },
  {
    name: 'Seelife',
    text: 'I f*** with Tapped heavy. They\'ve helped me get my music out there and I\'ve gotten a lot of new fans from it. I\'m excited to see what they do next.',
    photo: '/images/512x512/seelife.512x512.png',
    url: 'https://music.apple.com/us/artist/seelife/1493214282',
  },
];

function Testimonial({ name, text, photo, url, signed = false }) {
  return (
    <Link
      href={url}
      className="flex flex-col bg-gray-700 rounded-xl h-full"
    >
      <div className='flex flex-row items-center justify-start gap-2'>
        <div
          className="w-16 h-16 relative flex-shrink-0 m-2 hover:scale-105 transform transition-all duration-200 ease-in-out">
          <Image
            fill
            priority
            className='rounded-full'
            src={photo}
            alt={name}
            style={{ objectFit: 'cover' }} />
        </div>
        <h3 className="text-2xl font-extrabold">{name}</h3>
      </div>
      <p className='p-3'>{text}</p>
    </Link>
  );
}

export default function Testimonials() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center px-12">
        {testimonials.map((testimonial, index) => (
          <div key={index} className='h-full'>
            <Testimonial {...testimonial} />
          </div>
        ))}
      </div>
    </>
  );
}
