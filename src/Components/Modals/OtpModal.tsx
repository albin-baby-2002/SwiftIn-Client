import Modal from "./Modal";
import useOtpModal from "../../Hooks/zustandStore/useOtpModal";

import logo from "../../Assets/logo3.png";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Axios } from "../../Api/Axios";
import { VERIFY_OTP_URL } from "../../Api/EndPoints";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";

const OtpModal = () => {
  const OtpModal = useOtpModal();

  const loginModal = useLoginModal();

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    setOtp(new Array(4).fill(""));

    if (inputRefs.current[0] && otp[0] === "") {
      inputRefs.current[0].focus();
    }
  }, [OtpModal.isOpen]);

  useEffect;

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;

    console.log(value);

    if (isNaN(Number(value))) {
      console.log("not nu");
      return;
    }

    console.log(parseFloat(value));

    let newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);

    setOtp(newOtp);

    if (value && index < 3 && inputRefs.current[index + 1]) {
      setTimeout(() => {
        inputRefs.current[index + 1].focus();
      }, 100);
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (index > 0 && e.key === "Backspace" && !otp[index]) {
      console.log("back");

      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    let value = otp.join("");

    let email = OtpModal.email;

    let userId = OtpModal.userId;

    try {
      await Axios.post(VERIFY_OTP_URL, {
        otp: value,
        email,
        userId,
      });

      toast.success("verification success");

      OtpModal.onClose();

      loginModal.onOpen();
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 409) {
        toast.error("Email Already Registered");
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Verification Failed");
      }
    }
  };

  const bodyContent = (
    <div className=" flex  flex-col items-center mt-3">
      <img className="py-3" src={logo} alt="" height={80} width={80} />

      <p className="  text-sm py-5 font-bold text-center  w-5/6  leading-6 ">
        We have send an OTP to your email address please enter it to verify your
        account
      </p>

      <div className=" flex  gap-3  py-5">
        {otp.map((val, index) => (
          <input
            key={index}
            ref={(input) => {
              input && (inputRefs.current[index] = input);
            }}
            className=" border-2 border-black w-12 h-12 rounded-md px-2 text-lg text-center font-semibold"
            type="text"
            value={val}
            onChange={(e) => {
              handleChange(index, e);
            }}
            onClick={(e) => {
              handleClick(index);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e, index);
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      title="Email Verification"
      onSubmit={handleSubmit}
      isOpen={OtpModal.isOpen}
      onClose={OtpModal.onClose}
      submitActionLabel="verify"
      body={bodyContent}
    />
  );
};

export default OtpModal;
