import useEditProfileModal from "../../Hooks/zustandStore/useEditProfileModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../Inputs/Input";

import { useEffect, useState } from "react";
import Modal from "./ParentModal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "../../Schemas/editProfileSchema";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { PROFILE_DATA_URL } from "../../Api/EndPoints";

interface TProfileInfo {
  _id: string;
  username: string;
  email: string;
  phone: string;
  wallet: number;
  aboutYou: string;
  addressLine: string;
  locality: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
}
interface ProfileResponse {
  userData: TProfileInfo;
}

interface EditUserModalProps {
  reFetchData: () => void;
}

const EditProfileModal: React.FC<EditUserModalProps> = ({ reFetchData }) => {
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
          await AxiosPrivate.get<ProfileResponse>(PROFILE_DATA_URL);

        if (isMounted) {
          reset(response.data.userData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
      await AxiosPrivate.patch("/user/profile", data);

      setIsLoading(false);

      toast.success("Profile Edited SuccessFully");

      editProfileModalState.onClose();

      reFetchData();
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Registration Failed");
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
