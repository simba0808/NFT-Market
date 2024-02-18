import { useState } from "react";
import ModalCloseButton from "../buttons/ModalCloseButton";
import PrimaryInput from "../inputs/PrimaryInput";

const SignupModal = ({ handleCloseClick }: { handleCloseClick: () => void }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (value: string) => {
    console.log(value);
  }

  return (
    <>
      <dialog
        className="fixed left-0 top-0 w-full h-[100vh] bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
      >
        <div className="w-[30%] flex flex-col items-end p-4">
          <ModalCloseButton onClick={handleCloseClick} />
          <div className="w-full bg-white dark:bg-gray-700 m-auto p-8 rounded-xl">
            <div className="text-black dark:text-white">
              <h1 className="text-2xl mb-6">Sign Up</h1>
              <div className="flex flex-col gap-4">
                <PrimaryInput label="Email" placeholder="Enter your email" onChange={handleChange} />
                <PrimaryInput label="Password" placeholder="Enter your password" onChange={handleChange}/>
                <PrimaryInput label="Confirm Password" placeholder="Confirm your password" onChange={handleChange}/>
              </div>
              <br/>
              <button type="button" className="float-right px-4 py-2 mt-4 rounded-md bg-red-500 text-white">Sign Up</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );  
}

export default SignupModal;
