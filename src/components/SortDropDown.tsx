import styled from 'styled-components';
import { CheckIcon } from '@primer/octicons-react';
import { useState } from 'react';

type State = { $isActive: number; $index: number };
type Click = { $isClicked: boolean };

const Wrapper = styled.div<Click>`
	width: 298px;
	background-color: #ffffff;
	position: absolute;
	top: 22px;
	right: 6px;
	border-radius: 10px;
	border: 1px solid #d0d7de;
	display: ${props => (props.$isClicked ? 'block' : 'none')};
	z-index: 99;
`;

const Header = styled.div`
	height: 33px;
	padding: 8px 10px;
	font-size: 12px;
	font-weight: 600;
`;

const Inner = styled.div`
	height: 35px;
	padding: 8px 8px 8px 30px;
	border-top: 1px solid #d0d7de;
	font-size: 12px;
	position: relative;
	:hover {
		cursor: pointer;
	}
`;

const CheckContainer = styled.div<State>`
	position: absolute;
	top: 8px;
	left: 8px;
	display: ${props => (props.$isActive === props.$index ? 'block' : 'none')};
	:hover {
		cursor: pointer;
	}
`;

interface ArrayProps {
	array: (string | JSX.Element)[][];
	$isActive: boolean;
}

function SortDropDown({ array, $isActive }: ArrayProps) {
	const [sortClick, setSortClick] = useState(0);
	return (
		<Wrapper $isClicked={$isActive}>
			<Header>Sort</Header>
			{array.map((item, index) => (
				<Inner key={index} onClick={() => setSortClick(index)}>
					{item[0]}
					<CheckContainer $isActive={sortClick} $index={index}>
						<CheckIcon />
					</CheckContainer>
				</Inner>
			))}
		</Wrapper>
	);
}

export default SortDropDown;
