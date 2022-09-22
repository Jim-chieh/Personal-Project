import styled from 'styled-components';

type Width = { $width: string; $margin: boolean };

type Background = {
	$backgroundColor: string;
	$color: string;
};

const Wrapper = styled.div<Width>`
	width: ${props => props.$width};
	height: 24px;
	display: flex;
	align-items: center;
	margin-bottom: ${props => (props.$margin ? '8px' : 'none')};
`;

const LabelContent = styled.span<Background>`
	background-color: blue;
	height: 100%;
	color: white;
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
	$color: string;
	$margin: boolean;
};

function SingleLabel({
	$width,
	text,
	$backgroundColor,
	$color,
	$margin
}: LabelProps) {
	return (
		<Wrapper $width={$width} $margin={$margin}>
			<LabelContent $backgroundColor={$backgroundColor} $color={$color}>
				{text}
			</LabelContent>
		</Wrapper>
	);
}

export default SingleLabel;
