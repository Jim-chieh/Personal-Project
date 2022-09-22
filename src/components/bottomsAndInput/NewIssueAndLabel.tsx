import styled from 'styled-components';

type Label = {
	$color: string;
	$textColor: string;
	$border: string;
	$hoverColor: string;
};

const NewIssue = styled.button<Label>`
	width: 97px;
	height: 100%;
	background-color: ${props => props.$color};
	outline: none;
	border: 1px solid ${props => props.$border};
	border-radius: 5px;
	color: ${props => props.$textColor};
	font-size: 14px;
	font-weight: 600;
	white-space: nowrap;
	:hover {
		background-color: ${props => (props ? props.$hoverColor : 'unset')};
		cursor: pointer;
	}
`;

type buttonProps = {
	buttonName: string | JSX.Element;
	backgroundColor: string;
	onClick: () => void;
	textColor: string;
	$border: string;
	$hoverColor: string;
};

function NewIssueAndLabel({
	buttonName,
	backgroundColor,
	onClick,
	textColor,
	$border,
	$hoverColor
}: buttonProps) {
	return (
		<NewIssue
			$color={backgroundColor}
			onClick={onClick ? () => onClick() : () => {}}
			$textColor={textColor}
			$border={$border}
			$hoverColor={$hoverColor}
		>
			{buttonName}
		</NewIssue>
	);
}

export default NewIssueAndLabel;
