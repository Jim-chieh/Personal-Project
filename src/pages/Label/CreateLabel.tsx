import styled from 'styled-components';
import SingleLabel from './SingleLabel';
import CreateLabelComponent from './CreateLabelComponent';
import { useState } from 'react';

const Wrapper = styled.div`
	width: 100%;
	height: 150px;
	background-color: #f6f8fa;
	margin-bottom: 16px;
	border: 1px solid #d0d7de;
	border-radius: 10px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 767px) {
		height: auto;
	}
`;

const LabelWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 12px 0;
	@media screen and (max-width: 767px) {
		margin: unset;
	}
`;

type Click = { onClick: () => void };

function CreateLabel({ onClick }: Click) {
	const [colorCode, setColorCode] = useState(
		'#' + Math.floor(Math.random() * 16777215).toString(16)
	);
	const [nameChange, setNameChange] = useState('');

	function getRandomColor() {
		let randomColor = Math.floor(Math.random() * 16777215).toString(16);
		setColorCode('#' + randomColor);
	}

	function handleInputChange(value: string) {
		setNameChange(value);
	}
	return (
		<Wrapper>
			<SingleLabel
				$width={'100%'}
				$backgroundColor={colorCode}
				text={nameChange.length === 0 ? 'Label preview' : nameChange}
				$color={'#ffffff'}
				$margin
			/>
			<LabelWrapper>
				<CreateLabelComponent
					onClick={onClick ? () => onClick() : () => {}}
					getColorFn={getRandomColor}
					$backgroundColor={colorCode}
					$onChange={handleInputChange}
				/>
			</LabelWrapper>
		</Wrapper>
	);
}

export default CreateLabel;
