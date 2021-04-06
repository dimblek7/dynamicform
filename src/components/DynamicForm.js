import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { selector, useRecoilValue } from "recoil";
import { parentFormState } from "./ParentForm";
let counter = 0;

function escapeRegExp(string) {
  // const _result = new RegExp(string.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&"))
  // const _result = new RegExp(escapeStringRegexp(string));
  // const _result = new RegExp(string, "i");
  const _result = new RegExp(string);
  console.log(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  return _result;
}

const parentFormStateSelector = selector({
  key: "parentFormStateSelector", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    // run DS login and create algorithm
    counter++;
    const text = get(parentFormState);
    const fields = (text.fields || []).map((field) => ({
      ...field,
      rules: {
        required: field.required,
        pattern: field.regex
          ? {
              value: escapeRegExp(field.regex),
              message: "invalid",
            }
          : null,
      },
      name: field.id,
      [field.label]: null,
      [field.id]: null,
    }));
    return { ...text, fields, counter };
  },
});

export default function Wrapper() {
  const [refresh_form, setrefresh_form] = React.useState(false);
  const parentForm = useRecoilValue(parentFormStateSelector);

  useEffect(() => {
    setrefresh_form(false);
    setTimeout(() => {
      setrefresh_form(true);
    }, 100);
  }, [parentForm]);

  return (
    <div className="col-md-6">
      <div className="m-2">
        <h3>Form Preview</h3>
        {/* <h6>Title: {parentForm.form_title}</h6>
        <h6>Columns: {parentForm.number_of_columns}</h6>
        <h6>Label position: {parentForm.label_positioning}</h6> */}
        {!!(parentForm && parentForm.fields && parentForm.fields[0] && refresh_form) && <App parentForm={parentForm} />}
      </div>
    </div>
  );
}

const formSchema = {
  id1: yup.string().required("form.required_message"),
};

const fieldsSchema = yup.object().shape({
  test: yup.array().of(yup.object().shape(formSchema)).required("Must have fields").min(1, "Minimum of 1 field"),
});

