import styled from 'styled-components';

type Click = { $active: boolean; top: string; right: string };

type Display = {
	$firstElementDisplay?: string;
	currentText: string;
	$isNotLabelPage: boolean;
};

const ProfileDrop = styled.div<Click>`
	position: absolute;
	top: ${props => props.top};
	right: ${props => props.right};
	width: 178px;
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-radius: 10px;
	display: ${props => (props.$active ? 'block' : 'none')};
	z-index: 300;

	&:after {
		border-right: solid 10px transparent;
		border-left: solid 10px transparent;
		border-bottom: solid 10px #ffffff;
		transform: translateX(-50%);
		position: absolute;
		content: '';
		top: -10px;
		right: 0px;
		height: 0;
		width: 0;
	}
	&:before {
		border-right: solid 11px transparent;
		border-left: solid 11px transparent;
		border-bottom: solid 11px #cccccc;
		transform: translateX(-50%);
		position: absolute;
		content: '';
		top: -12px;
		right: -2px;
		height: 0px;
		width: 0;
	}
`;

const ContentWithoutBorder = styled.div<Display>`
	width: 100%;
	font-size: 14px;
	color: ${props =>
		props.currentText === 'Delete' && props.$isNotLabelPage
			? '#cf222e'
			: '#24292f'};
	font-size: 14px;
	padding: 5px 0;
	margin: 5px 0;
	padding-left: 16px;
	padding-right: 8px;
	:hover {
		background-color: ${props =>
			props.currentText === 'Delete' && props.$isNotLabelPage
				? '#cf222e'
				: '#0969da'};
		color: #ffffff;
	}
	:first-child {
		display: ${props => props.$firstElementDisplay};
	}
`;

interface DropdownProps {
	array: string[];
	$isActive: boolean;
	top: string;
	right: string;
	onClick?: (item: string) => void;
	$firstElementShouldhide?: string;
	$isNotLabelPage?: boolean;
	firstChild?: number;
}

function Dropdown({
	array,
	$isActive,
	top,
	right,
	onClick,
	$firstElementShouldhide,
	$isNotLabelPage,
	firstChild
}: DropdownProps) {
	return (
		<ProfileDrop $active={$isActive} top={top} right={right}>
			{array.map((item, index) =>
				firstChild === 0 &&
				(item === 'Delete' ||
					item === 'Hide' ||
					item === 'Reference in new issue') ? null : (
					<div
						key={index}
						className={`my-2 ${
							item === 'Report content' || item === 'Edit'
								? 'border-t-[1px] border-t-[#cccccc]'
								: ''
						} `}
					>
						<ContentWithoutBorder
							onClick={onClick ? () => onClick(item) : () => {}}
							$firstElementDisplay={$firstElementShouldhide}
							currentText={item}
							$isNotLabelPage={$isNotLabelPage as boolean}
						>
							{item}
						</ContentWithoutBorder>
					</div>
				)
			)}
		</ProfileDrop>
	);
}

export default Dropdown;
