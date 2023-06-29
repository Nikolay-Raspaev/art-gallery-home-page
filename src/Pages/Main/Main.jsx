import React, { useState, useEffect } from "react";
import logo from "../../svg/logo.svg";
import sun_white from "../../svg/sun-white.svg";
import sun_black from "../../svg/sun-black.svg";
import Select2 from "../../components/UI/Select/WorkerSelect/Select2";
import SelectForInput from "../../components/UI/Select/SelectForInput/SelectForInput";
import Input from "../../components/UI/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PaintingList from "../../components/PaintingList/PaintingList";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
//import Pagination from "../../components/UI/Pagination/Pagination";

function Main() {
  const host = "https://test-front.framework.team";

  const [paintingName, setPaintingName] = useState("");

  const [paintings, setPaintings] = useState([]);

  const [newPaintings, setNewPaintings] = useState([]);

  const [authors, setAuthors] = useState([]);

  const [selectedAuthorID, setSelectedAuthorId] = useState(0);

  const [locations, setLocations] = useState([]);

  const [selectedLocationId, setSelectedLocationId] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 12;

  const [totalCount, setTotalCount] = useState(0);

  const [dateValue, setDateValue] = useState({ from: "", before: "" });

  const [pages, setPages] = useState([]);

  const maxPage = Math.ceil(totalCount / perPage);

  useEffect(() => {
    createPages(maxPage, currentPage);
  }, [totalCount, currentPage]);

  useEffect(() => {
    getPaintings();
  }, [currentPage]);

  useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
    getLocations().then((data) => setLocations(data));
  }, []);

  useEffect(() => {
    setNewPaintings(createNewPaintings(paintings, authors, locations));
    console.log(newPaintings);
  }, [paintings]);

  useEffect(() => {
    getPaintings();
    setCurrentPage(1);
  }, [selectedAuthorID, selectedLocationId, paintingName, dateValue]);

  const getPaintings = async function () {
    var url = `${host}/paintings?_page=${currentPage}&_limit=${perPage}${
      selectedAuthorID ? `&authorId=${selectedAuthorID}` : ""
    }${
      selectedLocationId
        ? `&anyObjectField=locationId&locationId=${selectedLocationId}`
        : ""
    }${paintingName ? `&anyObjectField=name&name=${paintingName}` : ""}${
      dateValue.from ? `&created_gte=${dateValue.from}` : ""
    }${dateValue.before ? `&created_lte=${dateValue.before}` : ""}`;
    const response = await fetch(url);
    setPaintings(await response.json());
    setTotalCount(await response.headers.get("x-total-count"));
  };

  const createPages = (pagesCount, currentPage) => {
    setPages([]);
    if (pagesCount > 3) {
      if (currentPage > 2) {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          setPages((prevArray) => [...prevArray, i]);
          if (i === pagesCount) break;
        }
      } else {
        for (let i = 1; i <= 3; i++) {
          setPages((prevArray) => [...prevArray, i]);
          if (i === pagesCount) break;
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        setPages((prevArray) => [...prevArray, i]);
      }
    }
  };

  const createNewPaintings = (paintings, authors, locations) => {
    return paintings?.map((painting) => {
      const author = authors.find((author) => author.id === painting.authorId);
      const location = locations.find(
        (location) => location.id === painting.locationId
      );
      if (location.location && author.name) {
        return {
          location: location.location,
          author: author.name,

          ...painting,
        };
      }
      return painting;
    });
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

  const [isThemeLight, setIsThemeLight] = useState();

  function saveThemeToLocalStorage(isLight) {
    localStorage.setItem("isLight", isLight);
  }

  function handleThemeChange(newTheme) {
    setIsThemeLight(newTheme);
    saveThemeToLocalStorage(newTheme);
  }

  function loadThemeFromLocalStorage() {
    const storedIsLight = localStorage.getItem("isLight");
    setIsThemeLight(storedIsLight === "true");
  }

  useEffect(() => {
    loadThemeFromLocalStorage();
  }, []);

  return (
    <div
      className={
        isThemeLight ? "page page__active_light" : "page page__active_dark"
      }
    >
      <div className="page__svg">
        <img src={logo} className="page__svg__logo" alt="Framework Team Logo" />
        {isThemeLight ? (
          <img
            src={sun_black}
            className="page__svg__switch"
            alt="Switch Theme"
            onClick={() => handleThemeChange(!isThemeLight)}
          />
        ) : (
          <img
            src={sun_white}
            className="page__svg__switch"
            alt="Switch Theme"
            onClick={() => handleThemeChange(!isThemeLight)}
          />
        )}
      </div>
      <Filter
        isThemeLight={isThemeLight}
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
        isThemeLight={isThemeLight}
        currentPage={currentPage}
        maxPage={maxPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
    </div>
  );
}

export default Main;
