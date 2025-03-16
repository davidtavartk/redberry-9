import api, { personalToken } from "./apiClient"; // Import personalToken

interface EmployeePayload {
  name: string;
  surname: string;
  avatar: File;
  department_id: number;
}

interface CreateEmployeeResponse {
  id: number;
  name: string;
  surname: string;
  avatar_url: string;
  department_id: number;
}

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await api.get<Employee[]>("/employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const createEmployee = async (employeeData: EmployeePayload): Promise<any> => {
    try {  
        const response = await api.post<any>("/employees", employeeData, {
        headers: {
          Authorization: `Bearer ${personalToken}`,
        },
      });
      console.log("AXIOS REQUEST", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  };
  