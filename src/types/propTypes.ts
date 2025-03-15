import { Department, Priority } from "./types";

export interface ButtonProps {
  filled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface FilterDropdownProps {
  title: string;
  filters: Department[] | Priority[];
}

export interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface LabelProps {
  title: string;
  htmlFor: string;
  id?: string;
  ariaLabel?: string;
}

export interface CircleAvatarProps {
  photoSrc: string;
  onRemove?: () => void;
}