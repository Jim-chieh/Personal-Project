import styled from 'styled-components';
import { TriangleDownIcon, CheckIcon } from '@primer/octicons-react';
import SortDropDown from './SortDropDown';
import { useState } from 'react';

const TextContainer = styled.div`
	display: flex;
	align-items: center;
	color: #57606a;
	position: relative;
`;

const Text = styled.p`
	${TextContainer}:hover & {
		cursor: pointer;
		text-decoration: underline;
	}
`;

const SortContainer = styled.div`
	display: flex;

	:hover {
		cursor: pointer;
	}
`;

type SortProps = {
	$labeltext: string[];
	array: (string | JSX.Element)[][];
};

function Sort({ $labeltext, array }: SortProps) {
	const [sortClick, setSortClick] = useState(false);

	return (
		<TextContainer
			onClick={() => {
				setSortClick(!sortClick);
			}}
		>
			<SortContainer>
				<Text>{$labeltext}</Text>
				<TriangleDownIcon />
			</SortContainer>
			<SortDropDown
				array={array}
				$isActive={sortClick}
				$checkBlur={() => setSortClick(false)}
				$HeaderText={'Sort'}
			/>
		</TextContainer>
	);
}

export default Sort;
