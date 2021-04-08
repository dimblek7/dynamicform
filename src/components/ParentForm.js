import React from "react";
import { Controller, useForm } from "react-hook-form";
import { selector, useRecoilState } from "recoil";
import { rootFormState } from "../atoms";
import {highlightedFormSelector, rootFormSelector} from "../selectors";

export default function Wrapper() {
  const [highlightedForm, sethighlightedForm] = useRecoilState(highlightedFormSelector);

  // refresher
  // const [refresh_form, setrefresh_form] = React.useState(false);
  // React.useEffect(() => {
  //   setrefresh_form(false);
  //   setTimeout(() => {
  //     setrefresh_form(true);
  //   }, 1);
  // }, [highlightedForm]);

  if (!highlightedForm) {
    return null;
  }
  return <ParentForm />
}

function ParentForm() {
  const [highlightedForm, sethighlightedForm] = useRecoilState(highlightedFormSelector);

  const { control, handleSubmit, watch, errors, register, setValue } = useForm({
    defaultValues: highlightedForm
  });

  React.useEffect(() => {
    setValue('form_title', highlightedForm.form_title);
    setValue('number_of_columns', highlightedForm.number_of_columns);
    setValue('label_positioning', highlightedForm.label_positioning);
  }, [highlightedForm]);

  const onSubmit = (data) => {
    sethighlightedForm(data);
  };

  return (
    <div className="row form-parent">
      <form key="parent-form" onSubmit={handleSubmit(onSubmit)} className="col-md-12 m-2">
        <h3>Create new form</h3>
        <div className="row">
          <Controller
            control={control}
            name="form_title"
            required={true}
            render={({ field }) => (
              <div className="col-md-3 p-1 m-2">
                <label>Title</label>
                <br />
                <input className="w-75 p-2"type="text" {...field} />
              </div>
            )}
            defaultValue=""
          />
          {errors && errors.form_title && "required"}
          <Controller
            control={control}
            name="number_of_columns"
            required={true}
            render={({ field }) => (
              <div className="col-md-3 p-1 m-2">
                <label>Number of fields in row</label>
                <br />
                <input className="w-75 p-2" type="number" {...field} />
              </div>
            )}
            defaultValue=""
          />
          {errors && errors.number_of_columns && "required"}
          <Controller
            control={control}
            name="label_positioning"
            required={true}
            render={({ field }) => (
              <div className="col-md-3 p-1 m-2">
                <label>Label position</label>
                <br />
                <select className="w-75 p-2" name="label_positioning" {...field}>
                  <option value="">Select</option>
                  <option value="top">Top</option>
                  <option value="left">Left</option>
                </select>
              </div>
            )}
            defaultValue=""
          />
          {errors && errors.label_positioning && "required"}
          <div className="col-md-2 p-1 m-2">
            <input className="w-75 p-2 mt-3" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
