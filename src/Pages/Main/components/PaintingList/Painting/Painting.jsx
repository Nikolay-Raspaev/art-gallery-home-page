import React from 'react';
import s from "./Painting.module.scss";
import {host} from "../../../Consts";

const Painting = (props) => {
    return (
        <div className={s.catalog__painting}>
            <div
                className={s.catalog__painting__img}
                style={{
                    backgroundImage: `url(${host}${props.painting.imageUrl})`,
                }}
            />
            <div className={s.catalog__painting__overlay}>
                <p className={s.painting__name}>{props.painting.name}</p>
                <div className={s.painting__field}>
                    <p>
                        <span>Author:</span> {props.painting.author}
                    </p>
                    <p>
                        <span>Created:</span> {props.painting.created}
                    </p>
                    <p>
                        <span>Location:</span> {props.painting.location}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Painting;