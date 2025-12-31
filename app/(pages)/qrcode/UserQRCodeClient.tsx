'use client';

import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { Printer, MapPin, ArrowLeft, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UserQRCodeClientProps {
    userId: number;
    userData: any;
    baseUrl: string;
}

const UserQRCodeClient = ({ userId, userData, baseUrl }: UserQRCodeClientProps) => {
    const [origin, setOrigin] = React.useState(baseUrl);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    // Ensure we point to the patient info page
    const url = `${origin}/users/${userId}/info`;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col items-center py-10 px-4 transition-colors print:p-0 print:bg-white print:min-h-0 print:justify-center">

            {/* Navigation & Actions - Hidden in Print */}
            <div className="w-full max-w-md flex justify-between items-center mb-8 print:hidden">
                <Link href="/users">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Users
                    </Button>
                </Link>
                <Button onClick={handlePrint} className="gap-2">
                    <Printer className="h-4 w-4" /> Print Card
                </Button>
            </div>

            {/* ID Card Wrapper */}
            <div id="printable-area" className="w-full max-w-md print:w-[85.6mm] print:h-[54mm] print:max-w-none print:m-0 print:absolute print:top-1/2 print:left-1/2 print:transform print:-translate-x-1/2 print:-translate-y-1/2">
                <Card className="relative overflow-hidden border-2 border-primary/20 shadow-xl bg-white print:border-none print:shadow-none print:w-full print:h-full flex flex-col h-[280px] print:h-full">
                    {/* Header */}
                    <div className="bg-primary px-6 py-4 print:py-2 print:px-4 text-primary-foreground flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold leading-none print:text-sm">Patient Identity Card</h2>
                            <p className="text-xs opacity-90 mt-1 print:text-[8px]">Shivraj Services</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase font-mono opacity-80 print:text-[6px]">ID Number</p>
                            <p className="font-mono font-bold text-xl leading-none print:text-sm">#{userData.intId}</p>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 print:p-3 flex gap-4 print:gap-2 flex-1 items-center">
                        {/* Details */}
                        <div className="flex-1 space-y-3 print:space-y-1">
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider print:text-[6px]">Patient Name</p>
                                <h3 className="font-bold text-xl text-foreground print:text-lg leading-tight truncate">{userData.name}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider print:text-[6px]">Type</p>
                                    <p className="font-medium text-sm print:text-[10px] truncate">{userData.type || 'General'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider print:text-[6px]">Mobile</p>
                                    <p className="font-medium text-sm print:text-[10px] truncate">{userData.phoneNumber}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-1.5 pt-2 print:pt-1">
                                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 print:w-3 print:h-3" />
                                <p className="text-sm text-muted-foreground leading-snug print:text-[9px] line-clamp-2">{userData.city}</p>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex flex-col items-center justify-center bg-white flex-shrink-0">
                            <div className="border border-muted p-1 rounded bg-white">
                                <QRCodeSVG value={url} size={100} className="w-24 h-24 print:w-[22mm] print:h-[22mm]" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        size: auto;
                        margin: 0;
                    }
                    body {
                        background-color: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    /* Hide everything that is NOT the printable area or its parents */
                     body > * {
                        display: none;
                    }
                    /* But we can't easily select "parents of #printable-area", so we rely on the component structure */
                    /* Next.js puts app in a root div usually. We just hide all children of our component wrapper except #printable-area */
                    
                    /* The component wrapper will be the only thing visible if we do this workaround: */
                }
                
                /* Since styles are scoped or global, simpler specific print rule: */
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-area, #printable-area * {
                        visibility: visible;
                    }
                    #printable-area {
                        position: fixed; /* Fixed to center on page */
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 85.6mm;
                        height: 54mm;
                        margin: 0;
                        padding: 0;
                        border: 1px dotted #ccc; /* Helper guide for cutting */
                    }
                }
            `}</style>
        </div>
    );
}

export default UserQRCodeClient;