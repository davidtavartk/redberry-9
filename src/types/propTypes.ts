import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { Department, Priority, EmployeeFormInputTypes, TaskFormInputTypes, Task, TaskComment, Employee } from "./types";

export interface ButtonProps {
  filled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface TaskStatusProps {
  className: string;
  status: string;
  tasks: Task[];
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
  isRequired?: boolean;
}

export interface CircleAvatarProps {
  photoSrc: string;
  size?: number;
  onRemove?: () => void;
}

export interface CustomFormProps {
  close: () => void;
}

export interface EntityDropdownProps<T extends keyof (EmployeeFormInputTypes | TaskFormInputTypes) | "priority" | "status"> {
  name: T;
  selectedEntity: string | number | null;
  className?: string;
  entities: { id: number; name: string }[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setValue: (name: T, value: string, options?: { shouldValidate: boolean }) => void;
  dropdownWidth?: number;
}

export interface CardProps {
  task: Task;
  className?: string;
}

export interface CommentsCardProps {
  taskId: number;
}

export interface EachCommentProps {
  isChildComment?: boolean;
  comment: TaskComment;
}

export interface FilterCircleProps {
  filter: string;
  onRemove: () => void;
}

export interface FilterContainerProps {
  departments: Department[];
  priorities: Priority[];
  employees: Employee[];
}

export interface CustomDatePickerProps {
  setValue: UseFormSetValue<TaskFormInputTypes>;
  trigger: UseFormTrigger<TaskFormInputTypes>;
}