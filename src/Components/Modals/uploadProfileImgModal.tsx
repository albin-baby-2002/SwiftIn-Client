import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";



import toast from "react-hot-toast";

import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import useUploadProfileImgModal from "../../Hooks/zustandStore/useProfileImgUploadModal";

interface UploadProfileImgModalProps {
  reFetchData: () => void;
}

const UploadProfileImgModal: React.FC<UploadProfileImgModalProps> = ({ reFetchData }) => {
  const AxiosPrivate = useAxiosPrivate();
  
  const uploadProfileImgModalState = useUploadProfileImgModal()



  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      

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
     
    </div>
  );

  return (
    <Modal
      title="Upload Profile Image"
      onClose={uploadProfileImgModalState.onClose}
      onSubmit={()=>{}}
      isOpen={uploadProfileImgModalState.isOpen}
      submitActionLabel="Upload"
      body={bodyContent}
    />
  );
};

export default UploadProfileImgModal;
