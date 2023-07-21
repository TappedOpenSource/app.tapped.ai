import { NextPage } from "next";
import Head from "next/head";

const Dashboard: NextPage = () => {
    return (
        <>
            <Head>
                <title>Bob from Tapped | Dashboard</title>
            </Head>
            {/* <button
                className=""
            >
                Connect Spotify
            </button> */}
            <div
                className="flex flex-col justify-center items-center h-screen w-screen bg-black"
            >
                <input
                    className=""
                    type="text"
                    placeholder="describe your music in 5 words or less"
                />
                <input
                    className=""
                    type="text"
                    placeholder="What's the vibe you're looking for?"
                />
                <p
                    className="text-white">
                    Upload a few photos of yourself
                </p>
            </div>
        </>
    );
};

export default Dashboard;