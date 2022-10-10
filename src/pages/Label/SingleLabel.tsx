import styled from 'styled-components';

type Background = {
	$backgroundColor: string;
	textColor: string;
	$height: string;
};

const Wrapper = styled.div`
	/* width: 15%; */
	height: 24px;
	display: flex;
	align-items: center;
`;

const LabelContent = styled.span<Background>`
	background-color: ${props => props.$backgroundColor};
	height: ${props => (props.$height ? props.$height : '')};
	color: ${props => props.textColor};
	padding: 0 10px;
	border-radius: 30px;
	font-size: 12px;
	display: flex;
	align-items: center;
	white-space: nowrap;
	border: 1px solid
		${props =>
			props.$backgroundColor === '#FFFFFF'
				? '#d0d7de'
				: props.$backgroundColor === '#FFF'
				? '#d0d7de'
				: 'transparent'};
`;

type LabelProps = {
	text: string;
	$backgroundColor: string;
	$height?: string;
};

function SingleLabel({ text, $backgroundColor, $height }: LabelProps) {
	function lightOrDark(bgcolor: string) {
		const r = parseInt(bgcolor.slice(0, 2), 16);
		const g = parseInt(bgcolor.slice(2, 4), 16);
		const b = parseInt(bgcolor.slice(4, 6), 16);
		const hsp = r * 0.3 + g * 0.6 + b * 0.1;
		if (hsp > 127.5) {
			return 'black';
		} else {
			return 'white';
		}
	}
	return (
		<Wrapper>
			<LabelContent
				$backgroundColor={$backgroundColor.toLocaleUpperCase()}
				textColor={lightOrDark($backgroundColor.substring(1, 7))}
				$height={$height as string}
			>
				{text}
			</LabelContent>
		</Wrapper>
	);
}

export default SingleLabel;
