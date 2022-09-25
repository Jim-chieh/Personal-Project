import styled from 'styled-components';
import { useState } from 'react';

type Active = {
	$isActive: boolean;
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #d0d7de;
	border-radius: 5px;
	overflow: hidden;
`;

const LabelContainer = styled.div<Active>`
	height: 100%;
	display: flex;
	align-items: center;
	border-right: 1px solid #d0d7de;
	padding: 5px 16px;
	font-size: 14px;
	color: ${props => (props.$isActive ? '#ffffff' : 'black')};
	:hover {
		background-color: ${props => (props.$isActive ? 'transprant' : '#f6f8fa')};
		cursor: pointer;
	}
	background-color: ${props => (props.$isActive ? '#0969da' : '#ffffff')};

	:last-child {
		border-right: none;
	}
`;

const TextFeild = styled.p`
	font-size: 14px;
	padding: 1px 3px;
`;

const Circle = styled.div`
	width: 20px;
	height: 20px;
	background-color: #e2e3e6;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 4px;
`;
type arrayProps = { array: (string | JSX.Element)[][] };

function LabelAndMilestones({ array }: arrayProps) {
	const [currentClick, setCurrentClick] = useState('Labels');

	return (
		<Wrapper>
			{array.map((label, index) => (
				<LabelContainer
					key={index}
					$isActive={label[0] === currentClick}
					onClick={() => {
						setCurrentClick(label[0] as string);
					}}
				>
					{label[1]}
					<TextFeild>{label[0]}</TextFeild>
					{label[2] === undefined ? null : <Circle>{label[2]}</Circle>}
				</LabelContainer>
			))}
		</Wrapper>
	);
}

export default LabelAndMilestones;
