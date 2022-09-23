import styled from 'styled-components';

type Width = { $width: string; $margin: boolean };

type Background = {
	$backgroundColor: string;
	textColor: string;
};

const Wrapper = styled.div<Width>`
	width: ${props => props.$width};
	height: 24px;
	display: flex;
	align-items: center;
	margin-bottom: ${props => (props.$margin ? '8px' : 'none')};
`;

const LabelContent = styled.span<Background>`
	background-color: ${props => props.$backgroundColor};
	height: 100%;
	color: ${props => props.textColor};
	padding: 0 10px;
	border-radius: 30px;
	font-size: 12px;
	display: flex;
	align-items: center;
`;

type LabelProps = {
	$width: string;
	text: string;
	$backgroundColor: string;
	$margin: boolean;
};

function SingleLabel({ $width, text, $backgroundColor, $margin }: LabelProps) {
	function lightOrDark(bgcolor: string) {
		console.log(bgcolor);
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
		<Wrapper $width={$width} $margin={$margin}>
			<LabelContent
				$backgroundColor={$backgroundColor}
				textColor={lightOrDark($backgroundColor.substring(1, 7))}
			>
				{text}
			</LabelContent>
		</Wrapper>
	);
}

export default SingleLabel;
