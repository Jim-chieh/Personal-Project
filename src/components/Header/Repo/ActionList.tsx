import styled from 'styled-components';

import {
	CodeIcon,
	IssueOpenedIcon,
	GitPullRequestIcon,
	PlayIcon,
	TableIcon,
	ShieldIcon,
	GraphIcon
} from '@primer/octicons-react';

const Wrapper = styled.div`
	display: flex;
	padding: 0 24px;
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

const ActionContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 48px;
	font-size: 14px;
	padding: 0 5px;
	color: #57606a;
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
					<Code size={16} />
					Code
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<Issue size={16} fill=" #57606a" />
					Issues
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<PullRequest size={16} />
					Pull requests
					<Circle>2</Circle>
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<Action size={16} />
					Actions
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<Table size={16} />
					Projects
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<Shild size={16} />
					Security
				</Container>
			</ActionContainer>
			<ActionContainer>
				<Container>
					<Graph size={16} />
					Insights
				</Container>
			</ActionContainer>
		</Wrapper>
	);
}

export default ActionList;
