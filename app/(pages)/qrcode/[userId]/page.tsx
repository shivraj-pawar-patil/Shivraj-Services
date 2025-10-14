// app/users/[userId]/info/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

export default function UserQRCodePage() {
  const params = useParams();
  const userId = params.userId as string;

  const url = `https://shivraj-services.vercel.app/users/${userId}/info`;

  return (
    <div className="mt-24 flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <QRCodeSVG value={url} size={200} bgColor="transparent" />
        <p className="mt-4 text-center text-lg font-medium">
          Scan to fetch user data
        </p>
      </div>
    </div>
  );
}
