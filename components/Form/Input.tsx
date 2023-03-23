import {  ComponentElement, FunctionComponent, ReactNode, useCallback, useEffect } from "react";
interface InputProps {
  name : string,
  type : string,
  labelDescription? : string,
  onChange? : any,
  onKeyDown? : any ,
  placeholder? :string,
  id? : boolean | string,
  required? : boolean,
  step? : string | number,
  defaultValue? : undefined | string | number,
  value? : undefined | string | number,
  className? : string,
  margin? :string,
  inputPadding? :string,
  icon? : boolean | ReactNode,
  rows? : number,
  disabled? : boolean,
}
const Input:FunctionComponent<InputProps> = ({
  name,
  type,
  labelDescription,
  onChange = () => null,
  onKeyDown = () => null,
  placeholder = "",
  id = false,
  required = false,
  step = "any",
  defaultValue = undefined,
  value = undefined,
  className = "",
  margin = "my-5",
  inputPadding = "py-2 px-4",
  icon = false,
  rows = 4,
  disabled = false,
}) => {
  //this callback handle which modal to show depending on key
  const keyPress = useCallback((e) => {
    e.stopPropagation();
  }, []);
  //this useEffect add listener to keydown event
  useEffect(() => {
    document.querySelectorAll("input").forEach((input) => {
      input.addEventListener("keydown", keyPress);
    });
    document.querySelectorAll("textarea").forEach((textarea) => {
      textarea.addEventListener("keydown", keyPress);
    });
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  if (type === "textarea") {
    return (
      <div className={"flex flex-col " + margin + " " + className}>
        <label
          className={
            "uppercase tracking-widest text-xs " +
            (labelDescription === undefined ? "hidden" : "")
          }
          htmlFor={name}
        >
          {labelDescription}
        </label>
        <textarea
          id={id && typeof id === "string" ? id : null}
          className={
            "border rounded border-slate-200 focus:ring-0 focus:border-slate-200 shadow dark:text-black  focus-visible:outline-none focus-visible:shadow-lg " +
            inputPadding
          }
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onKeyDown={onKeyDown}
          rows={rows}
          disabled={disabled}
        ></textarea>
      </div>
    );
  }

  return (
    <div className={"flex flex-col " + margin + " " + className}>
      <label
        className={
          "uppercase tracking-widest text-xs " +
          (labelDescription === undefined ? "hidden" : "")
        }
        htmlFor={name}
      >
        {labelDescription}
      </label>
      <input
        id={id && typeof id === "string" ? id : null}
        className={
          "border rounded border-slate-200 focus:ring-0 focus:border-slate-200 shadow dark:text-black  focus-visible:outline-none focus-visible:shadow-lg " +
          inputPadding
        }
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
        defaultValue={defaultValue}
        value={value}
        onKeyDown={onKeyDown}
        disabled={disabled}
      ></input>
      {typeof icon !== "boolean" && icon}
    </div>
  );
}
export default Input