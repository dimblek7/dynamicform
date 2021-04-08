import React from "react";
import CreatableSelect from "react-select";
import DynamicForm from "./components/DynamicForm";
import FieldsCreator from "./components/FieldsCreator";
import FormSelector from "./components/FormSelector";
import ParentForm from "./components/ParentForm";

export default function App() {
  return (
    <div>
      in-app
      <FormSelector />
      <ParentForm />
      <div className="row">
        <DynamicForm />
        <FieldsCreator />
      </div>
    </div>
  );
}
