import * as React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const ConditionalInput = ({ control, index, field }) => {
  const value = useWatch({
    name: "test",
    control,
  });

  return (
    <Controller
      control={control}
      name={`test.${index}.firstName`}
      render={({ field }) => (value?.[index]?.checkbox === "on" ? <input {...field} /> : null)}
      defaultValue={field.firstName}
    />
  );
};

const defaultArray = [
  { id: "7227979c-e6b6-4091-b7e4-d5dbcf24343f", firstName: "appnewend valuess", checkbox: "on" },
  { id: "92aa1402-eb89-4cd2-ab99-eaef86be494d", firstName: "append value", checkbox: "on" },
  { id: "799ca414-8b9b-4326-b77c-968b316b3c3e", firstName: "append value", checkbox: false },
  { id: "74d338c2-f2c0-4e20-bbb5-6f2ae903c8d0", firstName: "append value", checkbox: false },
  { id: "01812c0d-b9f3-4d6a-a14e-403245d6388b", firstName: "append value" },
];

export default function App() {
  const { handleSubmit, control, register } = useForm({
    defaultValues : {
      test: defaultArray
    }
  });
  const { fields, append, prepend } = useFieldArray({
    control,
    name: "test",
  });
  console.log("fields: ", fields);
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <section key={field.id}>
          <input type="checkbox" value="on" {...register(`test.${index}.checkbox`)} defaultChecked={field.checked} />
          <ConditionalInput {...{ control, index, field }} />
        </section>
      ))}

      <button type="button" onClick={() => append({ firstName: "append value" })}>
        append
      </button>
      <input type="submit" />
    </form>
  );
}
