import React from "react";

const PaintingList = (props) => {
  return (
    <div className="page__catalog">
      {props.paintings?.map((painting, index) => (
        <div className="catalog__painting" key={painting.id}>
          <img
            src={props.host + painting.imageUrl}
            alt={painting.name}
            className="catalog__painting__img"
          />
          <div className="catalog__painting_overlay">
            <p className="painting__name">
              <b>{painting.name}</b>
            </p>
            <div className="painting__field">
              <p>
                <b>Author:</b> {painting.author}
              </p>
              <p>
                <b>Created:</b> {painting.created}
              </p>
              <p>
                <b>Location:</b> {painting.location}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaintingList;
