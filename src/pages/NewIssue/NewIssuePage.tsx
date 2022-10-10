import { useRef, useState } from 'react';
import IssueActions from './IssueActions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import CreateCommentComponent from './CreateCommentComponent';
import {
	addLabel,
	addAssignee,
	removeAssignee,
	clearAssignee,
	removeLabel,
	clearAll
} from '../../redux/createIssueSlice';
import { useCreateIssueMutation } from '../../redux/createIssueApi';
import {
	TypographyIcon,
	ChevronDownIcon,
	QuoteIcon,
	CodeIcon,
	LinkIcon,
	MentionIcon,
	ImageIcon,
	CrossReferenceIcon,
	ReplyIcon,
	HeadingIcon,
	BoldIcon,
	ItalicIcon,
	ListUnorderedIcon,
	ListOrderedIcon,
	TasklistIcon,
	InfoIcon,
	GearIcon,
	MarkdownIcon
} from '@primer/octicons-react';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';
import { useGetAllLabelsQuery } from '../../redux/LabelCreateApi';
import { useGetAllAssigneesQuery } from '../../redux/IssueApi';
import { useNavigate } from 'react-router-dom';
import { createIssueParam } from '../../redux/createIssueApi';

const listArr = [
	<ListUnorderedIcon fill={'#57606a'} />,
	<ListOrderedIcon fill={'#57606a'} />,
	<TasklistIcon fill={'#57606a'} />
];

const quoteCodeLinkArr = [
	<QuoteIcon fill={'#57606a'} />,
	<CodeIcon fill={'#57606a'} />,
	<LinkIcon fill={'#57606a'} />
];

const alwaysDisplay = [
	<MentionIcon fill={'#57606a'} />,
	<ImageIcon fill={'#57606a'} />,
	<CrossReferenceIcon fill={'#57606a'} />,
	<ReplyIcon fill={'#57606a'} />
];

