import styled from 'styled-components';

type Label = {
	$color: string;
	$textColor: string;
	$border: string;
	$hoverColor: string;
	$checkHasMouseEvent: boolean;
	$hoverBorderColor: string;
};

const NewIssue = styled.button<Label>`
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
};

function NewIssueAndLabel({
	buttonName,
	backgroundColor,
	onClick,
	textColor,
	$border,
	$hoverColor,
	$checkMouseEvent,
	$hoverBorderColor
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
		>
			{buttonName}
		</NewIssue>
	);
}

export default NewIssueAndLabel;
