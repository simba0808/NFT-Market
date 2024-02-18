import React from "react";

interface PrimaryInputProps {
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({ label, placeholder, onChange } ) => {

  return (
    <div>
      <label htmlFor="success" className="block mb-1 text-sm font-medium text-green-700 dark:text-white">
        { label }
      </label>
      <input 
        type="text" 
        id="success" 
        className="bg-green-50 dark:bg-gray-600 border text-sm rounded-lg block w-full p-2.5 focus:outline-none" 
        placeholder={ placeholder }
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default PrimaryInput;