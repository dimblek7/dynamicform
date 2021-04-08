import { atom } from "recoil";


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
  
export const rootFormState = atom({
  key: "rootFormState",
  _default: { number_of_columns: 2, label_positioning: "top" },
  default: {
    id: 0,
    highlighted_form_index: 0,
    forms: [],
    _forms: [
      {
        child_form_id: 0,
        child_form_index: 0,
        form_title: "first",
        number_of_columns: 2,
        label_positioning: "top",
        fields: defaultFields,
      },
      {
        child_form_id: 1,
        child_form_index: 1,
        form_title: "second",
        number_of_columns: 2,
        label_positioning: "top",
        fields: defaultFields,
      },
    ],
  },
});
