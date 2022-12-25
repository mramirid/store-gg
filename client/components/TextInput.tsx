import { ForwardedRef, forwardRef } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

function TextInput(
  props: UseFormRegisterReturn & {
    label: string;
    type: "text" | "email" | "tel" | "password";
    id: string;
    "aria-describedby"?: string;
    placeholder?: string;
    error: FieldError | undefined;
  },
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <>
      <label
        htmlFor={props.id}
        className="form-label text-lg fw-medium color-palette-1 mb-10"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control rounded-pill text-lg"
        ref={ref}
        id={props.id}
        name={props.name}
        aria-describedby={props["aria-describedby"]}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <InputErrorMessage className="mt-2" error={props.error} />

      <style jsx>{`
        input {
          border: 1px solid #0c145a;
          padding: 0.75rem 1.625rem;
          color: #0c145a;
          max-width: 467px;
        }

        input:focus-within {
          color: #0c145a;
        }

        input::placeholder {
          color: #ccd0dd;
        }
      `}</style>
    </>
  );
}

export default forwardRef(TextInput);
