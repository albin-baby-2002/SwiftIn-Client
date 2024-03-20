import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "../UiComponents/Heading";
import Button from "../UiComponents/Button";
import { FcGoogle } from "react-icons/fc";
import Input from "../Inputs/Input";
import {  useState } from "react";
import Modal from "./ParentModal/Modal";

import toast from "react-hot-toast";
import { Axios } from "../../Api/Axios";
import { REGISTER_URL } from "../../Api/EndPoints";
import { SignUpSchema } from "../../Schemas/User/signUpSchema";
import useOtpModal from "../../Hooks/zustandStore/useOtpModal";
import UseGoogleLogin from "../../Hooks/AuthHooks/useGoogleLogin";
import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";
import { TRegisterResponse } from "../../Types/GeneralTypes/apiResponseTypes";
import { STATUS_CODES } from "../../Enums/statusCodes";
import { AxiosError } from "axios";

const RegisterModal = () => {
  // state management Zustand

  const registerModalState = useRegisterModal();

  const otpModalState = useOtpModal();

  // google login hook

  const googleLogin = UseGoogleLogin();

  // loading state

  const [isLoading, setIsLoading] = useState(false);

  // react hook form with default values and zod for validation

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  // onSubmit function to pass as callback for handleSubmit of react hook form

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await Axios.post<TRegisterResponse>(REGISTER_URL, data);

      if (response.status === STATUS_CODES.CREATED) {
        toast.success("User created successfully");
      }

      if (response.status === STATUS_CODES.OK) {
        toast.success("Account already exist but not verified. Verify now");
      }

      setIsLoading(false);

      otpModalState.setData(response.data.userId, response.data.email);

      registerModalState.onClose();

      otpModalState.onOpen();

      reset();
    } catch (err) {
      setIsLoading(false);

      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.CONFLICT) {
        toast.error("Email Already Registered");
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  // body content for input form

  const bodyContent = (
    <div className=" flex flex-col gap-1">
      <Heading title="Welcome to SwiftIn" />

      <div className=" flex flex-col gap-3">
        <Input
          id="username"
          label="Username"
          register={register}
          errors={errors}
        />
        <Input id="email" label="Email" register={register} errors={errors} />
        <Input
          id="password"
          label="Password"
          register={register}
          errors={errors}
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );

  // footer content for modal - google oAuth button

  const footer = (
    <div className=" mb-4   flex flex-col items-center gap-6">
      <div className=" relative flex  w-full flex-col items-center justify-center">
        <div className="absolute  h-[1.25px] w-full  bg-gray-400"></div>

        <div className=" z-20 mb-1 bg-white px-4  font-semibold text-gray-400">
          or
        </div>
      </div>

      <Button
        label="Sign up with Google"
        onClick={() => {
          googleLogin();
        }}
        outline={true}
        Icon={FcGoogle}
      />
    </div>
  );

  // actual model made from boiler plate modal

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModalState.isOpen}
      onClose={registerModalState.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      submitActionLabel="continue"
      body={bodyContent}
      footer={footer}
    />
  );
};

export default RegisterModal;
