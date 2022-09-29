import ActionList from './ActionList';
import RepoAction from './RepoAction';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
	BookIcon,
	CodeIcon,
	EyeIcon,
	GearIcon,
	GitPullRequestIcon,
	GraphIcon,
	IssueOpenedIcon,
	PinIcon,
	PlayIcon,
	RepoForkedIcon,
	RepoIcon,
	ShieldIcon,
	StarIcon,
	TableIcon,
	TriangleDownIcon
} from '@primer/octicons-react';

type Display = {
	$display: string;
};

const Wrapper = styled.div<Display>`
	width: 100%;
	background-color: #f6f8fa;
	display: ${props => props.$display};
`;

const RepoNameContainer = styled.div`
	width: 100%;
	padding: 0 32px;
	padding-top: 16px;
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	margin-bottom: 16px;
	white-space: nowrap;
	flex-wrap: wrap;
	@media screen and (max-width: 1011px) {
		padding: 0 24px;
		padding-top: 16px;
	}
`;

const RepoInner = styled.div`
	height: 30px;
	display: flex;
	align-items: center;
	@media screen and (max-width: 567px) {
		flex-wrap: wrap;
	}
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

const actionArr = [
	[<PinIcon fill="#6b737c" />, 'Pin'],
	[
		<EyeIcon fill="#6b737c" />,
		'Unwatch',
		1,
		<TriangleDownIcon fill="#6b737c" />
	],
	[
		<RepoForkedIcon fill="#6b737c" />,
		'Fork',
		0,
		<TriangleDownIcon fill="#6b737c" />
	],
	[<StarIcon fill="#6b737c" />, 'Star', 0, <TriangleDownIcon fill="#6b737c" />]
];

function RepoDetail() {
	const result = useSelector(store => store);
	console.log(result);

	const pageActionArr = [
		[<CodeIcon fill="#6b737c" />, 'Pin'],
		[<IssueOpenedIcon fill="#6b737c" />, 'Issues', 1],
		[<GitPullRequestIcon fill="#6b737c" />, 'Pull requests'],
		[<PlayIcon fill="#6b737c" />, 'Actions'],
		[<TableIcon fill="#6b737c" />, 'Projects'],
		[<BookIcon fill="#6b737c" />, 'Wiki'],
		[<ShieldIcon fill="#6b737c" />, 'Security'],
		[<GraphIcon fill="#6b737c" />, 'Insights'],
		[<GearIcon fill="#6b737c" />, 'Settings']
	];

	const token = localStorage.getItem('token');

	return (
		<Wrapper
			$display={token === null || token === undefined ? 'none' : 'block'}
		>
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
				<RepoAction array={actionArr} />
			</RepoNameContainer>
			<ActionList array={pageActionArr} />
		</Wrapper>
	);
}

export default RepoDetail;
