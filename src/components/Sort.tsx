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
	}
`;

const SortContainer = styled.div`
	display: flex;
	align-items: center;
	:hover {
		cursor: pointer;
	}
`;

type SortProps = {
	$labeltext: string[] | string;
	array: (string | JSX.Element)[][];
	$headerText: string;
	$top: string;
	$right: string;
};

function Sort({ $labeltext, array, $headerText, $top, $right }: SortProps) {
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
				$HeaderText={$headerText}
				$top={$top}
				$right={$right}
			/>
		</TextContainer>
	);
}

export default Sort;
