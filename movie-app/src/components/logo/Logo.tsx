import { Link } from "react-router-dom";
import "./Logo.css";

interface IProp{
    fontSize?: string,
}

export function Logo({fontSize}: IProp) {
  return (
    <Link to={"/"} id="logo" style={fontSize ? {fontSize: fontSize} : {}}>
      M<span>O</span>W
    </Link>
  );
};
