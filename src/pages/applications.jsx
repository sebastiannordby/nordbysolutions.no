import React from 'react';

// Import your app images
import STINISSE_IMAGE from '/src/images/stinisse.jpg';

// Data for your apps
const apps = [
    {
        id: 1,
        name: 'Stinisse',
        description: "Stinisse is your ultimate companion for exploring the great outdoors. Whether you're mountain biking, hiking, or running, Stinisse uses data from Strava to provide detailed trail maps and guided routes through scenic woodland trails. Discover new paths, track your progress, and enhance your outdoor adventures with real-time guidance and personalized trail suggestions. Perfect for outdoor enthusiasts looking to elevate their experience in nature.",
        image: STINISSE_IMAGE,
        link: 'https://stinisse.no'
    }
];

export function AppPortfolioPage() {
    return (
        <div className="flex flex-col w-full h-auto p-4 gap-4">
            <h1 className="dark:text-white text-3xl font-bold text-center mb-6 whitespace-pre-wrap break-words">Applications developed by Nordby Solutions</h1>
            <div className="flex flex-col gap-6 items-center mx-auto max-w-3xl">
                {apps.map(app => (
                    <div
                        key={app.id}
                        className="p-6 flex flex-col md:flex-row gap-6 items-center bg-white rounded-lg shadow-md w-full"
                    >
                        <img
                            src={app.image}
                            alt={`${app.name} image`}
                            className="w-full md:w-48 h-auto rounded-md shadow-md"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-2">{app.name}</h2>
                            <p className="text-gray-700 mb-4">{app.description}</p>
                            <a
                                href={app.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
                                Explore
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

