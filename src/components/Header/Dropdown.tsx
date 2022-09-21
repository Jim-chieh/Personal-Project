import styled from 'styled-components';

// type Click = { $isActive: boolean };
// 	/* display: ${props => (props.$isActive ? 'block' : 'none')}; */

type Click = { $active: boolean };

const ProfileDrop = styled.div<Click>`
	position: absolute;
	bottom: -138px;
	right: 52px;
	width: 178px;
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-radius: 10px;
	display: ${props => (props.$active ? 'block' : 'none')};

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

	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const ContentWithoutBorder = styled.div`
	width: 100%;
	font-size: 14px;
	color: #24292f;
	font-size: 14px;
	padding: 5px 0;
	margin: 5px 0;
	padding-left: 16px;
	padding-right: 8px;
	:hover {
		background-color: #0969da;
		color: #ffffff;
	}
`;

interface DropdownProps {
	array: string[];
	$isActive: boolean;
}

function Dropdown({ array, $isActive }: DropdownProps) {
	return (
		<ProfileDrop $active={$isActive}>
			{array.map((item, index) => (
				<ContentWithoutBorder key={index}>{item}</ContentWithoutBorder>
			))}
		</ProfileDrop>
	);
}

export default Dropdown;
