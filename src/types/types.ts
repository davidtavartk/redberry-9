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
  priority: string;
  employee: string;
};


// export interface Employee {
//   id: number;
//   name: string;
//   surname: string;
//   avatar: string;
//   department_id: string;
// }
