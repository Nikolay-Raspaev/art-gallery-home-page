import React from "react";
import s from "./PaintingList.module.scss";

const PaintingList = (props) => {
    return (
        <div className={`${s.catalog} ${props.isLoaded ? s.paintingsLoaded : ""}`}>
            {props.paintings?.map((painting) => (
                <div className={s.catalog__painting} key={painting.id}>
                    {/*          <img
            src={props.host + painting.imageUrl}
            alt={painting.name}
            className={s.catalog__painting__img}
          />*/}
                    <div
                        className={s.catalog__painting__img}
                        style={{
                            backgroundImage: `url(${props.host}${painting.imageUrl})`,
                        }}
                    />
                    <div className={s.catalog__painting__overlay}>
                        <p className={s.painting__name}>
                            <b>{painting.name}</b>
                        </p>
                        <div className={s.painting__field}>
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
