import { CheckIconProps } from "./types";

const CheckIcon = ({ fill = "none", height = "10", width="14" }: CheckIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.3334 1.33325L5.00008 8.66659L1.66675 5.33325"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default CheckIcon;
