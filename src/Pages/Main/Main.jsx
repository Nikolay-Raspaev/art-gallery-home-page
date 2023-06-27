import React, { useState, useEffect } from "react";
import logo from "../../svg/logo.svg";
import sun_white from "../../svg/sun-white.svg";
import sun_black from "../../svg/sun-black.svg";
import Select2 from "../../compnents/UI/Select/WorkerSelect/Select2";
import SelectForInput from "../../compnents/UI/Select/SelectForInput/SelectForInput";
import Input from "../../compnents/UI/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAngleRight } from "@fortawesome/free-solid-svg-icons";
//import Pagination from "../../compnents/UI/Pagination/Pagination";

function Main() {
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

  const [dateValue, setDateValue] = useState({ from: 0, before: 0 });

  const [pages, setPages] = useState([]);

  const maxPage = Math.ceil(totalCount / perPage);

  useEffect(() => {
    createPages(pages, maxPage, currentPage);
    console.log(pages);
  }, [totalCount]);

  useEffect(() => {
    getPaintings();
    getAuthors().then((data) => setAuthors(data));
    getLocations().then((data) => setLocations(data));
    console.log(
      selectedAuthorID,
      selectedLocationId,
      paintingName,
      dateValue,
      currentPage
    );
  }, [
    selectedAuthorID,
    selectedLocationId,
    paintingName,
    dateValue,
    currentPage,
  ]);

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
    // const params = new URLSearchParams();
    // params.append("_page", currentPage);
    // params.append("_limit", perPage);
    // params.append("authorId", selectedAuthorID);
    // params.append("anyObjectField=locationId&locationId", selectedLocationId);
    // params.append("anyObjectField=name&name", paintingName);
    // params.append("created_gte", dateValue.from);
    // params.append("created_lte", dateValue.before);
    // var url2 = `${host}/paintings?${params}`;
    const response = await fetch(url);
    console.log(url);
    setPaintings(await response.json());
    setTotalCount(await response.headers.get("x-total-count"));
  };

  const createPages = (pages, pagesCount, currentPage) => {
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

  const [isThemeLight, setIsThemeLight] = useState(true);

  const funcsetIsThemeDark = () => {
    setIsThemeLight(!isThemeLight);
  };

  console.log(isThemeLight);
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
            onClick={(e) => {
              funcsetIsThemeDark();
            }}
          />
        ) : (
          <img
            src={sun_white}
            className="page__svg__switch"
            alt="Switch Theme"
            onClick={(e) => {
              funcsetIsThemeDark();
            }}
          />
        )}
      </div>
      <div className="page__filter">
        <Input
          isThemeLight={isThemeLight}
          value={paintingName}
          placeholder="Name"
          onChange={(event) => setPaintingName(event.target.value)}
        />
        <Select2
          isThemeLight={isThemeLight}
          value={selectedAuthorID}
          selectedName="name"
          setValue={setSelectedAuthorId}
          defaultValue="Author"
          options={authors}
        />
        <Select2
          isThemeLight={isThemeLight}
          value={selectedLocationId}
          selectedName="location"
          setValue={setSelectedLocationId}
          defaultValue="Location"
          options={locations}
        />
        <SelectForInput
          isThemeLight={isThemeLight}
          value={dateValue}
          setValue={setDateValue}
        />
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
      <div className="pagination">
        <button
          className={
            isThemeLight
              ? "pagination__angel double__left pagination__page_light"
              : "pagination__angel double__left pagination__page_dark"
          }
          disabled={1 === currentPage}
          onClick={(e) => {
            setCurrentPage(1);
          }}
        >
          <FontAwesomeIcon icon={faAnglesRight} rotation={180} />
        </button>
        <button
          className={
            isThemeLight
              ? "pagination__angel pagination__page_light"
              : "pagination__angel pagination__page_dark"
          }
          disabled={1 === currentPage}
          onClick={(e) => {
            setCurrentPage(currentPage - 1);
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} rotation={180} />
        </button>
        {pages?.map((page, index) => (
          <button
            className={
              isThemeLight
                ? "pagination__page pagination__page_light"
                : "pagination__page pagination__page_dark"
            }
            disabled={page === currentPage}
            key={page}
            onClick={(e) => {
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        ))}
        <button
          className={
            isThemeLight
              ? "pagination__angel pagination__page_light"
              : "pagination__angel pagination__page_dark"
          }
          disabled={maxPage === currentPage}
          onClick={(e) => {
            setCurrentPage(currentPage + 1);
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          className={
            isThemeLight
              ? "pagination__angel double__right pagination__page_light"
              : "pagination__angel double__right pagination__page_dark"
          }
          disabled={maxPage === currentPage}
          onClick={(e) => {
            setCurrentPage(maxPage);
          }}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  );
}

export default Main;
