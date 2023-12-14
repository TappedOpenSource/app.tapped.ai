import Head from 'next/head';
import Link from 'next/link';

const thingsWeNeed = [
  'name',
  'email',
  'phone number',
  'social media link',
  'music link',
  'previous bookings',
];

export default function Apply() {
  return (
    <div>
      <Head>
        <title>Apply for a venue</title>
      </Head>

      <main>
        <div className='min-h-screen flex flex-col justify-center items-center'>
          <h1 className="text-4xl font-extrabold">Apply for a venue</h1>
          <div>
            <form className='flex flex-col'>
              <input type="text" placeholder="name" />
              <input type="email" placeholder="email" />
              <input type="text" placeholder="phone number" />
              <input type="text" placeholder="instagram" />
              <input type="text" placeholder="spotify" />
              <input type="text" placeholder="spotify" />
              <input type="textarea" placeholder="previous bookings" />
              <ul>
                {thingsWeNeed.map((thing) => (
                  <li key={thing}>{thing}</li>
                ))}
              </ul>
            </form>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700"
          >
            easy apply with tapped
          </Link>
        </div>
      </main>
    </div>
  );
}
