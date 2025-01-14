import React from "react";
import Select from "react-select";

function ReactSelect() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div>
      ReactSelect
      <Select
        className="customreact-select-container"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            // primary25: 'red', // hover
            primary50: 'white', // on click color
            neutral20: "white", // border + svg color
            neutral80: "white", // text color
            primary: "red", // selected option + focused outline
            // neutral0: "red", // background color
          },
        })}

        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: "white",
            backgroundColor: "red",
            width: "300px",
          }),
        }}
        options={options}
      />
    </div>
  );
}

export default ReactSelect;

// neutral20: "red", // border + svg color
// neutral80: "red", // text color
// primary: "red", // selected option + focused outline
// neutral0: "red", // background color
