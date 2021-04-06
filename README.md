1. Create a page that allows you to create/edit a form.
2. This page should have the following fields 
    - Form title, Label positioning, and number of columns.
3. It should have the ability to add new fields to the form as indicated below.
4. There is a preconfigured list of fields that can be added to the form. 
    Assume it comes from a json file for the poc.
5. Each field can contain the following configuration - 
    - Field Type (input, label, dropdown, check box, radio button), 
    Label, size in pixels, column position, Is Required (yes/no), 
    validation criteria { this might need some UI design work } 
    (depends on the field type - for example if the type is input, what is the regex to validate)
6. It should have a dynamic preview option as how the form looks when you add more fields.
7. A submit button should be automatically added to the form, 
    which will just do the form validation as part of the poc.