import React from "react";

interface SecondaryButtonProps {
  onClick: () => void;
  text: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ onClick, text }) => {
  return (
    <a 
      className="text-gray-800 text-white hover:text-black bg-[#DA8F4D] hover:bg-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-[1px] border-[#DA8F4D]  hover: focus:outline-none hover:cursor-pointer"
      onClick={onClick}
    >
      {
        text
      }
    </a>
  );
}

export default SecondaryButton;