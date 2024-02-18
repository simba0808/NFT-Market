import React from "react";

interface PrimaryInputProps {
  onChange: (value: string) => void;
  type: string;
  label: string;
  placeholder: string;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({ type, label, placeholder, onChange } ) => {

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-green-700 dark:text-white">
        { label }
      </label>
      <input 
        key={label}
        type={type=="1"?"password":"text"}
        className="bg-green-50 dark:bg-gray-600 border text-sm rounded-lg block w-full p-2.5 focus:outline-none" 
        placeholder={ placeholder }
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default PrimaryInput;