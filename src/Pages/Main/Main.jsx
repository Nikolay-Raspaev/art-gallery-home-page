import React, { useState, useEffect } from "react";
import logo from "../../svg/logo.svg";
import Select2 from "../../compnents/UI/Select/WorkerSelect/Select2";
import SelectForInput from "../../compnents/UI/Select/SelectForInput/SelectForInput";
import Input from "../../compnents/UI/Input/Input";

function Main() {
  const host = "https://test-front.framework.team";

  const [paintingName, setPaintingName] = useState("");

  const [paintings, setPaintings] = useState([]);

  const [authors, setAuthors] = useState([]);

  const [selectedAuthorID, setSelectedAuthorId] = useState(0);

  const [locations, setLocations] = useState([]);

  const [selectedLocationId, setSelectedLocationId] = useState(0);

  const [page, setPage] = useState(1);

  const [dateValue, setDateValue] = useState({ from: 0, to: 0 });

  useEffect(() => {
    getPaintings().then((data) => setPaintings(data));
    getAuthors().then((data) => setAuthors(data));
    getLocations().then((data) => setLocations(data));
    console.log(
      selectedAuthorID,
      selectedLocationId,
      paintingName,
      dateValue,
      page
    );
  }, [selectedAuthorID, selectedLocationId, paintingName, dateValue, page]);

  useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
    getLocations().then((data) => setLocations(data));
  }, []);

  const getTestPaintings = async function () {
    const response = await fetch(host + "/paintings?_page=2&_limit=12");
    const data = await response.json();
    return data;
  };

  const getPaintings = async function () {
    var url = `${host}/paintings?_page=${page}&_limit=12${
      selectedAuthorID ? `&authorId=${selectedAuthorID}` : ""
    }${
      selectedLocationId
        ? `&anyObjectField=locationId&locationId=${selectedLocationId}`
        : ""
    }${paintingName ? `&anyObjectField=name&name=${paintingName}` : ""}${
      dateValue.from ? `&created_gte=${dateValue.from}` : ""
    }${dateValue.to ? `&created_lte=${dateValue.to}` : ""}`;
    const response = await fetch(url);
    console.log(url);
    const data = await response.json();
    return data;
  };

  const getAuthors = async function () {
    const response = await fetch(host + "/authors");
    const data = await response.json();
    return data;
  };

  const getLocations = async function () {
    const response = await fetch(host + "/locations");
    const data = await response.json();
    return data;
  };

  const [showInputs, setShowInputs] = useState(false);

  const handleTagClick = () => {
    setShowInputs(true);
  };

  return (
    <div className="page">
      <img src={logo} className="page__logo" alt="Framework Team Logo"></img>
      <div className="page__filter">
        <Input
          value={paintingName}
          placeholder="Name"
          onChange={(event) => setPaintingName(event.target.value)}
        />
        <Select2
          value={selectedAuthorID}
          selectedName="name"
          setValue={setSelectedAuthorId}
          defaultValue="Author"
          options={authors}
        />
        <Select2
          value={selectedLocationId}
          selectedName="location"
          setValue={setSelectedLocationId}
          defaultValue="Location"
          options={locations}
        />
        <SelectForInput value={dateValue} setValue={setDateValue} />
      </div>
      <div className="page__catalog">
        {paintings?.map((painting, index) => (
          <div className="catalog__painting" key={painting.id}>
            <img
              src={host + painting.imageUrl}
              alt={painting.name}
              className="catalog__painting__img"
            />
            <div className="catalog__painting_overlay">
              <p className="painting__name">
                <b>{painting.name}</b>
              </p>
              <div className="painting__field">
                <p>
                  <b>Author:</b> {painting.authorId}
                </p>
                <p>
                  <b>Created:</b> {painting.created}
                </p>
                <p>
                  <b>Location:</b> {painting.locationId}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
