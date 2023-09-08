
const JourneyTile = ({ number, title, description }: {
    number: string;
    title: string;
    description: string;
}) => {
  return (
    <div className="rounded-xl border-2 border-white p-8 mx-4 md:mx-0">
      <h1 className="text-6xl font-bold">{number}</h1>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="text-lg">{description}</p>
    </div>
  );
};

const YourJourney = () => {
  return (
    <section>
      <div className="flex flex-col justify-center">
        <h2 className="text-center text-4xl">your journey with tapped</h2>
        <div className="h-6"></div>
        <div className="flex justify-center">
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
              <JourneyTile
                number="1"
                title="Choose Your Plan"
                description="Select the subscription plan that suits your needs, whether you're just starting out or ready to take your career to the next level."
              />
              <JourneyTile
                number="2"
                title="Access Your Services"
                description="Dive into our app and access a range of services tailored to your requirements. Get help with marketing strategies, brand development, styling, and more."
              />
              <JourneyTile
                number="3"
                title="Empower Your Brand"
                description="Collaborate with your virtual team members to enhance your branding, create captivating cover art, and present a professional image to the world."
              />
              <JourneyTile
                number="4"
                title="Pay As You Go"
                description="Only pay for the services you use, ensuring you have complete control over your budget."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourJourney;
