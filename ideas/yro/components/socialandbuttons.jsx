import React from "react";
import { appleIcon, facebookIcon, googleIcon } from "../assets/images";

const providers = [
  { icon: googleIcon, label: "Google" },
  { icon: appleIcon, label: "Apple" },
  { icon: facebookIcon, label: "Facebook" },
];

const Social = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {providers.map((provider) => (
        <button
          key={provider.label}
          className="flex items-center justify-between gap-6 w-full h-[38px] p-3 bg-white border border-gray-400 rounded-md"
        >
          <img src={provider.icon} className="w-5 h-5 mr-2" />
          <span className="text-wrap text-gray-700 font-semibold mr-20">
            Login with {provider.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Social;
