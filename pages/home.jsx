import DALL_E_2_HACKER_IMG from '../images/painting_hacker_dall_e_2.png';

export function HomePage() {
    return (
        <div className={"front-page h-full w-full h-auto p-4 home"}>

            <div className="p-4 flex gap-4 items-center bg-dall-e flex-wrap mx-auto"
                style={{
                    maxWidth: '800px'
                }}>
                <div className="mx-auto" style={{
                    maxWidth: '350px'
                }}>
                    <h2 
                        style={{
                            color: "var(--light-white)"
                        }}
                        className={"text-2xl border-b border-slate-200 pb-2border-b border-slate-200 mb-2 pb-2"}>Hei! Mitt navn er <strong>Sebastian Nordby</strong>.</h2>
                    <p>
                        Jeg er en <strong>fullstack utvikler</strong> med 5+ års erfaring. Programmering er min lidenskap og jeg begynte allerede med dette 
                        da jeg fortsatt tok grunnskole. Videre har jeg fortsatt med lidenskapen og jobber i dag fulltid med programmering.
                    </p>
                </div>
                <img src={DALL_E_2_HACKER_IMG} className="mx-auto w-96 ml-auto" style={{ maxWidth: '300px'}} />
            </div>

            <div className="p-2">
                <p></p>
            </div>
        </div>
    );
}