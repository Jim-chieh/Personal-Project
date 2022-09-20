import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../utils/api';

function IssuePage() {
	const counter = useSelector(count => count);
	const dispatch = useDispatch();

	console.log(counter);
	// if (!labels) return null;

	return (
		<button
			onClick={() => {
				dispatch({
					type: 'ADD'
				});
			}}
		>
			Add
		</button>
	);
}

export default IssuePage;
