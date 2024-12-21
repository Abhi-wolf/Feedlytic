import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="space-y-6 text-center">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-black rounded-full animate-[fadeInOut_1.5s_ease-in-out_infinite]"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <p className="text-sm font-light tracking-wider text-gray-500 uppercase">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loading;

const fadeInOut = {
  "0%, 100%": { opacity: 0.2 },
  "50%": { opacity: 1 },
};
