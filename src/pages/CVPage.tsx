import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CV } from '../components/CV';

export default function CVPage() {
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    // If you're on react-to-print v2+, contentRef works.
    // Otherwise, use: content: () => cvRef.current
    contentRef: cvRef,
    documentTitle: 'Sebastian_Nordby_CV',
    pageStyle: `
      @page { size: A4; margin: 16mm; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `,
  });

  return (
    <div className="min-h-screen sm:p-6">
      <div
        ref={cvRef}
        className="mx-auto max-w-3xl shadow-sm print:shadow-none p-8 bg-white"
      >
        <CV />
      </div>

      {/* FAB: fixed bottom-right, hidden in print */}
      <button
        onClick={handlePrint}
        aria-label="Eksporter CV som PDF"
        title="Eksporter som PDF"
        className="
          print:hidden fixed bottom-14 right-6 z-22
          h-14 w-14 rounded-full
          text-white shadow-lg
          bg-c_lime
          hover:bg-c_purple hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          flex items-center justify-center
        "
      >
        <img className="max-w-[34px]" src="/images/pdf_icon.png"></img>
      </button>
    </div>
  );
}
