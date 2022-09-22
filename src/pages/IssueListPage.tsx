import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../utils/api';
import styled from 'styled-components';

function IssuePage() {
	const counter = useSelector(count => count);
	const dispatch = useDispatch();

	console.log(counter);
	// if (!labels) return null;

	return <div>1</div>;
}

export default IssuePage;
