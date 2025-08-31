import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 px-4 py-24 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Unlock the{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">secret</span>{" "}
              to
            </h1>
            <div className="space-y-2 text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl">
              <p>
                -build your <span className="italic text-purple-400">community</span>.
              </p>
              <p>
                -connect with <span className="font-bold text-blue-400">superfans</span>.
              </p>
              <p>
                -sell out <span className="italic text-purple-400">your events</span>.
              </p>
            </div>

            <Link href="/map">
              <Button className="mt-10 px-8 py-6 text-lg" size="lg">
                Get Booked
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mission Statement */}
      <section className="px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xl font-medium italic leading-relaxed text-slate-700 md:text-2xl dark:text-slate-300">
            &quot;Tapped Ai connects performers with the right venues, superfans, and opportunities to grow their
            careers. Whether you&apos;re an artist, organizer, or fan, we make live music smarter, easier, and more
            impactful.&quot;
          </p>
        </div>
      </section>

      {/* Premium Teaser */}
      <section className="bg-white px-4 py-20 md:px-6 lg:px-8 dark:bg-slate-800">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
              unlock <span className="italic">this </span>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">DATA</span>
              <span className="italic"> with </span>
              <span className="text-purple-600 dark:text-purple-400">tapped premium</span>
              <span className="italic"></span>
            </h2>
            <p className="mb-6 text-lg text-slate-700 dark:text-slate-300">this isn&apos;t for everyone.</p>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              tapped premium gives you insider access to the tools, data, and opportunities reserved for the top 1% of
              artists ready to take over the live events world.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 px-4 py-16 text-white md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl">100k+</h3>
              <p className="text-xl font-semibold italic">performers</p>
            </div>
            <div className="text-center">
              <h3 className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl">35k+</h3>
              <p className="text-xl font-semibold italic">venues</p>
            </div>
            <div className="text-center">
              <h3 className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl">160k+</h3>
              <p className="text-xl font-semibold italic">bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight md:text-5xl">
            get to know &quot;
            <span className="text-purple-600 dark:text-purple-400">tapped premium</span>
            &quot;.
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Unlock Secret Venues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="italic text-slate-600 dark:text-slate-400">
                  Access 50,000+ hidden gems tailored to your sound.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Elite Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="italic text-slate-600 dark:text-slate-400">
                  Find out where superfans live, their favorite venues, and how to sell out every show.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Gigs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="italic text-slate-600 dark:text-slate-400">
                  Be the first to hear about high-profile performances and festivals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exclusive Collaborations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="italic text-slate-600 dark:text-slate-400">
                  Connect with other top-tier artists to create unforgettable experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insider Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="italic text-slate-600 dark:text-slate-400">
                  Access to major labels touring data by some of the top celebrities in the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-center overflow-hidden pt-10">
          <div className="aspect-video w-full max-w-[752px]">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/DPiogp-D4ig"
              title="how to use tapped ai premium"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto mb-12 max-w-5xl">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight md:text-5xl">founders</h2>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <Link href="https://linkedin.com/in/john-naylor">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-96 w-72  rounded-t-md">
                    <Image
                      src="/images/landing/johannes.jpeg"
                      alt="Johannes Naylor"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">johannes naylor</h3>
                    <p>co founder</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://linkedin.com/in/iliasanwar">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-96 w-72 rounded-t-md">
                    <Image
                      src="/images/landing/ilias.jpg"
                      alt="Ilias Anwar"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">ilias anwar</h3>
                    <p>co founder</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Advisors Section */}
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-4xl font-bold tracking-tight md:text-5xl">advisors</h2>

          <div className="mb-12 text-center">
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
              our advisor network has been carefully crafted to be one degree away from everyone in the live events,
              music and tech industry.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 py-2 md:flex-row">
            <Link href="https://www.linkedin.com/in/anujgupta15/">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-72 w-60 rounded-t-md">
                    <Image
                      src="/images/landing/anuj.png"
                      alt="Anuj Gupta"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">anuj gupta</h3>
                    <p>former lawyer for facebook</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://www.linkedin.com/in/celestine-amajoyi-34b87533">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-72 w-60 rounded-t-md">
                    <Image
                      src="/images/landing/chibu.jpg"
                      alt="Celestine Amajoyi"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">celestine amajoyi</h3>
                    <p>30x platinum selling executive</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://www.linkedin.com/in/quinelleholder">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-72 w-60 rounded-t-md">
                    <Image
                      src="/images/landing/quinelle.jpg"
                      alt="Quinelle Holder"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">quinelle holder</h3>
                    <p>grammy&apos;s executive</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 py-2 md:flex-row">
            <Link href="https://www.linkedin.com/in/dheeraj-manjunath">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-72 w-60 rounded-t-md">
                    <Image
                      src="/images/landing/draj.jpeg"
                      alt="Dheeraj Manjunath"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">dheeraj manjunath</h3>
                    <p>3x exited founder</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://www.linkedin.com/in/navarrog">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-72 w-60 rounded-t-md">
                    <Image
                      src="/images/landing/dave.jpg"
                      alt="Dave Harris Jr."
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">dave harris jr.</h3>
                    <p>death row records executive</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://www.linkedin.com/in/alishaoutridge/">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-72 w-60 rounded-t-md">
                    <Image
                      src="/images/landing/alisha.jpg"
                      alt="Alisha Outridge"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">alisha outridge</h3>
                    <p>former cto of tunecore</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Tapped Mixer */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 px-4 py-20 text-white md:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            &quot;<span className="text-purple-400">tapped mixer</span>&quot;
          </h2>
          <p className="mb-10 text-lg">
            a networking event to bring together a room of music, tech, and investors to connect and elevate their
            careers.
          </p>
        </div>

        <div className="container mx-auto max-w-5xl overflow-hidden">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/iWDIax023zQ"
                title='future of Ai, exploiting artists, and getting M&#39;s from investors - "tapped mixer" ep. 01'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/_-1DJouW9Bs"
                title='Ai taking jobs, music tech, and botting streams - "tapped mixer" ep. 02'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/LWieY6ON4kA"
                title='how to get rich as a musician, going viral on tiktok, artist royalties - "tapped mixer" 03'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-4xl font-bold tracking-tight md:text-5xl">recent press:</h2>
          <p className="text-center text-lg italic text-slate-700 dark:text-slate-300">
            find out how ilias and johannes tricked the music industry with an april fools prank to end up meeting the
            three biggest multi billion dollar corporations in the space.
          </p>
        </div>

        <div className="container mx-auto max-w-5xl overflow-hidden">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/ZMvSbU8rTOM"
                title="johannes naylor presents Tapped at tech comedy roast!"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/4WlKirPSuGc"
                title="ilias anwar interview on $0 marketing, Ai, and social media hacks w/ alisha outridge!"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex aspect-video w-full items-center justify-center">
              <Link href="https://www.onthesceneny.com/uncategorized/april-fools-prank-turns-into-genius-marketing-by-these-two-entrepreneurs/">
                <Image
                  src="/images/landing/april-fools.png"
                  alt="April Fools Article Cover"
                  width={400}
                  height={225}
                  className="h-auto w-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight md:text-5xl">FAQ&apos;s</h2>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>why go premium?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300">
                  Upgrading to Tapped AI Premium unlocks a suite of advanced features designed to significantly enhance
                  your booking and touring capabilities. With Premium, you gain unlimited access to in-depth analytics,
                  comprehensive data sets, and sophisticated booking tools that streamline the planning process. This
                  subscription also provides exclusive insights into venue performance and audience preferences,
                  allowing for more informed decision-making. Additionally, Premium users benefit from priority customer
                  support and regular updates that include the latest industry trends and data enhancements, ensuring
                  you have a competitive edge in the music industry.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>how much does monthly subscription cost?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300">
                  The monthly subscription for performers cost $10 on desktop and $12.99 on app store.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>can i cancel my subscription at any time?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300">
                  Yes, you can cancel your subscription at any time. Upon cancellation, your subscription will remain
                  active until the end of the current billing period. This means you&apos;ll still have access to the
                  subscribed features until the end of your billing cycle, after which the subscription will terminate
                  automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>is there a tutorial on how to use tapped ai?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300">
                  Yes! We have a video from our founder Johannes Naylor that you can check if you scroll up or go to our
                  youtube page here.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
