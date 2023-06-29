import React from "react";
import Input from "../UI/Input/Input";
import SelectForInput from "../UI/Selects/SelectForInput/SelectForInput";
import Select from "../UI/Selects/Select/Select";
import s from "./Filter.module.scss";

const Filter = (props) => {
  return (
    <div className={s.page__filter}>
      <Input
        isThemeLight={props.isThemeLight}
        value={props.paintingName}
        placeholder="Name"
        onChange={(event) => props.setPaintingName(event.target.value)}
      />
      <Select
        isThemeLight={props.isThemeLight}
        value={props.selectedAuthorID}
        selectedName="name"
        setValue={props.setSelectedAuthorId}
        defaultValue="Author"
        options={props.authors}
      />
      <Select
        isThemeLight={props.isThemeLight}
        value={props.selectedLocationId}
        selectedName="location"
        setValue={props.setSelectedLocationId}
        defaultValue="Location"
        options={props.locations}
      />
      <SelectForInput
        isThemeLight={props.isThemeLight}
        value={props.dateValue}
        setValue={props.setDateValue}
      />
    </div>
  );
};

export default Filter;
