import React, { useEffect, useState } from "react";
import logo from "../../svg/logo.svg";
import { ReactComponent as Sun } from "../../svg/sun.svg";
import PaintingList from "./components/PaintingList/PaintingList";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import { useReplaceFieldsIdInPaintings } from "./hooks/useMain";
import QueryService from "./API/QueryService";
import { useFetching } from "./hooks/useFetching";
import { getPageCount } from "./components/utils/pages";

const Main = (props) => {
  const host = "https://test-front.framework.team";

  const [paintingName, setPaintingName] = useState("");

  const [paintings, setPaintings] = useState([]);

  const [authors, setAuthors] = useState([]);

  const [selectedAuthorID, setSelectedAuthorId] = useState(0);

  const [locations, setLocations] = useState([]);

  const [selectedLocationId, setSelectedLocationId] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(12);

  const [totalPages, setTotalPages] = useState(0);

  const [dateValue, setDateValue] = useState({ from: "", before: "" });

  const newPaintings = useReplaceFieldsIdInPaintings(
    paintings,
    authors,
    locations
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAuthorID, selectedLocationId, paintingName, dateValue]);

  useEffect(() => {
    getAuthors();
    getLocations();
  }, []);

  useEffect(() => {
    fetchPaintings();
  }, [
    selectedAuthorID,
    selectedLocationId,
    paintingName,
    dateValue,
    currentPage,
  ]);

  const [fetchPaintings, paintingError, isLoaded] = useFetching(async () => {
    const response = await QueryService.getPaintings(
      host,
      currentPage,
      limit,
      selectedAuthorID,
      selectedLocationId,
      paintingName,
      dateValue
    );
    setPaintings(response.data);
    const totalCount = response.headers.get("x-total-count");
    setTotalPages(getPageCount(totalCount, limit));
  });

  const getAuthors = async () => {
    const authors = await QueryService.getAuthors(host);
    setAuthors(authors);
  };

  const getLocations = async () => {
    const locations = await QueryService.getLocations(host);
    setLocations(locations);
  };

  return (
    <div
      className={props.isThemeLight ? "page page__light" : "page page__dark"}
    >
      <div className="page__svg">
        <img src={logo} className="page__svg__logo" alt="Framework Team Logo" />
        <Sun onClick={() => props.handleThemeChange(!props.isThemeLight)} />
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
      {paintingError && (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Произошла ошибка {paintingError}
        </h1>
      )}
      <PaintingList paintings={newPaintings} host={host} isLoaded={isLoaded} />
      {newPaintings.length !== 0 && (
        <Pagination
          isThemeLight={props.isThemeLight}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Main;
