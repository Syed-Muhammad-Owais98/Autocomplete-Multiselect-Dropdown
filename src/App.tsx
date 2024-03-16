import React, { useEffect, useRef, useState } from "react";
import DropDown from "./component/dropdown/dropdown";
import { State } from "./component/dropdown/interface";

const data = [
  {
    id: 0,
    name: "Active",
  },
  {
    id: 2,
    name: "Hidden ",
  },
  {
    id: 3,
    name: "Reminder",
  },
  {
    id: 6,
    name: "Paid ",
  },
  {
    id: 7,
    name: "Settled ",
  },
  {
    id: 8,
    name: "Debt collection",
  },
  {
    id: 11,
    name: "Protected ",
  },
  {
    id: 21,
    name: "Active - handled manually",
  },
  {
    id: 23,
    name: "Active - System",
  },
];

const App = () => {
  const [state, setState] = useState<State>({
    selectedValue: [],
  });
  const destinationRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App bg-gray-50 min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-400 shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Select Status
        </h2>

        <DropDown
          fieldTitle="Status"
          isMultiSelect={true}
          selectedItems={state.selectedValue}
          listItems={data}
          onValueSelected={(values) => {
            const newState = {
              ...state,
            };
            newState.selectedValue = values;
            setState(newState);
          }}
          showDialogTitle={false}
          showDialogButton={true}
          showSearch={true}
          destinationRef={destinationRef}
        />
      </div>
    </div>
  );
};

export default App;
