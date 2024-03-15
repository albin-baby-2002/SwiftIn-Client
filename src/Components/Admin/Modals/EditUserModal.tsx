import { useEffect } from "react";
import toast from "react-hot-toast";
import Input from "../../Inputs/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../Modals/ParentModal/Modal.tsx";
import { ADMIN_SINGLE_USER_URL } from "../../../Api/EndPoints.ts";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { EditUserSchema } from "../../../Schemas/Admin/editUserSchema.ts";
import useAxiosPrivate from "../../../Hooks/AxiosPrivate/useAxiosPrivate.ts";
import useEditUserModal from "../../../Hooks/zustandStore/useEditUserModal.ts";
import { TEditUserModalProps } from "../../../Types/AdminTypes/propsTypes.ts";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../../Enums/statusCodes.ts";
import { TGetUserDataResp } from "../../../Types/AdminTypes/apiResponseTypes.ts";

const EditUserModal: React.FC<TEditUserModalProps> = ({ reFetchData }) => {
  const EditUserModalState = useEditUserModal();
  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<TGetUserDataResp>(
          ADMIN_SINGLE_USER_URL + `${EditUserModalState.userID}`,
        );

        if (isMounted) {
          let data = response.data.user;

          reset({
            username: data.username,
            email: data.email,
            phone: data.phone ? data.phone : "",
          });
        }
      } catch (error) {
        toast.error("Failed to load data");
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
        ADMIN_SINGLE_USER_URL + `${EditUserModalState.userID}`,
        data,
      );

      toast.success(" User updated successfully");
      reFetchData();

      EditUserModalState.onClose();
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to Edit User");
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