function NewIssuePage() {
	const [isFetching, setIsFetching] = useState(false);
	const title = useRef('');
	const dispatch = useDispatch();
	const userData = useSelector((store: RootState) => store.loginReducer);
	const [createIssue] = useCreateIssueMutation();
	const createSlice = useSelector(
		(store: RootState) => store.createIssueReducer
	);
	const navigate = useNavigate();

	const { data: labelsData, isLoading: isLabelsLoading } = useGetAllLabelsQuery(
		{
			name: 'Jim-chieh',
			repo: 'webpack',
			token: userData.token
		}
	);

	const labelData = labelsData?.map(item => {
		return {
			$background: `${item.color}`,
			title: `${item.name}`,
			description: `${item.description}`
		};
	});

	const { data: assigness, isLoading: isAssigneeLoading } =
		useGetAllAssigneesQuery({
			name: 'Jim-chieh',
			repo: 'webpack',
			token: userData.token
		});

	const assigneeData = assigness?.map(item => {
		return { picture: item.avatar_url, header: item.login };
	});

	function dispatchAddLabel(e: string) {
		if (createSlice.labels.includes(e)) {
			const newLabels = [...createSlice.labels];
			const index = newLabels.findIndex(label => label === e);
			newLabels.splice(index, 1);
			dispatch(removeLabel(newLabels));
		} else {
			dispatch(addLabel(e));
		}
	}

	function dispatchAssignee(e: string) {
		if (createSlice.assignee.includes(e)) {
			const newAssignees = [...createSlice.assignee];
			const index = newAssignees.findIndex(assignee => assignee === e);
			newAssignees.splice(index, 1);
			dispatch(removeAssignee(newAssignees));
		} else if (e === 'clear') {
			dispatch(clearAssignee());
		} else {
			dispatch(addAssignee(e));
		}
	}

	async function createNewIssue(values: createIssueParam) {
		try {
			setIsFetching(true);
			await createIssue({ ...values }).unwrap();
			setIsFetching(false);
			dispatch(clearAll());
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	}

	const ActionsArr = [
		{
			title: 'Assignees',
			icon: <GearIcon />,
			content: assigneeData,
			currentClick: createSlice.assignee,
			description: 'No one—',
			more: 'assign yourself',
			currentLogin: userData.loginUser,
			popupData: {
				title: 'Assign up to 10 people to this issue',
				placeholder: 'Type or choose a user',
				secondTitle: 'Suggestions',
				content: assigneeData,
				smTop: 'sm:top-[20px]',
				smLeft: 'sm:left-[12px]',
				lgTop: 'md:top-[26px]',
				lgLeft: 'md:left-[-30px]',
				autoHeight: true,
				activeList: createSlice.assignee,
				$stillShowOnMdSize: true,
				addDispatch: (e: string) => dispatchAssignee(e)
			}
		},
		{
			title: 'Labels',
			icon: <GearIcon />,
			content: labelData,
			description: 'None yet',
			currentClick: createSlice.labels,
			popupData: {
				title: 'Filter by label',
				placeholder: 'Filter labels',
				content: labelData,
				smTop: 'sm:top-[0px]',
				smLeft: 'sm:left-[0px]',
				lgTop: 'md:top-[18px]',
				lgLeft: 'md:left-[-30px]',
				autoHeight: false,
				activeList: createSlice.labels,
				$stillShowOnMdSize: true,
				$shouldhasXIcon: true,
				addDispatch: (e: string) => dispatchAddLabel(e)
			}
		},
		{
			title: 'Projects',
			icon: <GearIcon />,
			content: [],
			description: 'None yet',
			autoheight: true,
			addDispatch: (e: string) => console.log(e)
		},
		{
			title: 'Milestone',
			icon: <GearIcon />,
			content: [],
			description: 'No milestone'
		},
		{
			title: 'Development',
			content: [],
			description: 'Shows branches and pull requests linked to this issue.',
			noHoverEffect: true
		},
		{
			title: 'Helpful resources',
			outerLink: (
				<a
					href="https://docs.github.com/en/site-policy/github-terms/github-community-guidelines"
					target="-blank"
					className="text-xs text-[#0969da] hover:underline"
				>
					GitHub Community Guidelines
				</a>
			),
			noHoverEffect: true
		}
	];

	return (
		<div className="mt-6 mb-[220px] w-full px-4  md:px-6">
			<div className="max-w-[1300px] md:mx-auto md:flex  md:justify-center">
				<CreateCommentComponent
					$avatarUrl={userData.userAvatar}
					$shouldHasTitle
					$createBtnClick={() =>
						createNewIssue({
							name: 'Jim-chieh',
							repo: 'webpack',
							token: userData.token,
							title: createSlice.title,
							body: createSlice.body,
							labels: createSlice.labels,
							assignees: createSlice.assignee
						})
					}
					$isFetching={isFetching}
				/>
				<div>
					{ActionsArr.map((action, index) => (
						<IssueActions action={action} key={index} index={index} />
					))}

					<div className="mt-4 w-full border-t-[1px] border-[#d8dee4] pt-4"></div>
				</div>
				<div className="mt-6 md:hidden">
					<NewIssueAndLabel
						buttonName={'Submit new issue'}
						backgroundColor={title.current === '' ? '#94d3a2' : '#2da44e'}
						onClick={() =>
							createNewIssue({
								name: 'Jim-chieh',
								repo: 'webpack',
								token: userData.token,
								title: createSlice.title,
								body: createSlice.body,
								labels: createSlice.labels,
								assignees: createSlice.assignee
							})
						}
						textColor={'#ffffff'}
						$border={title.current === '' ? '#82b88f' : '#2c974b'}
						$hoverColor={'#2c974b'}
						$checkMouseEvent={title.current !== ''}
						$hoverBorderColor={'#2c974b'}
						$width={'100%'}
					/>
				</div>
			</div>
		</div>
	);
}

export default NewIssuePage;
