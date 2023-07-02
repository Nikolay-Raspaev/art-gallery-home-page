import React, { useState, useEffect, useMemo } from "react";
import logo from "../../svg/logo.svg";
import sun_white from "../../svg/sun-white.svg";
import sun_black from "../../svg/sun-black.svg";
import PaintingList from "./components/PaintingList/PaintingList";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import {
  useCreatePaginationPages,
  useReplaceFieldsIdInPaintings,
} from "./hooks/useMain";
import QueryService from "./API/QueryService";

const Main = (props) => {
  const host = "https://test-front.framework.team";

  const [paintingName, setPaintingName] = useState("");

  const [paintings, setPaintings] = useState([]);

  const [authors, setAuthors] = useState([]);

  const [selectedAuthorID, setSelectedAuthorId] = useState(0);

  const [locations, setLocations] = useState([]);

  const [selectedLocationId, setSelectedLocationId] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 12;

  const [totalCount, setTotalCount] = useState(0);

  const [dateValue, setDateValue] = useState({ from: "", before: "" });

  const newPaintings = useReplaceFieldsIdInPaintings(
      paintings,
      authors,
      locations
  );

  const countPages = useMemo(() => {
    return Math.ceil(totalCount / perPage);
  }, [totalCount, perPage]);

  const paginationPages = useCreatePaginationPages(countPages, currentPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAuthorID, selectedLocationId, paintingName, dateValue]);

  useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
    getLocations().then((data) => setLocations(data));
  }, []);

  useEffect(() => {
    getPaintings();
  }, [
    selectedAuthorID,
    selectedLocationId,
    paintingName,
    dateValue,
    currentPage,
  ]);

  const getPaintings = async () => {
    const response = await QueryService.getPaintings(host, currentPage, perPage, selectedAuthorID, selectedLocationId, paintingName,dateValue);
    setPaintings(response.data);
    setTotalCount(parseInt(response.headers.get("x-total-count")));
  };

  const getAuthors = async () => {
    const response = await fetch(host + "/authors");
    return await response.json();
  };

  const getLocations = async () => {
    const response = await fetch(host + "/locations");
    return await response.json();
  };

  return (
    <div className={props.isThemeLight ? "page page__light" : "page page__dark"}>
      <div className="page__svg">
        <img src={logo} className="page__svg__logo" alt="Framework Team Logo" />
        {props.isThemeLight ? (
          <img
            src={sun_black}
            className="page__svg__switch"
            alt="Switch Theme"
            onClick={() => props.handleThemeChange(!props.isThemeLight)}
          />
        ) : (
          <img
            src={sun_white}
            className="page__svg__switch"
            alt="Switch Theme"
            onClick={() => props.handleThemeChange(!props.isThemeLight)}
          />
        )}
      </div>
      <Filter
        isThemeLight={props.isThemeLight}
        paintingName={paintingName}
        setPaintingName={setPaintingName}
        selectedAuthorID={selectedAuthorID}
        setSelectedAuthorId={setSelectedAuthorId}
        authors={authors}
        selectedLocationId={selectedLocationId}
        setSelectedLocationId={setSelectedLocationId}
        locations={locations}
        dateValue={dateValue}
        setDateValue={setDateValue}
      />
      <PaintingList paintings={newPaintings} host={host} />
      <Pagination
        isThemeLight={props.isThemeLight}
        currentPage={currentPage}
        countPages={countPages}
        setCurrentPage={setCurrentPage}
        paginationPages={paginationPages}
      />
    </div>
  );
};

export default Main;
