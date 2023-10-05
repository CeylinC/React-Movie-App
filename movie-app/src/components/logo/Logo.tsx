import { Link } from "react-router-dom";
import "./Logo.css";

interface IProp{
    fontSize?: string,
    className?: string,
}

export function Logo({fontSize, className}: IProp) {
  return (
    <Link to={"/"} id="logo" style={fontSize ? {fontSize: fontSize} : {}} className={`no-underline font-bold text-white ${className}`}>
      M<span className="font-normal">O</span>W
    </Link>
  );
};
