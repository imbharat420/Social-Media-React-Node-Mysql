import { ErrorMessage, Field, useField, useFormikContext } from "formik";

export const CustomInputField = ({
  name,
  placeholder,
  label,
  disabled,
  type,
  props,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <Field
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className="form-control"
        {...props}
      />
      <ErrorMessage component="p" className="text-danger" name={name} />
    </div>
  );
};

export const CustomTextAreaField = ({
  name,
  placeholder,
  label,
  disabled,
}) => {
  return (
    <>
      <div className="form-group">
        <label>{label}</label>
        <Field
          type={"textarea"}
          as="textarea"
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className="form-control"
        />
        <ErrorMessage component="p" className="text-danger" name={name} />
      </div>
    </>
  );
};