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
                        <b>Author:</b> {props.painting.author}
                    </p>
                    <p>
                        <b>Created:</b> {props.painting.created}
                    </p>
                    <p>
                        <b>Location:</b> {props.painting.location}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Painting;