import React, { useState, useEffect } from "react";
import logo from "../../svg/logo.svg";

function Main() {
  const host = "https://test-front.framework.team";

  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    getPaintings().then((data) => setPaintings(data));
    console.log(2);
    console.log(paintings);
  }, []);

  const getPaintings = async function () {
    const response = await fetch(host + "/paintings?_page=2&_limit=12");
    const data = await response.json();
    console.log(data);
    return data;
  };

  return (
    <div className="page">
      <img src={logo} className="page__logo" alt="Framework Team Logo"></img>
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
