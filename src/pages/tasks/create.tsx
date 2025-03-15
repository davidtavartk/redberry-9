import CreateTask from "@/components/CreateTask/CreateTask";
import React from "react";

const CreateTaskPage = () => {
  return (
    <div className="flex flex-col mx-auto h-full px-[120px]">
      <h1 className="text-[34px] font-semibold text-[#212529] mt-16">შექმენი ახალი დავალება</h1>
      <CreateTask />
    </div>
  );
};

export default CreateTaskPage;
