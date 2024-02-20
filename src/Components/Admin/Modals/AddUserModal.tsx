import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../Modals/ParentModal/Modal.tsx";
import toast from "react-hot-toast";
import Input from "../../Inputs/Input.tsx";
import useAddUserModal from "../../../Hooks/zustandStore/useAddUserModal.ts";
import useAxiosPrivate from "../../../Hooks/AxiosPrivate/useAxiosPrivate.ts";

interface AddUserModalProps {
  reFetchData: () => void;
}

const AddUserSchema = z

  .object({
    email: z.string().email("Enter a valid email"),
    username: z.string().min(5, "user name should have min 5 character"),
    phone: z.string().refine((value) => {
      if (!value) return true;
      const IND_PHONE_REGEX = /^(\+91[\-\s]?)?[6789]\d{9}$/;
      return IND_PHONE_REGEX.test(value);
    }, "Invalid phone . It Should be 10 digits"),
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

const AddUserModal: React.FC<AddUserModalProps> = ({ reFetchData }) => {
  const AddUserModal = useAddUserModal();

  const AxiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      phone: "",
      confirmPassword: "",
    },
    resolver: zodResolver(AddUserSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await AxiosPrivate.post("/admin/user/add", data);

      AddUserModal.onClose();

      toast.success("New User Successfully Created");

      reFetchData();
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
        toast.error("Failed to create new User");
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
    </>
  );

  return (
    <Modal
      title="Add New User"
      onClose={AddUserModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={AddUserModal.isOpen}
      submitActionLabel="Create User"
      body={bodyContent}
    />
  );
};

export default AddUserModal;
