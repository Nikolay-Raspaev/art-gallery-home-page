import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../UI/Input/Input";
import SelectForInput from "../UI/Select/SelectForInput/SelectForInput";
import Select2 from "../UI/Select/WorkerSelect/Select2";

const Filter = (props) => {
  return (
    <div className="page__filter">
      <Input
        isThemeLight={props.isThemeLight}
        value={props.paintingName}
        placeholder="Name"
        onChange={(event) => props.setPaintingName(event.target.value)}
      />
      <Select2
        isThemeLight={props.isThemeLight}
        value={props.selectedAuthorID}
        selectedName="name"
        setValue={props.setSelectedAuthorId}
        defaultValue="Author"
        options={props.authors}
      />
      <Select2
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
