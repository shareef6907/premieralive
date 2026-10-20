"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service if configured
    console.error("[proposals error boundary]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center p-8">
      <AlertTriangle className="w-12 h-12 text-red-400" />
      <h2 className="text-xl font-bold text-white">Something went wrong</h2>
      <p className="text-muted text-sm max-w-md">
        {error.message || "An unexpected error occurred in the proposals section."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="btn btn-gold btn-sm flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
        <Link href="/agency/proposals" className="btn btn-ghost btn-sm">
          Back to proposals
        </Link>
      </div>
    </div>
  );
}
