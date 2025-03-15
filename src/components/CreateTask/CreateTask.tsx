import { useForm } from "react-hook-form";

type FormInputTypes = {
    title: string;
    department: string;
    description: string;
    responsible_employee: string;
  };

const CreateTask = () => {

    const {
        register,
        handleSubmit,

        formState: { errors },
      } = useForm<FormInputTypes>();

      const onSubmit = (data: FormInputTypes) => {
        console.log(data);
      }

    return (
        <div className="bg-[#DDD2FF] border-[0.3px] border-[#DDD2FF] rounded-sm p-4">
             <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex h-full flex-col justify-between">

             </form>
            
        </div>
    );
};

export default CreateTask;