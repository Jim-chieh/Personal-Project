import styled from 'styled-components';

type Label = {
	$color: string;
	$textColor: string;
	$border: string;
	$hoverColor: string;
	$checkHasMouseEvent: boolean;
	$hoverBorderColor: string;
	$width: string;
	$hoverTextColor?: string;
};

const NewIssue = styled.button<Label>`
	width: ${props => (props.$width ? props.$width : 'auto')};
	height: 33px;
	padding: 0 8px;
	background-color: ${props => props.$color};
	outline: none;
	border: 1px solid ${props => props.$border};
	border-radius: 5px;
	color: ${props => props.$textColor};
	font-size: 14px;
	font-weight: 600;
	white-space: nowrap;
	pointer-events: ${props => (props.$checkHasMouseEvent ? 'auto' : 'none')};
	:hover {
		background-color: ${props => (props ? props.$hoverColor : 'unset')};
		cursor: pointer;
		border: 1px solid ${props => props.$hoverBorderColor};
		color: ${props => props.$hoverTextColor};
	}
`;

type buttonProps = {
	buttonName: string | JSX.Element;
	backgroundColor: string;
	onClick: () => void;
	textColor: string;
	$border: string;
	$hoverColor: string;
	$checkMouseEvent: boolean;
	$hoverBorderColor: string;
	$width?: string;
	$hoverTextColor?: string;
};

function NewIssueAndLabel({
	buttonName,
	backgroundColor,
	onClick,
	textColor,
	$border,
	$hoverColor,
	$checkMouseEvent,
	$hoverBorderColor,
	$width,
	$hoverTextColor
}: buttonProps) {
	return (
		<NewIssue
			$color={backgroundColor}
			onClick={onClick ? () => onClick() : () => {}}
			$textColor={textColor}
			$border={$border}
			$hoverColor={$hoverColor}
			$checkHasMouseEvent={$checkMouseEvent}
			$hoverBorderColor={$hoverBorderColor}
			$width={$width as string}
			$hoverTextColor={$hoverTextColor}
		>
			{buttonName}
		</NewIssue>
	);
}

export default NewIssueAndLabel;
