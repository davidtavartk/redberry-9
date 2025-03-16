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
}

export type EmployeeFormInputTypes = {
  name: string;
  surname: string;
  department: string;
  avatar: File;
  employee: string;
};

export type TaskFormInputTypes = {
  title: string;
  description: string;
  department: string;
  employee: string;
  priority: string;
  status: string;
};


// export interface Employee {
//   id: number;
//   name: string;
//   surname: string;
//   avatar: string;
//   department_id: string;
// }
