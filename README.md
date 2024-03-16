![image](https://github.com/Syed-Muhammad-Owais98/autocomplete-multiselect-dropdown/assets/151091964/12f7d47e-f21a-41ea-8bc1-55f5ae4d7a96)


---

# React Dropdown Component

A customizable, multi-select dropdown component for React applications, featuring search functionality and easy integration. Perfect for projects requiring user selection from a list of options. Built with React Hooks and integrated with Tailwind CSS for styling.

## Features

- **Multi-Select**: Allows selecting multiple items from the dropdown.
- **Search Functionality**: Includes a search input to filter options.
- **Customizable**: Supports various props to customize functionality and appearance.
- **Accessibility**: Designed with accessibility in mind.
- **Tailwind CSS Integration**: Styled with Tailwind CSS for easy customization.

## Installation

Ensure you have Node.js installed on your machine, then clone this repository or download the source code. Navigate to your project directory and run:

```bash
npm install
```

This will install all necessary dependencies for the project.

## Usage

First, import the `DropDown` component into your React application:

```jsx
import DropDown from "./path/to/component/DropDown";
```

Then, you can use the `DropDown` component in your application as follows:

```jsx
import React, { useState } from "react";
import DropDown from "./component/dropdown/DropDown"; // Adjust the path as necessary

const App = () => {
  const [selectedValue, setSelectedValue] = useState([]);

  const data = [
    // Your dropdown options here
  ];

  return (
    <div className="App">
      <DropDown
        fieldTitle="Select Option"
        isMultiSelect={true}
        selectedItems={selectedValue}
        listItems={data}
        onValueSelected={setSelectedValue}
        showDialogTitle={false}
        showDialogButton={true}
        showSearch={true}
      />
    </div>
  );
};

export default App;
```

## Props

| Prop                | Type       | Description                                           |
| ------------------- | ---------- | ----------------------------------------------------- |
| `fieldTitle`        | `string`   | Title of the dropdown field.                          |
| `isMultiSelect`     | `boolean`  | Enables selection of multiple items.                  |
| `selectedItems`     | `array`    | Currently selected items.                             |
| `listItems`         | `array`    | Array of items to display as options.                 |
| `onValueSelected`   | `function` | Callback function invoked when selection changes.     |
| `showDialogTitle`   | `boolean`  | Shows or hides the dialog title.                      |
| `showDialogButton`  | `boolean`  | Shows or hides the dialog button.                     |
| `showSearch`        | `boolean`  | Enables the search functionality.                     |
| `destinationRef`    | `object`   | Reference to the element to render the dropdown menu. |

## Styling

This component is styled using Tailwind CSS. You can customize the appearance by modifying the Tailwind classes within the component or applying custom styles via props.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Licensing

This project is available under the [MIT License](LICENSE.md).

---

Remember to replace placeholder texts like `./path/to/component/DropDown` with the actual path where your component is located and fill in any additional details specific to your project or component functionality.
