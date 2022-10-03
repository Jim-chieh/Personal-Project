import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type NumberProps = { $isActive: boolean };

const Wrapper = styled.div`
	display: flex;
	padding: 0 24px;
	overflow: auto;
	flex-wrap: nowrap;
`;

const ActionContainer = styled.div<NumberProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 48px;
	font-size: 14px;
	padding: 0 5px;
	color: #57606a;
	white-space: nowrap;
	border-bottom: ${props => (props.$isActive ? '2px solid #fd8c73' : 'none')};
	color: black;
	fill: #57606a;
`;

const Container = styled.div`
	padding: 8px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	:hover {
		cursor: pointer;
		background-color: #eaedf1;
	}
`;

const IconContainer = styled.div`
	margin-right: 8px;
	@media screen and (max-width: 543px) {
		display: none;
	}
`;

const Circle = styled.div`
	width: 20px;
	height: 20px;
	background-color: #e2e3e6;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 4px;
`;

type arrayProps = { array: (string | number | JSX.Element)[][] };

function ActionList({ array }: arrayProps) {
	const [currentClickAction, setCurrentClickAction] = useState('Issues');
	const navigate = useNavigate();

	function handleNavigate() {
		navigate('/');
		return {};
	}

	function returnNothing() {
		return {};
	}

	return (
		<Wrapper>
			{array.map((action, index) => (
				<ActionContainer
					key={index}
					$isActive={action[1] === currentClickAction}
					onClick={() => {
						setCurrentClickAction(action[1].toString());
						action[1] === 'Issues' ? handleNavigate() : returnNothing();
					}}
				>
					<Container>
						<IconContainer>{action[0]}</IconContainer>
						{action[1]}
						{action[2] === undefined ? null : <Circle>{action[2]}</Circle>}
					</Container>
				</ActionContainer>
			))}
		</Wrapper>
	);
}

export default ActionList;
