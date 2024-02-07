import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "../../Hooks/useLoginModal"
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Modal from "./Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const loginSchema = z.object({
    email:z.string().email('Enter a valid email'),
    password:z.string().min(8,"Minimum length is 8")
})


const LoginModal = () => {
    
    const loginModal = useLoginModal();
    
    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({defaultValues:{
        email:'',
        password:''
    },resolver:zodResolver(loginSchema)})
    
    const onSubmit:SubmitHandler<FieldValues>= (data)=>{
        
    }
    
    const bodyContent = (
        
        <div>
            <Heading title="Welcome Back To SwiftIn"/>
            
            <Input id="email" label="Email" errors={errors} register={register} />
            <Input id="password" label="password" errors={errors} register={register} />
        </div>
    )
    
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
    
  return (
    <Modal title="Login" onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} isOpen={loginModal.isOpen} submitActionLabel="Login" body={bodyContent} footer={footer}/>
  )
}

export default LoginModal
