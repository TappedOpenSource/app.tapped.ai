import Link from "next/link";

const EmpowermentHub = () => {
  return (
    <section id="empowerment-hub">
      <div className="flex flex-col md:flex-row justify-center">
        <h2 className="text-center md:text-left mx-4 md:mx-0 md:w-1/4 text-4xl">welcome to tappedAi: your artist empowerment hub</h2>
        <div className="w-8"></div>
        <div className=" mx-4 md:mx-0 md:w-1/3">
          <p className="text-center md:text-left text-lg">TappedAi is here to redefine what it means to be an artist in the digital age. Our cutting-edge approach puts the power back in your hands, allowing you to focus on your creativity while we handle the rest.</p>
          <div className='h-8'></div>
          <div className='flex justify-center md:justify-start'>
            <Link
              href="/application_form"
              className="text-lg bg-white text-black font-extrabold rounded-full px-6 py-4 hover:scale-105 transform transition-all duration-200 ease-in-out"
            >get started</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpowermentHub;
