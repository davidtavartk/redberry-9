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
  department_id: string;
}
