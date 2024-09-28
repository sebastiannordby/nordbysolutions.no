import React, { useState } from "react";
import MinimalistLayout from '../../components/minimalist-layout';
import './utleiestyring.css';

const features = [
    {
        icon: "build",
        title: "Hvorfor bruke oss?",
        description: "Effektiv oversikt over verktøy og utlån."
    },
    {
        icon: "attach_money",
        title: "Årlig kostnad",
        description: "Kun 2,500,- eks mva. Reduserer kostnader og øker effektiviteten for din bedrift."
    },
    {
        icon: "help_outline",
        title: "Hva tilbyr vi?",
        description: "Full oversikt over utlån, vedlikehold og mye mer."
    },
    {
        icon: "security",
        title: "Tilgangsstyring",
        description: "Kontroller hvem som har tilgang til verktøyene dine."
    }
];

const detailedFeatures = [
    "Med Utleiestyring får du full kontroll over dine verktøy og eiendeler. Hold styr på hvem som har lånt hva, og når det skal tilbakeleveres – alt i sanntid.",
    "Systemet er ikke bare laget for enkelhet, men også for å passe perfekt til din arbeidshverdag. Med et brukervennlig grensesnitt designet for både PC og berøringsskjerm, kan du enkelt administrere utleie og vedlikehold uansett hvor du er.",
    "Få detaljert innsikt i hvordan eiendelene dine brukes, og ta smartere beslutninger om vedlikehold, innkjøp og ressursfordeling.",
    "Alt fra administrasjon til reparasjonshistorikk er tilgjengelig med noen få klikk, så du sparer tid og kan fokusere på det som virkelig betyr noe."
];

const customerFeedback = [
    {
        name: "Anders L.",
        feedback: "Utleiestyring har revolusjonert måten vi håndterer verktøyutleie på. Systemet er enkelt å bruke og har hjulpet oss å spare både tid og penger.",
    },
    {
        name: "Kari M.",
        feedback: "Enkel å sette opp og utrolig brukervennlig! Nå har vi full oversikt over alle våre eiendeler og slipper dobbeltarbeid. Anbefales!",
    },
    {
        name: "Jonas P.",
        feedback: "Et virkelig innovativt system som gjør hverdagen vår mye mer effektiv. Vi har bedre kontroll på verktøyene våre enn noensinne før.",
    }
];

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carousel-container bg-white rounded-lg p-8 shadow-lg mb-12">
            <h3 className="text-xl font-bold mb-6 text-center">Utforsk Systemet</h3>
            <div className="relative">
                <img
                    src={images[currentIndex].uri}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-auto rounded-lg mb-4"
                />
                <p className="text-center text-sm mb-4">{images[currentIndex].description}</p>
                <button
                    className="absolute left-0 top-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                    onClick={prevSlide}
                >
                    &lt;
                </button>
                <button
                    className="absolute right-0 top-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                    onClick={nextSlide}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

const images = [
    {
        uri: "https://utleiestyring.no/Systembilder/Hovedsiden_desktop.png",
        description: "Oversikt over verktøy og utleie",
    },
    {
        uri: "https://utleiestyring.no/Systembilder/Hovedsiden_touchscreen.png",
        description: "Effektiv administrasjon",
    },
    {
        uri: "https://utleiestyring.no/Systembilder/tool_visning.png",
        description: "Enkel vedlikeholdsoversikt",
    },
    {
        uri: "https://utleiestyring.no/Systembilder/admin.png",
        description: "Overikt for administratorer",
    },
    {
        uri: 'https://utleiestyring.no/Systembilder/lending.png',
        description: "Oversikt over utlån"
    }
];

