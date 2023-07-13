import React, { memo } from 'react';
import s from './PaintingList.module.scss';
import Painting from './Painting/Painting';

const PaintingList = memo((props) => {
	return (
		<div className={`${s.catalog} ${props.isLoaded ? s.paintingsLoaded : ''}`}>
			{props.paintings.map((painting) => (
				<Painting painting={painting} key={painting.id} />
			))}
		</div>
	);
});

export default PaintingList;
