import { IconData } from "../../model";
import sprite from "../../asset/sprite.svg"

interface IProp {
  iconData: IconData;
  color: string;
  size: string;
}

export function CustomIcon({ iconData, color, size }: IProp) {

  return (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${iconData}`} />
    </svg>
  );
}
