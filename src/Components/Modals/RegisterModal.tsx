import z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";

import useRegisterModal from "../../Hooks/useRegisterModal";


// zod schema for validating react hook form

const SignUpSchema = z

  .object({
    email: z.string().email("Enter a valid email"),
    username: z.string().min(5, "user name should have min 5 character"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "minimum 8 char & min one (uppercase & lowercase letter, special char & number)",
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password does not match original password",
    path: ["confirmPassword"],
  });

const RegisterModal = () => {
    
  // registerModal state management Zustand 
    
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  // react hook form with default values and zod for validation 
  
  const {
    register,
    handleSubmit,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log("submit", data);
  };

  // body content for input form

  const bodyContent = (
    <div className=" flex flex-col gap-1">
      <Heading title="Welcome to SwiftIn" />

      <div className=" flex gap-3 flex-col">
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
  
  // footer content for modal - google and gitHub oAuth buttons

  const footer = (
    <div className=" flex  flex-col items-center gap-4">
      <Button
        label="Google"
        onClick={() => {}}
        outline={true}
        Icon={FcGoogle}
      />
      <Button
        label="GitHub"
        onClick={() => {}}
        outline={true}
        Icon={AiFillGithub}
      />
    </div>
  );
  
  // actual model made from boiler plate modal

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      submitActionLabel="continue"
      body={bodyContent}
      footer={footer}
    />
  );
};

export default RegisterModal;
