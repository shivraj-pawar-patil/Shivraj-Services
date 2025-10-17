'use client';

// Removed: import { useParams } from 'next/navigation'; - Not needed anymore
import { QRCodeSVG } from 'qrcode.react';

import React from 'react';
import { Printer, User, Mail, Smartphone } from 'lucide-react';


interface UserQRCodeClientProps {
    userId: number;
    userData: any;
    baseUrl: string;
}

const UserQRCodeClient = ({ userId, userData, baseUrl }: UserQRCodeClientProps) => {
    // Removed: const params = useParams();
    // Removed: const userId = params.userId as string;
    // Removed: const userData = MOCK_USER_DATA;

    console.log('User Data in Client Component:', userData);

    // The URL encoded in the QR code
    const url = `${baseUrl}/users/${userId}/info`;

    const handlePrint = () => {
        // This triggers the browser's native print dialogue
        window.print();
    };

    // Helper component for details
    // It's good practice to keep helper components outside the main render function
    // or memoize them, but for brevity, we'll keep it simple for now.
    const UserDetail = ({ Icon, label, value }: { Icon: React.ElementType, label: string, value: string }) => (
        <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <div className="flex flex-col">
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-base break-words">{value}</span>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-start py-10 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors print:bg-white print:text-black print:min-h-0">

            <h1 className="text-3xl font-extrabold mb-8 text-indigo-600 dark:text-indigo-400 print:hidden">
                User Profile & QR Code
            </h1>

            {/* Printable Area Container */}
            <div
                id="printable-area"
                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-10 print:shadow-none print:p-0 print:border-none print:block print:w-auto"
            >

                {/* User Info (Left/Top) */}
                <div className="flex-1 space-y-5 border-b pb-8 md:border-b-0 md:border-r md:pr-10 print:border-r-0 print:pb-0 print:pr-0 print:pt-4">
                    <div className="flex items-center space-x-4">
                        <User className="w-8 h-8 text-indigo-500" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 print:text-black">
                            {userData.name}
                        </h2>
                    </div>

                    <UserDetail
                        Icon={Mail}
                        label="city"
                        value={userData.city}
                    />
                    <UserDetail
                        Icon={Smartphone}
                        label="Phone"
                        value={userData.phoneNumber}
                    />
                    <UserDetail
                        Icon={User}
                        label="User ID"
                        value={userData.intId.toString()}
                    />
                     <UserDetail
                        Icon={User}
                        label="Type"
                        value={userData.type}
                    />
                </div>

                {/* QR Code (Right/Bottom) - This part contains the QR and scan instruction */}
                <div className="flex flex-col items-center justify-center flex-shrink-0 pt-8 md:pt-0">
                    <div className="p-2 border-4 border-gray-200 rounded-lg bg-white shadow-xl print:shadow-none print:border-gray-400">
                        <QRCodeSVG value={url} size={200} bgColor="#ffffff" includeMargin />
                    </div>
                    <p className="mt-4 text-center text-lg font-medium text-gray-600 dark:text-gray-300 print:text-black">
                        Scan to fetch user data
                    </p>
                    <p className="mt-2 text-center text-xs text-indigo-500 dark:text-indigo-400 print:text-gray-600">
                        {url}
                    </p>
                </div>
            </div>

            {/* Print Button (Hidden in Print View) */}
            <button
                onClick={handlePrint}
                className="mt-12 flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 print:hidden"
            >
                <Printer className="w-5 h-5 mr-2" />
                Print QR Code & Info
            </button>

            {/* Responsive adjustments for mobile */}
            <style jsx global>{`
                /* Tailwind is assumed to be present. This is for print media query */
                @media print {
                    body {
                        /* Remove margins from the body for a full-page print */
                        margin: 0;
                        padding: 0;
                    }
                    /* Hide everything not in the printable area */
                    body > :not(#printable-area) {
                        display: none !important;
                    }
                    /* Make the printable area visible */
                    #printable-area {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: auto;
                        display: flex; /* Ensure it stays flex layout for printing */
                        flex-direction: row; /* Default desktop layout for print */
                        padding: 20px;
                        box-sizing: border-box;
                    }
                }
            `}</style>
        </div>
    );
}

export default UserQRCodeClient;