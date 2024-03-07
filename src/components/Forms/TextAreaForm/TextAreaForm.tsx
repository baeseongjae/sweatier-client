import Icon from "@/components/Icon";
import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import blueDot from "../../../../public/assets/blueDot.svg";
import contentIcon from "../../../../public/assets/contentIcon.svg";
import grayDot from "../../../../public/assets/grayDot.svg";
import FormOuter from "../FormOuter";
import Label from "../Label";

type TextareaFormProps = PropsWithChildren<{
  label: string;
  id: string;
  placeholder: string;
}>;

function TextareaForm({ label, id, placeholder }: TextareaFormProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const errorMessages = errors[id] ? errors[id]!.message?.toString() : "";
  const hasError = !!(errors && errorMessages);

  return (
    <FormOuter>
      <div className="flex items-center">
        <Label id={id} label={label} iconSrc={contentIcon} />
        <div className="flex pl-1 pb-2">
          <Icon
            src={String(watch(id)).length >= 10 ? blueDot : grayDot}
            alt="title-required-message"
          />
          <p
            className={`text-natural-50 text-xs pl-1 ${
              String(watch(id)).length >= 10 ? "text-primary-100" : ""
            }`}
          >
            내용은 10글자 이상이어야 합니다.
          </p>
        </div>
      </div>
      <textarea
        id={id}
        aria-label={label}
        placeholder={placeholder}
        className=" border border-natural-50 placeholder:text-natural-50 text-sm rounded-lg focus:ring-primary-100 focus:border-primary-100 block w-full dark:bg-natural-50 dark:border-natural-50 dark:placeholder-natural-50 dark:text-white dark:focus:ring-primary-100 dark:focus:border-primary-100 px-5 py-3 font-light resize-none h-32 p-4"
        {...register(`${id}`, { required: true, minLength: 10 })}
      />
      {/* {hasError && <p>{errorMessages}</p>} */}
    </FormOuter>
  );
}

export default TextareaForm;
