import styled from 'styled-components';

const OutSideWrapper = styled.div<DropdownPropsType>`
	display: ${props => props.open};
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 99;
	:hover {
		cursor: default;
	}
`;

type DropdownPropsType = {
	open: string;
	onClick: () => void;
};

function BlurEffect({ open, onClick }: DropdownPropsType) {
	return <OutSideWrapper open={open} onClick={() => onClick()} />;
}

export default BlurEffect;
