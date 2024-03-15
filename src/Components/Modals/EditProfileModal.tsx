import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Input from "../Inputs/Input";
import Modal from "./ParentModal/Modal";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PROFILE_URL } from "../../Api/EndPoints";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { EditProfileSchema } from "../../Schemas/User/editProfileSchema";
import useEditProfileModal from "../../Hooks/zustandStore/useEditProfileModal";
import { TEditProfileModalProps } from "../../Types/GeneralTypes/propsTypes";
import { STATUS_CODES } from "../../Enums/statusCodes";
import { TGetProfileDataResp } from "../../Types/GeneralTypes/apiResponseTypes";

const EditProfileModal: React.FC<TEditProfileModalProps> = ({
  reFetchData,
}) => {
  const AxiosPrivate = useAxiosPrivate();

  const editProfileModalState = useEditProfileModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      phone: "",
      aboutYou: "",
      addressLine: "",
      locality: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pinCode: "",
    },
    resolver: zodResolver(EditProfileSchema),
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response =
          await AxiosPrivate.get<TGetProfileDataResp>(PROFILE_URL);

        if (isMounted) {
          reset(response.data.userData);
        }
      } catch (error) {
        toast.error("Failed fetch data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await AxiosPrivate.patch(PROFILE_URL, data);

      setIsLoading(false);

      toast.success("Profile Edited SuccessFully");

      editProfileModalState.onClose();

      reFetchData();
    } catch (err) {
      setIsLoading(false);

      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to Edit");
      }
    }
  };

  const bodyContent = (
    <div>
      <Input
        id="username"
        label="username"
        errors={errors}
        register={register}
      />

      <Input id="phone" label="PhoneNo" errors={errors} register={register} />

      <Input
        id="addressLine"
        label="addressLine"
        errors={errors}
        register={register}
      />

      <Input
        id="locality"
        label="Locality"
        errors={errors}
        register={register}
      />

      <Input id="city" label="City" errors={errors} register={register} />

      <Input
        id="district"
        label="District"
        errors={errors}
        register={register}
      />
      <Input id="state" label="state" errors={errors} register={register} />

      <Input id="country" label="Country" errors={errors} register={register} />

      <Input id="pinCode" label="PinCode" errors={errors} register={register} />

      <Input
        id="aboutYou"
        label="AboutYou"
        errors={errors}
        register={register}
        textBox
      />
    </div>
  );

  return (
    <Modal
      title="Edit Profile"
      onClose={editProfileModalState.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={editProfileModalState.isOpen}
      submitActionLabel="Edit"
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default EditProfileModal;
