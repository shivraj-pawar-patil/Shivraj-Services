'use client';

import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

export default function UserQRCodePage() {
  const params = useParams();
  const userId = params.userId as string;

  const url = `https://shivraj-services.vercel.app/users/${userId}/info`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors print:bg-white print:text-black print:mt-0 print:min-h-0">
      {/* This button is only visible on screen, not in print */}
      {/* This is the only part we want to print */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center print:bg-white print:dark:bg-white print:shadow-none">
        <QRCodeSVG value={url} size={200} bgColor="#ffffff" includeMargin />
        <p className="mt-4 text-center text-lg font-medium print:text-black">
          Scan to fetch user data
        </p>
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
      >
        Print QR Code
      </button>

      {/* Remove global visibility-hiding, just use print:hidden */}
    </div>
  );
}