function App({ parentForm }) {
  const [number_of_columns, setnumber_of_columns] = useState(2);

  const { handleSubmit, control, register, formState, errors } = useForm({
    defaultValues: {
      test: parentForm.fields,
    },
    // validationSchema: fieldsSchema,
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    control,
    name: "test",
  });

  useEffect(() => {
    console.log("parentForm.fields: ", parentForm.fields);
    setnumber_of_columns(parentForm.number_of_columns || 2);
  }, [parentForm]);

  const onSubmit = (data) => console.log(data);

  console.log("formState.isValid", errors);

  return (
    <form form="dynamic-form" className="row" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        const { type } = field;
        console.log("field: ", field);
        const getField = (_field) => {
          switch (type) {
            case "text":
              return (
                <section key={field.name}>
                  <Controller
                    control={control}
                    name={`test.${index}.${field.name}`}
                    // render={({
                    //   field: { onChange, onBlur, value, name, ref },
                    //   field,
                    //   fieldState: { invalid, isTouched, isDirty, error },
                    //   fieldState,
                    //   formState,
                    // }) => {
                    //   console.log("inside fieldState", error, fieldState);
                    //   return (
                    //     <>
                    //       <input type="text" {...field} inputRef={ref} />
                    //       {!!error && (
                    //         <>
                    //           <br />
                    //           <span className="text-danger">{error && error.message}</span>
                    //         </>
                    //       )}
                    //     </>
                    //   );
                    // }}
                    rules={{ ...field.rules }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input className="w-75" type="text" {...field} />
                        {!!error && (
                          <>
                            <br />
                            <span className="text-danger">{error && error.message}</span>
                          </>
                        )}
                      </>
                    )}
                    defaultValue={field.firstname}
                  />
                </section>
              );
            case "number":
              return (
                <section key={field.name}>
                  <Controller
                    control={control}
                    name={`test.${index}.${field.name}`}
                    rules={{ ...field.rules }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input className="w-75" type="number" {...field} />
                        {!!error && (
                          <>
                            <br />
                            <span className="text-danger">{error && error.message}</span>
                          </>
                        )}
                      </>
                    )}
                    // render={({ field }) => <input className="w-75" type="number" {...field} />}
                    defaultValue={field[field.name]}
                  />
                </section>
              );
            case "dropdown":
              return (
                <section key={field.name}>
                  <Controller
                    control={control}
                    name={`test.${index}.${field.name}`}
                    rules={{ ...field.rules }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <select className="w-75" type="number" {...field}>
                          <option value="">Select</option>
                          <option value="one">one</option>
                          <option value="two">two</option>
                          <option value="three">three</option>
                        </select>
                        {!!error && (
                          <>
                            <br />
                            <span className="text-danger">{error && error.message}</span>
                          </>
                        )}
                      </>
                    )}
                    defaultValue={field[field.name]}
                  />
                </section>
              );
            case "checkbox":
              return (
                <section key={field.name}>
                  <Controller
                    control={control}
                    name={`test.${index}.${field.name}`}
                    rules={{ ...field.rules }}
                    render={({ field }) => {
                      return <input className="w-50" type="checkbox" {...field} />;
                      return (
                        <>
                          <input className="w-75" type="checkbox" {...field} />
                          <label for={field.name} {...field}>
                            {JSON.stringify(field)}
                          </label>
                        </>
                      );
                    }}
                    defaultValue={field[field.name]}
                  />
                </section>
              );
            case "radio":
              return (
                <section key={field.name}>
                  <Controller
                    control={control}
                    name={`test.${index}.${field.name}`}
                    rules={{ ...field.rules }}
                    render={({ field }) => {
                      return (
                        <>
                          {[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                          ].map((option) => (
                            <>
                              <br />
                              <input
                                className="w-25"
                                {...field}
                                type="radio"
                                id={option.value}
                                name={field.name}
                                value={option.value}
                              />
                              <label className="w-25" for={option.value}>
                                {option.label}
                              </label>
                            </>
                          ))}
                        </>
                      );
                    }}
                    defaultValue={field[field.name]}
                  />
                </section>
              );
            case "label":
              return <div {...field}>{field && field.label}</div>;
            default:
              return <section>Invalid field</section>;
          }
        };
        return (
          <div className={`col-md-${Math.abs(12 / number_of_columns)} p-1`}>
            <div className="border rounded p-2 m-1">
              <div className={parentForm.label_positioning === "left" ? "pull-left mr-2" : ""}>
                <strong>{field.label}{!!field.rules.required && "*"}</strong>
              </div>
              <div className={parentForm.label_positioning === "left w-100" ? "" : "w-100"}>{getField(field)}</div>
            </div>
          </div>
        );
      })}
      <div className="col-md-12">
        <input type="submit" />
        <h3>Is form validated: {formState && JSON.stringify(formState.isValid)}</h3>
        {/* <Viewer control={control} /> */}
        <div className="text-secondary">
          {/* DS this JSON to render above form: {JSON.stringify(fields, null, "\t")} */}
          {/* DS this JSON to render above form: {JSON.stringify(parentForm, null, "\t")} */}
        </div>
      </div>
    </form>
  );
}

const Viewer = ({ control }) => {
  const value = useWatch({
    name: "test",
    control,
  });
  return <span className="text-danger">{JSON.stringify(value)}</span>;
};

// export const DynamicForm = (props) => {
//   const { control, handleSubmit, watch, errors, register } = props;

//   useEffect(() => {
//     console.log("DynamicForm", watch()); // watch input value by passing the name of it
//   }, [watch()]);

//   return (
//     <div className="col-md-6">
//       <div className="m-2">
//         <h3>Dynamic form</h3>
//       </div>
//     </div>
//   );
// };

// export default DynamicForm;
