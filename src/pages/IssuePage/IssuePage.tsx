import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';
import IssueState from './IssueState';
import {
	useSingleIssueQuery,
	useSingleIssueCommentQuery,
	useTitleUpdateMutation,
	titleUpdateComment,
	useCommentCreateMutation,
	commentCreate,
	useAssigneeUpdateMutation,
	useLabelsUpdateMutation
} from '../../redux/singleIssueApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import SingleLabel from '../Label/SingleLabel';
import { singleIssueProp } from '../../redux/singleIssueProp';
import CreateCommentComponent from '../NewIssue/CreateCommentComponent';
import IssueActions from '../NewIssue/IssueActions';
import { GearIcon, BellSlashIcon } from '@primer/octicons-react';
import {
	removeLabel,
	removeAssignee,
	addAssignee,
	addLabel,
	clearAssignee,
	addTitle,
	addBody
} from '../../redux/createIssueSlice';
import { useGetAllAssigneesQuery } from '../../redux/IssueApi';
import { useGetAllLabelsQuery } from '../../redux/LabelCreateApi';
import CommentComponent from './CommentComponent';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import IssuePageFixedTtitle from './IssuePageFixedTitle';

export interface labelsProps {
	$background?: string;
	title?: string;
	description?: string;
}

export interface assigneesProps {
	picture: string;
	header: string;
}

