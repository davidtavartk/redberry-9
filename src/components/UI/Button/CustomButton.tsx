import { ButtonProps } from "@/types/propTypes";
import { useButton } from "react-aria";
import { forwardRef, useImperativeHandle, useRef } from "react";

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const { filled = false, type = "button", className, children, ...otherProps } = props;
  const internalRef = useRef<HTMLButtonElement>(null);
  
  const { buttonProps } = useButton(props, internalRef as React.RefObject<HTMLButtonElement>);
  useImperativeHandle(forwardedRef, () => internalRef.current!);
  

  return (
    <button
      {...buttonProps}
      {...otherProps}
      ref={internalRef}
      className={`text-c-grey flex cursor-pointer items-center justify-center rounded-[5px] border px-5 py-2.5 transition-all duration-200 ease-in-out ${filled ? "bg-[#8338EC] text-white hover:bg-[#8869b4] active:bg-[#6e4ba0]" : "border border-[#8338EC] hover:bg-[#B588F4] hover:text-white active:bg-[#9157e4]"} ${className}`}
      type={type}
    >
      <span className="flex items-center justify-center gap-1">{children}</span>
    </button>
  );
});

CustomButton.displayName = 'CustomButton';

export default CustomButton;
