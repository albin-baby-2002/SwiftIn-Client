import Modal from "./ParentModal/Modal";
import useOtpModal from "../../Hooks/zustandStore/useOtpModal";
import logo from "../../Assets/logo3.png";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Axios } from "../../Api/Axios";
import { RESEND_OTP_URL, VERIFY_OTP_URL } from "../../Api/EndPoints";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";

const OtpModal = () => {
  // Zustand states

  const otpModalState = useOtpModal();

  const loginModalState = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // useEffect to focus the first input field and clear old values

  useEffect(() => {
    setOtp(new Array(4).fill(""));

    if (inputRefs.current[0] && otp[0] === "") {
      inputRefs.current[0].focus();
    }
  }, [otpModalState.isOpen]);

  // function handle change in value in each field

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;

    if (isNaN(Number(value))) {
      return;
    }

    let newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);

    setOtp(newOtp);

    if (value && index < 3 && inputRefs.current[index + 1]) {
      setTimeout(() => {
        inputRefs.current[index + 1].focus();
      }, 100);
    }
  };

  // function to automatically place cursor at end of field

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  // function to handle backspace

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (index > 0 && e.key === "Backspace" && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  // submit function

  const handleSubmit = async () => {
    setIsLoading(true);

    let value = otp.join("");

    let email = otpModalState.email;

    let userId = otpModalState.userId;

    try {
      await Axios.post(VERIFY_OTP_URL, {
        otp: value,
        email,
        userId,
      });

      setIsLoading(false);

      toast.success("verification success");

      otpModalState.onClose();

      loginModalState.onOpen();
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        if (err.response.data.message.trim() === "email or userId is empty") {
          toast.error("Unexpected error: Sign Up Again");

          return;
        }
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Verification Failed");
      }
    }
  };

  // resend otp request sender

  const resendOtp = async () => {
    let email = otpModalState.email;

    let userId = otpModalState.userId;

    try {
      await Axios.post(RESEND_OTP_URL, {
        email,
        userId,
      });

      toast.success("OTP send to your email ");
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        if (err.response.data.message.trim() === "email or userId is empty") {
          toast.error("Unexpected error: Sign Up Again");

          return;
        }
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to ResendOtp try again");
      }
    }
  };

  const bodyContent = (
    <div className=" mt-3  flex flex-col items-center">
      <img className="py-3" src={logo} alt="" height={80} width={80} />

      <p className="  w-5/6 py-5 text-center text-sm  font-bold  leading-6 ">
        We have send an OTP to
        {otpModalState.email
          ? ` ${otpModalState.email} `
          : "your email address"}
        please enter the OTP to verify your account
      </p>

      <div className=" flex  gap-3  py-5">
        {otp.map((val, index) => (
          <input
            key={index}
            ref={(input) => {
              input && (inputRefs.current[index] = input);
            }}
            className=" h-12 w-12 rounded-md border-2 border-black px-2 text-center text-lg font-semibold"
            type="text"
            value={val}
            onChange={(e) => {
              handleChange(index, e);
            }}
            onClick={() => {
              handleClick(index);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e, index);
            }}
          />
        ))}
      </div>

      <p
        onClick={() => {
          resendOtp();
        }}
        className=" mb-3 mt-4 cursor-pointer font-semibold"
      >
        Resend OTP
      </p>
    </div>
  );

  return (
    <Modal
      title="Email Verification"
      onSubmit={handleSubmit}
      isOpen={otpModalState.isOpen}
      onClose={otpModalState.onClose}
      submitActionLabel="verify"
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default OtpModal;