function IssuePage() {
	const { id } = useParams();
	const userData = useSelector((store: RootState) => store.loginReducer);
	const dispatch = useDispatch();
	const createSlice = useSelector(
		(store: RootState) => store.createIssueReducer
	);
	const [isFetching, setIsFetching] = useState(false);
	const [isCommentFetching, setIsCommentFetching] = useState(false);
	const [editTitle, setEditTitle] = useState(false);
	const navigate = useNavigate();
	const [titleUpdate] = useTitleUpdateMutation();
	const [commentCreate] = useCommentCreateMutation();
	const [assigneeUpdate] = useAssigneeUpdateMutation();
	const [labelsUpdate] = useLabelsUpdateMutation();
	const observer = useRef<IntersectionObserver | null>(null);
	const [fixTitle, setfixTitle] = useState(false);

	const { data, isSuccess, isLoading } = useSingleIssueQuery({
		name: 'Jim-chieh',
		repo: 'webpack',
		token: userData.token,
		id: id as string
	});

	const { data: comments } = useSingleIssueCommentQuery({
		name: 'Jim-chieh',
		repo: 'webpack',
		token: userData.token,
		id: id as string
	});

	const commenters = comments?.map(comment => {
		return { picture: comment.user.avatar_url, header: comment.user.login };
	});

	const { data: assigness, isLoading: isAssigneeLoading } =
		useGetAllAssigneesQuery({
			name: 'Jim-chieh',
			repo: 'webpack',
			token: userData.token
		});

	const repoAssignees =
		assigness === undefined
			? []
			: assigness.map(item => {
					return { picture: item.avatar_url, header: item.login };
			  });

	const currentAssigneesData =
		data?.assignees === undefined
			? []
			: (data as singleIssueProp).assignees.map(item => {
					return { picture: item.avatar_url, header: item.login };
			  });

	const originAssigneeDataName = data?.assignees?.map(item => {
		return item.login;
	});

	const issueOpener = [
		{ picture: data?.user.avatar_url, header: data?.user.login }
	];

	const issueAssignees = _.uniqWith(
		commenters?.concat(
			issueOpener.concat(currentAssigneesData).concat(repoAssignees) as {
				picture: string;
				header: string;
			}[]
		),
		_.isEqual
	);
	const issueAssgineesImg = issueAssignees.map(assignee => {
		return { participants: assignee.picture };
	});

	useEffect(() => {
		dispatch(removeLabel(currentLabelsName));
		dispatch(removeAssignee(originAssigneeDataName as string[]));
		dispatch(
			addTitle(data?.title === undefined ? '' : (data?.title as string))
		);
	}, [data]);

	const currentLabelsData =
		data?.labels === undefined
			? []
			: (data as singleIssueProp).labels.map(item => {
					return {
						$background: `${item.color}`,
						title: `${item.name}`,
						description: `${item.description}`
					};
			  });

	const currentLabelsName =
		data?.labels === undefined
			? []
			: (data as singleIssueProp).labels.map(item => {
					return item.name;
			  });

	const { data: labelsData } = useGetAllLabelsQuery({
		name: 'Jim-chieh',
		repo: 'webpack',
		token: userData.token
	});

	const labelData = labelsData?.map(item => {
		return {
			$background: `${item.color}`,
			title: `${item.name}`,
			description: `${item.description}`
		};
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
			assigneeUpdate({
				name: 'Jim-chieh',
				repo: 'webpack',
				token: userData.token,
				assignees: [...createSlice.assignee, e],
				id: id?.toString() as string
			});
			dispatch(addAssignee(e));
		}
	}

	function updateAssigneesFn() {
		assigneeUpdate({
			name: 'Jim-chieh',
			repo: 'webpack',
			token: userData.token,
			assignees: createSlice.assignee,
			id: id?.toString() as string
		});
	}

	function updateLabelFn() {
		labelsUpdate({
			name: 'Jim-chieh',
			repo: 'webpack',
			token: userData.token,
			labels: createSlice.labels,
			id: id?.toString() as string
		});
	}

	const ActionsArr = [
		{
			title: 'Assignees',
			icon: <GearIcon />,
			content: currentAssigneesData,
			currentClick: createSlice.assignee,
			description: 'No one—',
			more: 'assign yourself',
			currentLogin: userData.loginUser,
			outerOnclick: () => updateAssigneesFn(),
			popupData: {
				title: 'Assign up to 10 people to this issue',
				placeholder: 'Type or choose a user',
				secondTitle: 'Suggestions',
				content: issueAssignees,
				smTop: 'sm:top-[20px]',
				smLeft: 'sm:left-[12px]',
				lgTop: 'md:top-[26px]',
				lgLeft: 'md:left-[-30px]',
				autoHeight: true,
				activeList: createSlice.assignee,
				$stillShowOnMdSize: true,
				addDispatch: (e: string) => {
					dispatchAssignee(e);
				}
			}
		},
		{
			title: 'Labels',
			icon: <GearIcon />,
			content: currentLabelsData,
			description: 'None yet',
			currentClick: createSlice.labels,
			outerOnclick: () => updateLabelFn(),
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
			autoheight: true
		},
		{
			title: 'Milestone',
			icon: <GearIcon />,
			content: [],
			description: 'No milestone'
		},
		{
			title: 'Development',
			icon: <GearIcon />,
			content: [],
			description: 'Create a branch for this issue or link a pull request.'
		},
		{
			title: 'Notifications',
			icon: 'Customize',
			outerLink: (
				<>
					<button className="flex h-[28px] w-full items-center justify-center rounded-md border-[1px] border-[#d5d8da] bg-[#f6f8fa] px-4 py-[3px] text-xs hover:bg-[#f3f4f6]">
						<BellSlashIcon fill="#57606a" />
						<p className="ml-2">Unsubscribe</p>
					</button>
					<p className="mt-1 text-xs text-[#57606a]">
						You’re receiving notifications because you’re watching this
						repository.
					</p>
				</>
			)
		},
		{
			title: `${issueAssignees.length} participants`,
			content: issueAssgineesImg
		}
	];

	const headerBottom = useCallback((node: HTMLDivElement) => {
		if (node) {
			const options = {
				rootMargin: '0px',
				threshold: 0
			};
			const callback = (entries: IntersectionObserverEntry[]) => {
				if (entries[0].isIntersecting) {
					setfixTitle(false);
				} else {
					setfixTitle(true);
				}
			};
			observer.current = new IntersectionObserver(callback, options);
			observer.current.observe(node);
		}
	}, []);

	async function titleUpdateFn(values: titleUpdateComment) {
		try {
			setIsFetching(true);
			await titleUpdate({ ...values }).unwrap();
			setIsFetching(false);
			setEditTitle(false);
		} catch (err) {
			console.log(err);
		}
	}

	async function commentCreateFn(values: commentCreate) {
		try {
			setIsCommentFetching(true);
			await commentCreate({ ...values }).unwrap();
			setIsCommentFetching(false);
			dispatch(addBody(''));
		} catch (err) {
			console.log(err);
		}
	}
	if (isLoading) return <div className="mx-auto">Loading...</div>;

	return (
		<div className="mx-auto mt-6 mb-[220px] max-w-[1280px] px-4 md:px-6">
			<div
				className={`${fixTitle ? 'fixed' : 'hidden'} top-0 left-0 z-50 w-full`}
			>
				<IssuePageFixedTtitle
					$created_at={data?.created_at as string}
					title={data?.title as string}
					number={data?.number as number}
					author={data?.user.login as string}
					comments={data?.comments as number}
					currentState={
						data?.state_reason === null || data?.state_reason === 'reopened'
							? 'open'
							: (data?.state_reason as string)
					}
				/>
			</div>
			<div className="mb-8 flex w-[100%] flex-wrap justify-between ">
				<div
					className={`mb-4 ${
						editTitle ? 'hidden' : 'flex'
					}  md:order-2 md:mb-0 md:mt-2`}
				>
					<div>
						<NewIssueAndLabel
							buttonName={'Edit'}
							backgroundColor={'#f6f8fa'}
							onClick={() => setEditTitle(true)}
							textColor={'#24292f'}
							$border={'#d5d8da'}
							$hoverColor={'#f3f4f6'}
							$checkMouseEvent
							$hoverBorderColor={'#d5d8da'}
						/>
					</div>
					<div className="ml-2">
						<NewIssueAndLabel
							buttonName={'New issue'}
							backgroundColor={'#2da44e'}
							onClick={() => navigate('/newIssue')}
							textColor={'#ffffff'}
							$border={'#298545'}
							$hoverColor={'#2c974b'}
							$checkMouseEvent
							$hoverBorderColor={'#2a9048'}
						/>
					</div>
				</div>
				<div
					className={`${
						editTitle ? 'grow md:flex' : 'hidden'
					} mb-4 grow md:order-2 md:mb-2 md:mt-2 `}
				>
					<input
						className="mr-4 h-[32px] w-full rounded-md border-[1px] border-[#d0d7de] px-3 pt-[5px]"
						value={createSlice.title}
						onChange={e => {
							dispatch(addTitle(e.target.value));
						}}
					/>
					<div className="mt-2 flex md:mt-0">
						<div className="mr-2">
							<NewIssueAndLabel
								buttonName={isFetching ? 'Updating' : 'Save'}
								backgroundColor={'#f6f8fa'}
								onClick={() => {
									titleUpdateFn({
										name: 'Jim-chieh',
										repo: 'webpack',
										token: userData.token,
										title: createSlice.title,
										id: id?.toString() as string
									});
								}}
								textColor={isFetching ? '#8c95ab' : '#383d42'}
								$border={'#d5d8da'}
								$hoverColor={'#f3f4f6'}
								$checkMouseEvent={!isFetching}
								$hoverBorderColor={'#d5d8da'}
							/>
						</div>
						<div className="flex items-center">
							<button
								className="flex items-center text-sm text-[#0969da] hover:underline"
								onClick={() => {
									setEditTitle(false);
									dispatch(addTitle(data?.title as string));
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
				<div className={`${editTitle ? 'hidden' : 'flex'}   md:hidden`}>
					<a href="#issue-bottom" className=" text-[#0969da]">
						Jump to bottom
					</a>
				</div>
				<h1
					className={`mt-0 mb-2 ${
						editTitle ? 'hidden' : 'flex'
					} w-[100%] border-b-0 text-[26px] font-normal md:order-1 md:w-auto md:grow md:text-[32px]`}
				>
					<span className="mr-2">
						{data?.title === undefined ? '' : data?.title}
					</span>
					<span className="font-light text-[#6d757d]">{`#${
						data?.number === undefined ? '' : data?.number
					}`}</span>
				</h1>
				<div
					className="w-[100%]  border-b-[1px] border-b-[#d0d7de] md:order-3"
					ref={headerBottom}
				>
					<IssueState
						$author={data?.user.login as string}
						$created_at={data?.created_at as string}
						$comments={data?.comments as number}
						currentState={
							data?.state_reason === null || data?.state_reason === 'reopened'
								? 'open'
								: (data?.state_reason as string)
						}
					/>
				</div>
			</div>
			<div
				className={`mb-5 ${
					(currentAssigneesData as assigneesProps[]).length === 0
						? 'hidden'
						: 'block'
				} border-b-[1px] border-b-[#d0d7de] md:hidden`}
			>
				<div className="mb-4 flex md:hidden">
					<span
						className={`w-[25%] shrink-0 text-xs text-[#636c75] md:w-[17%] ${
							(currentAssigneesData as assigneesProps[]).length === 0
								? 'hidden'
								: 'block'
						}`}
					>
						Assignees
					</span>
					<div className="flex">
						{currentAssigneesData &&
							currentAssigneesData.map((item, index) => (
								<div key={index}>
									<img
										className="cursour-pointer mr-1 h-[20px] h-5 w-[20px] w-5 rounded-[50%] border-[1px] border-[#dddede]"
										src={item.picture}
										alt="user avatar"
									/>
								</div>
							))}
					</div>
				</div>
				<div className="flex   md:hidden">
					<span
						className={`w-[25%] shrink-0 text-xs text-[#636c75] md:w-[17%] ${
							(currentLabelsData as labelsProps[]).length === 0
								? 'hidden'
								: 'block'
						}`}
					>
						Labels
					</span>
					<div className="mb-4 flex flex-wrap">
						{(currentLabelsData as labelsProps[]).length > 0 &&
							(currentLabelsData as labelsProps[]).map((item, index) => (
								<div className="mr-1" key={index}>
									<SingleLabel
										key={index}
										text={item.title as string}
										$backgroundColor={`#${item.$background}`}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className="md:flex ">
				<div className=" grow md:w-[68%] md:pl-[56px]">
					<CommentComponent
						key={0}
						$avatar={data?.user.avatar_url as string}
						$created_at={data?.created_at as string}
						$author_association={data?.author_association as string}
						$author={data?.user.login as string}
						$currentLogin={userData.loginUser}
						$body={data?.body as string}
						currentIndex={0}
						commentId={parseInt(id as string)}
						currentBody={data?.body as string}
						$reactions={data?.reactions}
					/>
					{comments &&
						comments.map((comment, index) => (
							<CommentComponent
								key={index + comment.body}
								$avatar={comment.user.avatar_url as string}
								$created_at={comment.created_at as string}
								$author_association={comment.author_association as string}
								$author={comment.user.login as string}
								$currentLogin={userData.loginUser}
								$body={comment.body}
								currentIndex={index + 1}
								currentBody={comment.body}
								commentId={comment.id}
								$reactions={comment.reactions}
							/>
						))}
					<div
						id="issue-bottom"
						className="relative pt-5 before:absolute before:right-0 before:left-0 before:top-0 before:h-[2px] before:bg-[#d0d7de] before:md:right-[15px] before:md:left-[-55px]"
					>
						<CreateCommentComponent
							$avatarUrl={userData.userAvatar}
							$shouldHasTitle={false}
							$createBtnClick={() =>
								commentCreateFn({
									name: 'Jim-chieh',
									repo: 'webpack',
									token: userData.token,
									body: createSlice.body,
									id: id?.toString() as string
								})
							}
							$isFetching={isCommentFetching}
							$shouldHasDescription={false}
							$shouldHideOnMobile={false}
							$shouldHasCloseBtn
							$checkTitleOrBodyIsEmpty={createSlice.body}
							$buttonName={'Comment'}
							$shouldHasCancelBtn={false}
							currentBody={createSlice.body}
							currentState={
								data?.state_reason === null || data?.state_reason === 'reopened'
									? 'open'
									: data?.state_reason
							}
							issueId={parseInt(id as string)}
						/>
					</div>
				</div>
				<div>
					{ActionsArr.map((action, index) => (
						<IssueActions action={action} index={index} key={index} />
					))}
				</div>
			</div>
		</div>
	);
}

export default IssuePage;
