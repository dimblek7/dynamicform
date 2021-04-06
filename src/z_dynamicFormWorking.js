import * as React from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

const defaultArray = [
  {
    id: "firstname",
    name: "firstname",
    type: "text",
    firstname: "firstname_value",
  },
  { id: "age", name: "age", type: "number", age: 782 },
  // { id: "799ca414-8b9b-4326-b77c-968b316b3c3e", firstName: "append value", checkbox: false },
  // { id: "74d338c2-f2c0-4e20-bbb5-6f2ae903c8d0", firstName: "append value", checkbox: false },
  // { id: "01812c0d-b9f3-4d6a-a14e-403245d6388b", firstName: "append value" },
];

export default function App() {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      test: defaultArray,
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>{JSON.stringify(fields)}</div>
      {fields.map((field, index) => {
        const { type } = field;

        const getField = () => {
          switch (type) {
            case "text":
              return (
                <section key={field.id}>
                  <Controller
                    control={control}
                    name={`test.${index}.${field.name}`}
                    render={({ field }) => <input type="text" {...field} />}
                    defaultValue={field.firstname}
                  />
                </section>
              );
            case "number":
              return (
                <section key={field.id}>
                  <Controller
                    control={control}
                    name={`test.${index}.${field.name}`}
                    render={({ field }) => <input type="number" {...field} />}
                    defaultValue={field.firstname}
                  />
                </section>
              );
            case "default":
              return null;
          }
        };

        return (
          <section key={field.id}>
            <Controller
              control={control}
              name={`test.${index}.${field.name}`}
              render={({ field }) => getField()}
              defaultValue={field.firstname}
            />
          </section>
        );
      })}
      <input type="submit" />
      <Viewer control={control} />
    </form>
  );
}

const Viewer = ({ control }) => {
  const value = useWatch({
    name: "test",
    control,
  });
  return <span>{JSON.stringify(value)}</span>;
};
