import api, { personalToken } from "./apiClient";

interface EmployeePayload {
  name: string;
  surname: string;
  avatar: File;
  department_id: number;
}

// interface CreateEmployeeResponse {
//   id: number;
//   name: string;
//   surname: string;
//   avatar_url: string;
//   department_id: number;
// }

export const createEmployee = async (employeeData: EmployeePayload): Promise<string> => {
    try {  
        const response = await api.post<string>("/employees", employeeData, {
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
  