import { useRouter } from "next/router";
import React from "react";

const TaskPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Task Page: {id}</h1>
    </div>
  );
};

export default TaskPage;
