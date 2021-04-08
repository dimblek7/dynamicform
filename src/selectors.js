import { selector } from "recoil";
import { rootFormState } from "./atoms";

export const highlightedFormSelector = selector({
  key: "highlightedFormSelector",
  get: ({ get }) => {
    const _rootFormState = get(rootFormState);
    const selectedForm = _rootFormState.forms[_rootFormState.highlighted_form_index];
    return selectedForm;
  },
  set: ({ set, get }, newValue) => {
    let _rootFormState = get(rootFormState);
    let _result = {
      ..._rootFormState,
      forms: _rootFormState.forms.map((x, i) =>
        _rootFormState.highlighted_form_index == i
          ? {
              ...x,
              ...newValue,
            }
          : x
      ),
    };
    set(rootFormState, _result);
  },
});

export const rootFormSelector = selector({
  key: "rootFormSelector",
  get: ({ get }) => {
    const _rootFormState = get(rootFormState);
    return _rootFormState;
  },
  set: ({ set }, newValue) => {
      set(rootFormState, newValue)
    },
});
