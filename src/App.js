import React from "react";
import { useForm } from "react-hook-form";
import FormCreator from "./components/FormCreator";
import DynamicForm from "./components/DynamicForm";
// import DynamicForm from "./z_dynamicFormWorking";
import ParentForm from "./components/ParentForm";

export default function App() {
  const { control, handleSubmit, watch, errors, register } = useForm();
  const _props = { control, handleSubmit, watch, errors, register };

  return (
    <div>
      in-app
      <ParentForm {..._props} />
      <div className="row">
        <DynamicForm {..._props} />
        <FormCreator {..._props} />
      </div>
    </div>
  );
}
