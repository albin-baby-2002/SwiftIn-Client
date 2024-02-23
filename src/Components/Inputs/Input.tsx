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
  HalfWidth?: boolean;
  labelBlack?: boolean;
  textBase?: boolean;
  placeholder?: string;
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
  labelBlack,
  HalfWidth,
  textBase,
  placeholder,
}) => {
  useEffect(() => {}, [errors]);

  return (
    <div
      className={`${HalfWidth ? "w-[48%]" : ""} ${textBase ? " " : "text-sm"} flex flex-col gap-2  `}
    >
      <label
        className={`${labelBlack ? " text-black" : " text-neutral-400"} px-2 pt-2 font-bold`}
      >
        {label}
      </label>

      <div className="relative flex flex-col ">
        {textBox ? (
          <textarea
            id={id}
            disabled={disabled}
            {...register(id)}
            className={`mt-2  rounded-md border-2 px-3 py-3 font-Sen focus:outline-none
          ${errors[id] ? "focus:border-rose-400" : "focus:border-black"}
          ${errors[id] ? "border-rose-400" : "border-neutral-400"}
          ${textBox ? "h-28" : ""}
         `}
          ></textarea>
        ) : (
          <input
            id={id}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            {...(type && type === "number"
              ? { ...register(id, { valueAsNumber: true }) }
              : { ...register(id) })}
            className={`rounded-md  border-2 px-4 py-2 font-Sen  focus:outline-none
          ${errors[id] ? "focus:border-rose-400" : "focus:border-black"}
          ${errors[id] ? "border-rose-400" : "border-neutral-400"}
          ${textBox ? "h-20" : ""}
         `}
          />
        )}

        {errors[id] && (
          <p className=" ps-1  pt-2 text-xs  font-semibold text-rose-400  ">
            {errors[id]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
