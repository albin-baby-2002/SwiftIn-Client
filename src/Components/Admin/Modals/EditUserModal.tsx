import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../Modals/ParentModal/Modal.tsx";
import toast from "react-hot-toast";
import Input from "../../Inputs/Input.tsx";

import useAxiosPrivate from "../../../Hooks/AxiosPrivate/useAxiosPrivate.ts";
import useEditUserModal from "../../../Hooks/zustandStore/useEditUserModal.ts";
import { useEffect, useState } from "react";

interface EditUserModalProps {
  reFetchData: () => void;
}

interface axiosResponse {
  user: user;
}

interface user {
  _id: string;
  username: string;
  email: string;
  phone: string;
  joinedDate: string;
  verified: boolean;
  blocked: boolean;
}

const EditUserSchema = z.object({
  email: z.string().email("Enter a valid email"),
  username: z.string().min(5, "user name should have min 5 character"),
  phone: z.string().refine((value) => {
    if (!value) return true;
    const IND_PHONE_REGEX = /^(\+91[\-\s]?)?[6789]\d{9}$/;
    return IND_PHONE_REGEX.test(value);
  }, "Invalid phone . It Should be 10 digits"),
});

const EditUserModal: React.FC<EditUserModalProps> = ({ reFetchData }) => {
  const EditUserModalState = useEditUserModal();

  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<axiosResponse>(
          "/admin/user/" + `${EditUserModalState.userID}`,
        );

        if (isMounted) {
          let data = response.data.user;

          reset({
            username: data.username,
            email: data.email,
            phone: data.phone,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [EditUserModalState.userID]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(EditUserSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await AxiosPrivate.patch(
        "/admin/user/" + `${EditUserModalState.userID}`,
        data,
      );

      toast.success(" User updated successfully");
      reFetchData();

      EditUserModalState.onClose();
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
        toast.error("Failed to Edit  User");
      }
    }
  };

  const bodyContent = (
    <>
      <div className=" flex flex-col gap-3">
        <Input
          id="username"
          label="Username"
          register={register}
          errors={errors}
        />

        <Input id="email" label="Email" register={register} errors={errors} />
        <Input id="phone" label="Phone" register={register} errors={errors} />
      </div>
    </>
  );

  return (
    <Modal
      title="Edit User"
      onClose={EditUserModalState.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={EditUserModalState.isOpen}
      submitActionLabel="Edit User"
      body={bodyContent}
    />
  );
};

export default EditUserModal;
