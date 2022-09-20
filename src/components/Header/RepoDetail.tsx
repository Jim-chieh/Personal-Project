import styled from 'styled-components';
import { RepoIcon } from '@primer/octicons-react';

const Wrapper = styled.div`
	width: 100%;
	height: 112px;
	background-color: #f6f8fa;
`;

const RepoNameContainer = styled.div`
	width: 100%;
	padding: 0 32px;
	padding-top: 16px;
`;

const RepoInner = styled.div`
	height: 30px;
	display: flex;
	align-items: center;
`;

const RepoIconComponent = styled(RepoIcon)`
	margin-right: 8px;
`;

const ShowRepoName = styled.a`
	text-decoration: none;
	color: #0969da;
	font-size: 20px;
`;

const Slash = styled.span`
	font-size: 20px;
	margin: 0 4px;
`;

const Public = styled.div`
	width: 50px;
	height: 20px;
	border-radius: 10px;
	font-size: 12px;
	color: #57606a;
	margin-left: 8px;
	border: 1px solid #d0d7de;
	padding: 0px 7px;
	display: flex;
	align-items: center;
`;

const RepoActions = styled.div`
	width: 100%;
	padding: 0 32px;
`;

function RepoDetail() {
	return (
		<Wrapper>
			<RepoNameContainer>
				<RepoInner>
					<RepoIconComponent size={16} fill="#57606a" />
					<ShowRepoName>Jim-chieh</ShowRepoName>
					<Slash>/</Slash>
					<ShowRepoName>
						<strong>Personal-Project</strong>
					</ShowRepoName>
					<Public>Public</Public>
				</RepoInner>
			</RepoNameContainer>
			<RepoActions></RepoActions>
		</Wrapper>
	);
}

export default RepoDetail;
