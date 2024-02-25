import ModalCloseButton from "../buttons/ModalCloseButton";
import PrimaryInput from "../inputs/PrimaryInput";
import { useState } from "react";
import axios from "axios";
import UseToast from "@/app/hooks/UseToast";

interface userInputProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupModal = ({ handleCloseClick }: { handleCloseClick: () => void }) => {
  const [user, setUser] = useState<userInputProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isInvalid, setInvalid]= useState<boolean>(false);

  const checkUserInput = (): boolean => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if(!emailRegex.test(user.email)) {
      return false;
    }
    if(user.password.length < 6) {
      return false;
    }
    if(user.password !== user.confirmPassword) {
      return false;
    }
    return true;
  }

  const handleSignup = async () => {
    try {
      if(!checkUserInput()) {
        setInvalid(true);
        return;
      }
      const res = await axios.post("/api/auth/signup", user);
      handleCloseClick();
      <UseToast title="Signup" text="Successfully signed up!" />
      //useToast({title: "Signup", text: "Successfully signed up!"});
    } catch (err) {
      <UseToast title="Signup" text="Failed signed up!" />
      //useToast({title: "Signup", text: "Failed signed up!"});
      console.log(err);
    }
  }

  return (
    <>
      <dialog
        className="fixed left-0 top-0 w-full h-[100vh] bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
      >
        <div className="w-full sm:w-[600px] flex flex-col items-end p-4">
          <ModalCloseButton onClick={handleCloseClick} />
          <div className="w-full bg-white dark:bg-gray-700 m-auto p-8 rounded-xl">
            <div className="text-black dark:text-white">
              <h1 className="text-2xl mb-6">Sign Up</h1>
              <div className="flex flex-col gap-4">
                <PrimaryInput type="0" label="Email" placeholder="Enter your email" onChange={(value) => setUser({ ...user, email: value })} />
                <PrimaryInput type="1" label="Password" placeholder="Enter your password" onChange={(value) => setUser({ ...user, password: value })}/>
                <PrimaryInput type="1" label="Confirm Password" placeholder="Confirm your password" onChange={(value) => setUser({ ...user, confirmPassword: value })}/>
              </div>
              <br/>
              <button
                type="button"
                className="float-right px-4 py-2 mt-4 rounded-md bg-red-500 text-white"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );  
}

export default SignupModal;
