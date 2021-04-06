import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { parentFormState } from "./ParentForm";
// import * as React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const ControllerInput = ({ control, index, field }) => {
  const value = useWatch({
    name: "test",
    control,
  });

  return (
    <Controller
      control={control}
      name={`test.${index}.label`}
      render={({ field }) => {
        return <input className="ml-2" {...field} placeholder="label" />;
      }}
      defaultValue={field.label}
    />
  );
};

const ControllerID = ({ control, index, field }) => {
  const value = useWatch({
    name: "test",
    control,
  });

  return (
    <Controller
      control={control}
      name={`test.${index}.id`}
      render={({ field }) => {
        return <input className="d-none" {...field} placeholder="id" />;
        // return (value?.[index]?.checkbox === "on" ? <input {...field}  placeholder="id" /> : null)
      }}
      defaultValue={field.id}
    />
  );
};

const ControllerRegex = ({ control, index, field }) => {
  const value = useWatch({
    name: "test",
    control,
  });

  return (
    <Controller
      control={control}
      name={`test.${index}.regex`}
      render={({ field }) => <input className="ml-2" {...field} placeholder="regex" />}
      defaultValue={field.regex}
    />
  );
};

const ControllerRequired = ({ control, index, field }) => {
  const value = useWatch({
    name: "test",
    control,
  });

  return (
    <Controller
      control={control}
      name={`test.${index}.required`}
      render={({ field }) => (
        <>
          <input type="checkbox" placeholder="required" defaultChecked={field.required} {...field} />
          <label for={field.name} {...field}>
            required
          </label>
        </>
      )}
      defaultValue={field.required}
    />
  );
};

const ControllerSelect = ({ control, index, field }) => {
  const value = useWatch({
    name: "test",
    control,
  });

  return (
    <Controller
      control={control}
      name={`test.${index}.type`}
      render={({ field }) => (
        <select className="ml-2" {...field} placeholder="type" value={field.type}>
          <option value=""></option>
          {[
            { value: "text" },
            { value: "number" },
            { value: "dropdown" },
            { value: "checkbox" },
            { value: "radio" },
            { value: "label" },
          ].map((opt) => (
            <option value={opt.value}>{opt.value}</option>
          ))}
        </select>
      )}
      defaultValue={field.type}
    />
  );
};

const defaultArray = [
  {
    id: "id1",
    type: "text",
    label: "text1",
    required: true,
    regex: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
  },
  { id: "id2", type: "number", label: "number1", required: false, regex: "^[1-9][0-9]?$|^100$" },
  { id: "id3", type: "dropdown", label: "dropdown1", required: false, regex: "" },
  { id: "id4", type: "checkbox", label: "checkbox1", required: false, regex: "" },
  { id: "id5", type: "radio", label: "radio1", required: false, regex: "" },
  { id: "id6", type: "label", label: "label1", required: false, regex: "" },
];

export default function FormCreator() {
  const [parentForm, setparentForm] = useRecoilState(parentFormState);
  const { handleSubmit, control, register, watch } = useForm({
    defaultValues: {
      test: defaultArray,
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmit = (data) => {
    console.log("data: ", data);
    setparentForm({ ...parentForm, fields: [...data.test] });
  };

  return (
    <form key="form-creator" onSubmit={handleSubmit(onSubmit)}>
      <h3>Fields</h3>
      {fields.map((field, index) => (
        <section key={field.id}>
          <ControllerID {...{ control, index, field }} />
          <ControllerRequired {...{ control, index, field }} />
          <ControllerSelect {...{ control, index, field }} />
          <ControllerInput {...{ control, index, field }} />
          <ControllerRegex {...{ control, index, field }} />

          <button className="ml-2" type="button" onClick={() => remove(index)}>
            Delete
          </button>
        </section>
      ))}

      <button type="button" onClick={() => append({ label: "", type: "", regex: "", id: "id" + (fields.length + 1) })}>
        append
      </button>
      <input type="submit" />
    </form>
  );
}

// export const FormCreator = (props) => {
//   const [parentForm, setparentForm] = useRecoilState(parentFormState);

//   const { control, handleSubmit, watch, errors, register } = props;

//   const onSubmit = (data) => {
//     setparentForm({ ...parentForm, ...data });
//   };

//   useEffect(() => {
//     console.log("parentForm: ", parentForm);
//   }, [parentForm]);

//   return (
//     <div className="col-md-6">
//       <div className="m-2">
//         <h3>UseFieldArray to create dynamic form</h3>
//         <div>
//           {parentForm && parentForm.form_title} {JSON.stringify(parentForm)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormCreator;
