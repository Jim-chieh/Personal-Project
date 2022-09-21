import styled from 'styled-components';

import {
	CodeIcon,
	IssueOpenedIcon,
	GitPullRequestIcon,
	PlayIcon,
	TableIcon,
	ShieldIcon,
	GraphIcon,
	GearIcon
} from '@primer/octicons-react';

const Wrapper = styled.div`
	display: flex;
	padding: 0 24px;
	overflow: auto;
	flex-wrap: nowrap;
`;
const Code = styled(CodeIcon)`
	margin-right: 8px;
`;

const Issue = styled(IssueOpenedIcon)`
	margin-right: 8px;
`;

const PullRequest = styled(GitPullRequestIcon)`
	margin-right: 8px;
`;

const Action = styled(PlayIcon)`
	margin-right: 8px;
`;

const Table = styled(TableIcon)`
	margin-right: 8px;
`;

const Shild = styled(ShieldIcon)`
	margin-right: 8px;
`;

const Graph = styled(GraphIcon)`
	margin-right: 8px;
`;

const Gear = styled(GearIcon)`
	margin-right: 8px;
`;

const ActionContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 48px;
	font-size: 14px;
	padding: 0 5px;
	color: #57606a;
	white-space: nowrap;
	:nth-child(2) {
		border-bottom: 2px solid #fd8c73;
		color: black;
		fill: #57606a;
	}
`;

const Container = styled.div`
	padding: 8px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	:hover {
		background-color: #eaedf1;
	}
`;

const IconContainer = styled.div`
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

function ActionList() {
	return (
		<Wrapper>
			<ActionContainer>
				<Container>
					<IconContainer>
						<Code size={16} />
					</IconContainer>
					Code
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<IconContainer>
						<Issue size={16} fill=" #57606a" />
					</IconContainer>
					Issues
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<IconContainer>
						<PullRequest size={16} />
					</IconContainer>
					Pull requests
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<IconContainer>
						<Action size={16} />
					</IconContainer>
					Actions
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<IconContainer>
						<Table size={16} />
					</IconContainer>
					Projects
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<IconContainer>
						<Shild size={16} />
					</IconContainer>
					Security
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<IconContainer>
						<Graph size={16} />
					</IconContainer>
					Insights
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<IconContainer>
						<Gear size={16} />
					</IconContainer>
					Settings
				</Container>
			</ActionContainer>
		</Wrapper>
	);
}

export default ActionList;
