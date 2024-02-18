import React from "react";

interface ModalCloseProp {
  onClick: () => void;
}

const ModalCloseButton: React.FC<ModalCloseProp> = ({ onClick }) => {
  return (
    <button
      className="rounded-full p-4 transform hover:rotate-180 transition duration-300 ease-in-out"
      onClick={onClick}
    >
      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="white" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}

export default ModalCloseButton;