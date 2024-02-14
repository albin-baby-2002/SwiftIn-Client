import { useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  textBox?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  textBox,
  errors,
}) => {
  useEffect(() => {}, [errors]);

  return (
    <div className="  flex flex-col gap-2  text-sm">
      <label className=" font-bold text-neutral-400 px-2 pt-2">{label}</label>

      <div className="relative flex flex-col">
        {textBox ? (
          <textarea
            id={id}
            disabled={disabled}
            {...register(id)}
            className={`border-2  py-2 px-2 rounded-md focus:outline-none
          ${errors[id] ? "focus:border-rose-400" : "focus:border-black"}
          ${errors[id] ? "border-rose-400" : "border-neutral-400"}
          ${textBox ? "h-20" : ""}
         `}
          ></textarea>
        ) : (
          <input
            id={id}
            type={type}
            disabled={disabled}
            {...register(id)}
            className={`border-2  py-2 px-2 rounded-md focus:outline-none
          ${errors[id] ? "focus:border-rose-400" : "focus:border-black"}
          ${errors[id] ? "border-rose-400" : "border-neutral-400"}
          ${textBox ? "h-20" : ""}
         `}
          />
        )}

        {errors[id] && (
          <p className=" pt-2  ps-1 text-xs  text-rose-400 font-semibold  ">
            {errors[id]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
