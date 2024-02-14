import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../UiComponents/Button";

import { Axios, axiosPrivate } from "../../Api/Axios";
import useAuth from "../../Hooks/zustandStore/useAuth";
import toast from "react-hot-toast";
import useEditProfileModal from "../../Hooks/zustandStore/useEditProfileModal";
import Input from "../Inputs/Input";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { useEffect } from "react";

const EditProfileSchema = z.object({
  username: z.string().min(5, "user name should have min 5 character"),
  phone: z.string().refine((value) => {
    if (!value) return true;
    const IND_PHONE_REGEX = /^(\+91[\-\s]?)?[6789]\d{9}$/;
    return IND_PHONE_REGEX.test(value);
  }, "Invalid phone . It Should be 10 digits"),
  aboutYou: z.string(),
  addressLine: z.string(),
  locality: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  district: z.string(),
  pinCode: z.string(),
});

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
  const auth = useAuth();

  const editProfileModalState = useEditProfileModal();

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
          await AxiosPrivate.get<ProfileResponse>("/user/profile");

        if (isMounted) {
          reset(response.data.userData);

          console.log(response.data);
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
      await AxiosPrivate.patch("/user/profile", data);

      toast.success("Profile Edited SuccessFully");

      editProfileModalState.onClose();

      reFetchData();
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 401) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else if (err.response?.status === 404) {
        toast.error("Email not registered. Please SignUp");
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
     

     
        <Input
          id="country"
          label="Country"
          errors={errors}
          register={register}
        />

        <Input
          id="pinCode"
          label="Pincode"
          errors={errors}
          register={register}
        />
     
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
    />
  );
};

export default EditProfileModal;
