import React from "react";
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

export default function UtleiestyringPage() {
    return (
        <MinimalistLayout className="utleiestyring-root overflow-y-auto">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900&display=swap');
                `}
            </style>

            {/* Header */}
            <header className="bg-white px-4 py-3 flex items-center">
                <h1 className="font-bold text-xl">Utleiestyring</h1>
                <nav className="ml-auto flex gap-2 items-center">
                    <a href="/">Hjem</a>
                    <a href="#discover">Oppdag</a>
                    <a href="#contact">Kontakt oss</a>
                    <a href="#login" className="bg-utleiestyring_primary text-white rounded-md cursor-pointer px-2 py-1 hover:bg-utleiestyring_accent hover:text-white hover:underline ml-1">
                        Logg inn
                    </a>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="p-4">
                <section className="bg-utleiestyring_light py-12 text-center mb-12 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">Velkommen til Fremtiden av Verktøyutleie</h2>
                    <p className="text-base mb-6">
                        <span className="font-semibold">Spar tid. Spar penger.</span> Effektiv verktøyutleie, skreddersydd for din bedrift.
                    </p>
                    <a 
                        href="#demo" 
                        className="bg-utleiestyring_primary text-white rounded-full px-6 py-3 text-base font-semibold hover:bg-utleiestyring_accent transition duration-300"
                    >
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

                {/* Detailed Features Section */}
                <section id="discover" className="mb-12 bg-white rounded-lg p-8 shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Oppdag hva Utleiestyring kan gjøre for deg</h3>
                    {detailedFeatures.map((text, index) => (
                        <p key={index} className="text-sm mb-4">{text}</p>
                    ))}
                    <a 
                        href="#more-details" 
                        className="inline-block bg-utleiestyring_primary text-white rounded-full px-8 py-3 text-base font-semibold hover:bg-utleiestyring_accent transition duration-300"
                    >
                        Les mer om funksjonene
                    </a>
                </section>

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
