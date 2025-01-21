import React from "react";
import { Film, Clapperboard, Rewind } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Clapperboard className="h-32 w-32 text-white animate-pulse" />
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">
          4
          <Film className="inline h-16 w-16 mx-2 text-white" />4
        </h1>

        <h2 className="text-3xl font-semibold text-white mb-6">
          Plot Twist: Page Not Found!
        </h2>
      </div>
    </div>
  );
};

export default ErrorPage;
