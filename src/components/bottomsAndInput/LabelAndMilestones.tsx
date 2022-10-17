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
	display: flex;
	align-items: center;
	border-right: 1px solid #d0d7de;
	padding: 4px 16px;
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
type arrayProps = {
	array: (string | JSX.Element)[][];
	$labelClick?: () => void;
	$shouldHasBckground: boolean;
};

function LabelAndMilestones({
	array,
	$labelClick,
	$shouldHasBckground
}: arrayProps) {
	const [currentClick, setCurrentClick] = useState('Labels');
	function fasley() {
		{
		}
	}

	return (
		<Wrapper>
			{array.map((label, index) => (
				<LabelContainer
					key={index}
					$isActive={label[0] === currentClick && $shouldHasBckground}
					onClick={() => {
						setCurrentClick(label[0] as string);
						label[0] === 'Labels'
							? $labelClick
								? $labelClick()
								: fasley()
							: fasley();
					}}
				>
					{label[1]}
					<TextFeild>{label[0]}</TextFeild>
					{label[2] === undefined || label[2] === '' ? null : (
						<Circle>{label[2]}</Circle>
					)}
				</LabelContainer>
			))}
		</Wrapper>
	);
}

export default LabelAndMilestones;
