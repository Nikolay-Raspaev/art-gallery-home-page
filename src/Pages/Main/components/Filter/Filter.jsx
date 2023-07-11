import React, {memo} from "react";
import Input from "../UI/Input/Input";
import SelectForInput from "../UI/Selects/SelectForInput/SelectForInput";
import Select from "../UI/Selects/Select/Select";
import s from "./Filter.module.scss";

const Filter = memo((props) => {
  return (
    <div className={s.filter}>
      <Input
        placeholder="Name"
        maxLength={45}
        value={props.paintingName}
        setValue={props.setPaintingName}
      />
      <Select
        value={props.selectedAuthorID}
        selectedName="name"
        setValue={props.setSelectedAuthorId}
        defaultValue="Author"
        options={props.authors}
      />
      <Select
        value={props.selectedLocationId}
        selectedName="location"
        setValue={props.setSelectedLocationId}
        defaultValue="Location"
        options={props.locations}
      />
      <SelectForInput value={props.dateValue} setValue={props.setDateValue} />
    </div>
  );
});

export default Filter;
