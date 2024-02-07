import Modal from "./Modal";
import useOtpModal from "../../Hooks/useOtpModal";

import logo from "../../Assets/logo3.png";
import { useEffect, useRef, useState } from "react";

const OtpModal = () => {
  const OtpModal = useOtpModal();

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  
  const focusRef = useRef(0)

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  },[]);
  
  useEffect

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;
    
    console.log(value)

    if (isNaN(Number(value))) {
        
        
      console.log("not nu");
      return;
    }

    console.log(parseFloat(value));

    let newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);

    setOtp(newOtp);

    if ( value && index < 3 && inputRefs.current[index+1]) {
        
        setTimeout(()=>{
            
            inputRefs.current[index + 1].focus();
            
        },100)
        
            
    }
    
    
  };
  
  const handleClick = (index:number)=>{
        
    inputRefs.current[index].setSelectionRange(1,1)
  }
  
  const handleKeyDown = ( e: React.KeyboardEvent<HTMLInputElement>,index:number)=>{
    
        if(index > 0 && e.key === 'Backspace' && !otp[index] ){
            
            console.log('back')
            
            inputRefs.current[index-1].focus()
        } 
  }

  const bodyContent = (
    <div className=" flex  flex-col items-center mt-3">
      <img className="py-3" src={logo} alt="" height={80} width={80} />

      <p className="  text-sm py-5 font-bold text-center  w-5/6  leading-6 ">
        We have send an email to your email address please enter it to verify
        your account
      </p>

      <div className=" flex  gap-3  py-5">
        {otp.map((val, index) => (
          <input
          key={index}
            ref={(input) => {
              input && (inputRefs.current[index] = input);
            }}
            className=" border-2 border-black w-12 h-12 rounded-md px-2 text-lg text-center font-semibold"
            type="text"
            value={val}
            onChange={(e) => {
              handleChange(index, e);
            }}
            onClick={(e)=>{handleClick(index)}}
            onKeyDown={(e)=>{handleKeyDown(e,index)}}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      title="Email Verification"
      onSubmit={() => {}}
      isOpen={OtpModal.isOpen}
      onClose={OtpModal.onClose}
      submitActionLabel="verify"
      body={bodyContent}
    />
  );
};

export default OtpModal;
