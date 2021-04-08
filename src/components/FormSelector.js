import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { useRecoilState } from "recoil";
import { highlightedFormSelector, rootFormSelector } from "../selectors";

export const FormSelector = ({ selectOnly }) => {
  const [highlightedForm, sethighlightedForm] = useRecoilState(highlightedFormSelector);
  const [rootForm, setrootForm] = useRecoilState(rootFormSelector);
  const [new_form_name, setnew_form_name] = useState("");

  return (
    <div className="row">
      <div className="col-md-12 d-flex justify-content-center">
        {rootForm.forms.map((x, i) => (
          <>
            <button
              className={`m-1 btn btn${rootForm.highlighted_form_index == i ? "-primary" : "-secondary"}`}
              onClick={() => {
                setrootForm({
                  ...rootForm,
                  highlighted_form_index: i,
                });
              }}
            >
              {x.form_title}
            </button>
            {rootForm.highlighted_form_index != i && !selectOnly && <button
              className="m-1 btn btn-sm btn-outline-secondary"
              onClick={() => setrootForm({ ...rootForm, forms: rootForm.forms.filter((x, j) => j != i) })}
            >
              X
            </button>}
          </>
        ))}
        {!selectOnly && <Popup
          modal={true}
          onClose={() => {
            setnew_form_name("");
          }}
          trigger={<button className="m-1 btn btn-outline-secondary">Add form</button>}
        >
          <div className="d-flex justify-content-center p-3 border rounded">
            <input type="text" onChange={(e) => setnew_form_name(e.target.value)} value={new_form_name} />
            <button
              className="ml-2"
              onClick={() => {
                setrootForm({
                  ...rootForm,
                  forms: [
                    ...rootForm.forms,
                    {
                      id: rootForm.forms.length,
                      child_form_id: rootForm.forms.length,
                      child_form_index: rootForm.forms.length,
                      form_title: new_form_name,
                      number_of_columns: 2,
                      label_positioning: "top",
                      fields: defaultFields,
                    },
                  ],
                });
                setnew_form_name("");
              }}
            >
              submit
            </button>
          </div>
        </Popup>}
      </div>
    </div>
  );
};

export default FormSelector;

const defaultFields = [
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
