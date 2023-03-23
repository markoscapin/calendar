import { FunctionComponent } from "react";

interface props {
    width?: number,
    height?:number
}
const StaffProfileIcon : FunctionComponent<props> = ({width=64, height=64}) => {
    return (
        <div className={`h-${height/4} w-${width/4} ring-2 ring-green-500 rounded-full`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-${height/4} w-${width/4}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clipRule="evenodd"
      />
    </svg>
        </div>
      
    );
  }

export default StaffProfileIcon
  