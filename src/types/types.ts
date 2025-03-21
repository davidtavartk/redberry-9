export interface Status {
  id: number;
  name: string;
  icon: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
  icon: string;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: Status;
  priority: Priority;
  department: Department;
  employee: Employee;
  total_comments: number;
}

export interface TaskComment {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: TaskComment[]; // ✅ Allow nested comments
}


export type EmployeeFormInputTypes = {
  name: string;
  surname: string;
  department: string;
  avatar: File;
  employee: string;
};

export type CommentFormTypes = {
  text: string;
}

export type TaskFormInputTypes = {
  title: string;
  description: string;
  department: string;
  employee: string;
  priority: string;
  status: string;
  due_date: string;
};


export interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: string;
}
