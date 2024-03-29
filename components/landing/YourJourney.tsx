
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
        <h2 className="text-center text-4xl">your journey with tapped ai</h2>
        <div className="h-6"></div>
        <div className="flex justify-center">
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 justify-center lowercase">
              <JourneyTile
                number="1"
                title="get started for free"
                description="Sign up for free and get access to information on thousands of venues and events. discover the perfect location for your next gig or event."
              />
              <JourneyTile
                number="2"
                title="upgrade your experience"
                description="effortlessly conduct mass outreach and pinpoint the ideal venues for your genre and capacity requirements. simplify your booking process and focus on what you do best – creating and performing."
              />
              <JourneyTile
                number="3"
                title="get booked"
                description="our platform simplifies the process of maintaining communication with venues, enhancing your chances of getting booked and showcasing your talent to audiences far and wide."
              />
              {/* <JourneyTile
                number="4"
                title="pay as you go"
                description="Only pay for the services you use, ensuring you have complete control over your budget."
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourJourney;
