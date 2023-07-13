import React, { memo, useEffect, useState } from 'react';
import Input from '../UI/Input/Input';
import SelectForInput from '../UI/Selects/SelectForInput/SelectForInput';
import Select from '../UI/Selects/Select/Select';
import s from './Filter.module.scss';
import { useFetching } from '../../hooks/useFetching';
import QueryService from '../../API/QueryService';

const Filter = memo((props) => {

	const [selectedAuthorID, setSelectedAuthorId] = useState(0);

	const [selectedLocationId, setSelectedLocationId] = useState(0);

	const [paintingName, setPaintingName] = useState('');

	const [dateValue, setDateValue] = useState({ from: '', before: '' });

	const [fetchPaintings, paintingError] = useFetching(async () => {
		const response = await QueryService.getPaintings(
			{ currentPage: props.currentPage,
				selectedAuthorID,
				selectedLocationId,
				paintingName,
				dateValue}
		);
		props.afterFetch(response);
	});

	useEffect(() => {
		fetchPaintings();
	}, [
		props.currentPage,
		selectedAuthorID,
		selectedLocationId,
		dateValue,
		paintingName
	]);

	useEffect(() => {
		props.changePage(1);
	}, [selectedAuthorID, selectedLocationId, paintingName, dateValue]);

	if (paintingError){
		return <div>{paintingError}</div>
	}

	return (
		<div className={s.filter}>
			{paintingError}
			<Input
				placeholder='Name'
				maxLength={45}
				value={paintingName}
				setValue={setPaintingName}
			/>
			<Select
				value={selectedAuthorID}
				selectedName='name'
				setValue={setSelectedAuthorId}
				defaultValue='Author'
				options={props.authors}
			/>
			<Select
				value={selectedLocationId}
				selectedName='location'
				setValue={setSelectedLocationId}
				defaultValue='Location'
				options={props.locations}
			/>
			<SelectForInput value={dateValue} setValue={setDateValue} />
		</div>
	);
});

export default Filter;