export default function UtleiestyringPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <MinimalistLayout className="utleiestyring-root overflow-y-auto">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900&display=swap');
                `}
            </style>

            {/* Header */}
            <header className="bg-white dark:bg-gray-900 shadow-md">
                <nav className="p-4 flex flex-wrap justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <h1 className="font-bold text-xl">Utleiestyring</h1>
                        <button onClick={toggleMenu} className="md:hidden">
                            <span className="material-icons text-[29px]" >
                                {menuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>

                    <div className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
                        <div className="flex flex-col md:flex-row gap-4 items-center mt-4 md:mt-0">
                            <a href="/" className="py-2">Hjem</a>
                            <a href="#discover" className="py-2">Oppdag</a>
                            <a href="#contact" className="py-2">Kontakt oss</a>
                            <a href="#login" className="bg-utleiestyring_primary text-white rounded-md cursor-pointer px-2 py-1 hover:bg-utleiestyring_accent hover:text-white hover:underline ml-1">
                                Logg inn
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="p-4">
                <section className="bg-utleiestyring_light py-12 text-center mb-12 rounded-lg shadow-lg p-2">
                    <h2 className="text-3xl font-bold mb-4">Velkommen til Fremtiden av Verktøyutleie</h2>
                    <p className="text-base mb-6">
                        <span className="font-semibold">Spar tid. Spar penger.</span> Effektiv verktøyutleie, skreddersydd for din bedrift.
                    </p>
                    <a 
                        href="#demo" 
                        className="bg-utleiestyring_primary whitespace-pre text-white rounded-full px-6 py-3 text-base font-semibold hover:bg-utleiestyring_accent transition duration-300">
                        Start Gratis Prøveperiode
                    </a>
                </section>

                {/* Icon Feature Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                            <div className="flex items-center mb-2">
                                <span className="material-icons text-utleiestyring_primary">{feature.icon}</span>
                                <h3 className="font-semibold text-lg ml-2">{feature.title}</h3>
                            </div>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </section>

                {/* Customer Feedback Section */}
                <section className="bg-white mb-12 rounded-lg p-8 shadow-lg">
                    <h3 className="text-xl font-bold mb-6 text-center">Hva Våre Kunder Sier</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {customerFeedback.map((feedback, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
                                <p className="italic mb-4">"{feedback.feedback}"</p>
                                <p className="font-semibold text-right">- {feedback.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Detailed Features Section */}
                <section id="discover" className="mb-12 bg-white rounded-lg p-8 shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Oppdag hva Utleiestyring kan gjøre for deg</h3>
                    {detailedFeatures.map((text, index) => (
                        <p key={index} className="text-sm mb-4">{text}</p>
                    ))}
                    <a 
                        className="inline-block cursor-pointer bg-utleiestyring_primary text-white rounded-full px-8 py-3 text-base font-semibold hover:bg-utleiestyring_accent transition duration-300">
                        Les mer<span className="hidden md:inline">{' om funksjonene'}</span>
                    </a>
                </section>

                <ImageCarousel images={images} />

                {/* Final CTA Section */}
                <section id="contact" className="mb-12 bg-white rounded-lg p-8 shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Ta Kontakt med Oss</h3>
                    <p className="text-base mb-4">
                        Har du spørsmål eller trenger mer informasjon? Fyll ut skjemaet nedenfor, så kommer vi tilbake til deg så snart som mulig.
                    </p>
                    <form className="flex flex-col gap-4">
                        <input 
                            type="text" 
                            placeholder="Navn" 
                            className="border rounded-md p-2"
                            required 
                        />
                        <input 
                            type="email" 
                            placeholder="E-post" 
                            className="border rounded-md p-2"
                            required 
                        />
                        <textarea 
                            placeholder="Melding" 
                            className="border rounded-md p-2 h-24"
                            required 
                        />
                        <button 
                            type="submit" 
                            className="bg-utleiestyring_primary text-white rounded-full px-8 py-3 text-base font-semibold hover:bg-utleiestyring_accent transition duration-300"
                        >
                            Send Melding
                        </button>
                    </form>
                </section>
            </main>
        </MinimalistLayout>
    );
}


