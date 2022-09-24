import styled from 'styled-components';

type TextProps = { $isActive: number };

const RepoActions = styled.div`
	display: flex;
	margin-left: auto;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const IconWrapper = styled.div`
	height: 28px;
	border: 1px solid #d5d8da;
	border-radius: 10px;
	padding: 0px 6px 0 12px;
	font-size: 12px;
	display: flex;
	align-items: center;
	margin-right: 8px;
	:last-child {
		margin-right: 0px;
	}
`;

const Text = styled.p`
	margin: 0 5px;
`;

const IconContainer = styled.div`
	display: flex;
	align-items: center;
	:hover {
		cursor: pointer;
		background-color: #f3f4f6;
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
	margin: 0 4px;
`;

const TriangleContainer = styled.div<TextProps>`
	height: 100%;
	border-left: ${props =>
		props.$isActive === 1 ? 'none' : '1px solid #d5d8da'};
	display: flex;
	justify-content: center;
	align-items: center;

	padding: ${props => (props.$isActive === 1 ? 'none' : '8px 0px 8px 8px')};
	margin-left: ${props => (props.$isActive === 1 ? 'none' : '8px')};
	${IconContainer}:hover & {
		background-color: blue;
	}
	:hover {
		cursor: pointer;
		background-color: #f3f4f6;
	}
`;
type arrayProps = { array: (string | number | JSX.Element)[][] };

function RepoAction({ array }: arrayProps) {
	return (
		<RepoActions>
			{array.map((action, index) => (
				<IconWrapper key={index}>
					<IconContainer>
						{action[0]}
						<Text>{action[1]}</Text>
						{action[2] === undefined ? null : <Circle>{action[2]}</Circle>}
					</IconContainer>
					{action[3] === undefined ? null : (
						<TriangleContainer $isActive={index}>{action[3]}</TriangleContainer>
					)}
				</IconWrapper>
			))}
		</RepoActions>
	);
}

export default RepoAction;
