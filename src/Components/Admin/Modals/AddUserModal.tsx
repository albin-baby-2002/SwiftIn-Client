import useAddUserModal from "../../../Hooks/zustandStore/useAddUserModal.ts";
import { AddUserSchema } from "../../../Schemas/Admin/addUserSchema.ts";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../Modals/ParentModal/Modal.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../Inputs/Input.tsx";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { STATUS_CODES } from "../../../Enums/statusCodes.ts";
import { ADMIN_ADD_USER_URL } from "../../../Api/EndPoints.ts";
import useAxiosPrivate from "../../../Hooks/AxiosPrivate/useAxiosPrivate.ts";
import { TAddUserModalProps } from "../../../Types/AdminTypes/propsTypes.ts";

// modal for admin to add new users

const AddUserModal: React.FC<TAddUserModalProps> = ({ reFetchData }) => {
  const AddUserModalState = useAddUserModal();
  const AxiosPrivate = useAxiosPrivate();

  // useForm for adding new user

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
      await AxiosPrivate.post(ADMIN_ADD_USER_URL, data);

      AddUserModalState.onClose();

      toast.success("New User Successfully Created");

      reFetchData();
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.CONFLICT) {
        toast.error("Email Already Registered");
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
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
      onClose={AddUserModalState.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={AddUserModalState.isOpen}
      submitActionLabel="Create User"
      body={bodyContent}
    />
  );
};

export default AddUserModal;
