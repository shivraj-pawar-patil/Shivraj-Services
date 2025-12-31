import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <div className="flex flex-col items-center gap-1">
        <h3 className="font-bold text-lg text-foreground">ShivRaj Services</h3>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
