import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: (provided, state) => ({
    ...provided,
    width: "80%",
    padding: "5px 0", 
    backgroundColor: "#141416",
    borderWidth:"2px",
    borderStyle: "solid",
    borderRadius: 12,
    fontWeight: "600",
    borderColor: state.isFocused ? "fff" : "#353945",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: state.isFocused ? "#aaa" : "#aaa"
    }
  }),
  input: (provided, state) => ({
    ...provided,
    color: "#fff",
    fontSize: 16
  }),
  multiValue:(provided, state) => ({
    ...provided,
    border:"2px solid #353945",
    backgroundColor: "#141416",
    color: "#fff"
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#fff"
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    "&:hover": {
      backgroundColor:"#fff",
      color: "#000"
    }
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, color: "#fff", opacity, transition };
  }
}
export default class CreatableInputOnly extends Component {
  state = {
    inputValue: '',
    value: [],
  };
  handleChange = (value, actionMeta) => {
    this.setState({ value });
  };
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Enter Tags"
        value={value}
        className="btcnft"
        styles={customStyles}
      />
    );
  }
}
