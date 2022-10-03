import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LabelAndMilestones from '../../components/bottomsAndInput/LabelAndMilestones';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';
import InputComponent from '../../components/bottomsAndInput/InputComponent';
import NoResultMatched from './NoResultMatched';
import IssueList from './IssueList';
import NoIssuePage from './NoIssuePage';
import FilterPopup from './FilterPopup';
import { Assignee, Issues } from '../../redux/IssueListProps';
import { GetLabel, useGetAllLabelsQuery } from '../../redux/LabelCreateApi';
import {
	useGetAllIssuesQuery,
	useGetAllAssigneesQuery
} from '../../redux/IssueApi';
import { RootState } from '../../redux/store';
import { clearAll, addState, switchPage } from '../../redux/issueSlice';
import {
	TagIcon,
	MilestoneIcon,
	CheckIcon,
	XIcon,
	IssueOpenedIcon,
	LightBulbIcon,
	TriangleDownIcon
} from '@primer/octicons-react';
import FilterListNav from './FilterListNav';
import PleaseLogin from '../../components/PleaseLogin';

const filterArr = ['Label', 'Assignee', 'Sort'];

const SortbyArr = [
	{ showText: 'Newest', action: 'created-desc' },
	{ showText: 'Oldest', action: 'created-asc' },
	{ showText: 'Most commented', action: 'comments-desc' },
	{ showText: 'Least commented', action: 'comments-asc' },
	{ showText: 'Recently updated', action: 'updated-desc' },
	{ showText: 'Least recently updated', action: 'updated-asc' }
];

const protipsArr = [
	'Notify someone on an issue with a mention, like: @Jim-chieh.',
	'Mix and match filters to narrow down what you’re looking for.',
	' no:milestone will show everything without a milestone.',
	'Find everything you created by searching author:Jim-chieh.',
	'What’s not been updated in a month: updated:<2022-09-02.'
];

function IssuePage() {
	const [display, setDisplay] = useState(false);
	const [filterPopupDisplay, setFilterPopupDisplay] = useState(false);
	const [inputValue, setInputValue] = useState('is:issue is:open');
	const [clearAllSearch, setClearAllSearch] = useState(false);
	const [page, setPage] = useState('1');
	const [currentClick, setCurrentClick] = useState('');
	const result = useSelector((store: RootState) => store.issueListReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = useSelector((store: RootState) => store.loginReducer);

	const { data } = useGetAllIssuesQuery({
		name: 'Jim-chieh',
		repo: 'webpack',
		token: token.token,
		labels: result.labels.length === 0 ? '' : `labels=${result.labels.join()}`,
		assignee: result.assignee === '' ? '' : `&assignee=${result.assignee}`,
		sort: result.sort === '' ? '' : `&sort=${result.sort}`,
		filterText: result.filterText === '' ? '' : `&filter=${result.filterText}`,
		state: result.state === '' ? '' : `&state=${result.state}`,
		per_page: `&per_page=4`,
		page: `&page=${page}`
	});
	const labelData = useGetAllLabelsQuery({
		name: 'Jim-chieh',
		repo: 'webpack',
		token: token.token
	});

	const assigness = useGetAllAssigneesQuery({
		name: 'Jim-chieh',
		repo: 'webpack',
		token: token.token
	});

	const labelArr = [
		[
			'Labels',
			<TagIcon size={14} />,
			labelData.data?.length.toString() as string
		],
		['Milestones', <MilestoneIcon size={14} />, '0']
	];

	let noPR = [] as Issues[];
	data?.map(issue =>
		issue.pull_request === undefined ? noPR.push(issue) : () => {}
	);

	let value = '';

	function changeSearchInputValue() {
		value = '';
		if (result.state === '') {
			value += `is:open `;
		} else if (result.state !== '') {
			value += `is:${result.state} `;
		}
		value += 'is:issue ';
		if (result.labels.length !== 0) {
			result.labels.forEach(label => (value += `label:${label} `));
		}
		if (result.assignee !== '') value += `assignee:${result.assignee} `;
		if (result.sort !== '') value += `sort:${result.sort} `;
		if (result.filterText === '&creator=Jim-chieh') value += 'author:@me ';
		if (result.filterText === '&assignee=Jim-chieh') value += 'assignee:@me ';
		if (result.filterText === '&mentioned=Jim-chieh') value += 'mentions:@me ';
	}
	changeSearchInputValue();
	useEffect(() => {
		setInputValue(value);
	}, [value]);

	changeSearchInputValue();

	if (token.token === '') return <PleaseLogin />;

	if (!noPR) return <div>loading</div>;

	return (
		<div className="mx-auto mb-[220px] max-w-[1280px] ">
			<div className="mt-6 w-full px-4 md:px-6  lg:px-8">
				<div className="item-center mb-4 flex w-full flex-wrap justify-between">
					<div className="md:order-2 md:ml-4">
						<LabelAndMilestones
							array={labelArr}
							$labelClick={() => navigate('/labelmanagement')}
						/>
					</div>
					<div className="md:order-3  md:hidden">
						<NewIssueAndLabel
							buttonName={'New'}
							backgroundColor={'#2da44e'}
							onClick={() => {
								console.log('click');
							}}
							textColor={'#ffffff'}
							$border={'none'}
							$hoverColor={'#2c974b'}
							$checkMouseEvent
							$hoverBorderColor={'transprant'}
						/>
					</div>
					<div className="hidden md:order-3 md:ml-4 md:block">
						<NewIssueAndLabel
							buttonName={'New issue'}
							backgroundColor={'#2da44e'}
							onClick={() => {
								console.log('click');
							}}
							textColor={'#ffffff'}
							$border={'none'}
							$hoverColor={'#2c974b'}
							$checkMouseEvent
							$hoverBorderColor={'transprant'}
						/>
					</div>
					<div className="mt-6 mb-4 flex w-full grow items-center sm:relative md:order-1 md:mt-0 md:mb-0 md:w-fit">
						<div
							className="flex h-full cursor-pointer items-center rounded-l border-[1px] border-r-0 border-gray-300 px-4 text-sm md:h-[32px]"
							onClick={() => setFilterPopupDisplay(true)}
						>
							<div className="flex items-center">
								<p className="text-[14px] font-medium">Filters</p>
								<TriangleDownIcon />
							</div>
						</div>
						<FilterPopup
							$display={filterPopupDisplay}
							$onClick={() => setFilterPopupDisplay(false)}
							$current={result.filterText}
						/>
						<InputComponent
							$value={inputValue}
							$onChange={(value: string) => {
								setInputValue(value);
							}}
							$shouldHasPadding={false}
						/>
					</div>
				</div>
				<div
					className={`group mb-4 flex w-fit items-center ${
						result.labels.length !== 0 ||
						result.assignee !== '' ||
						result.filterText !== '' ||
						result.state !== ''
							? 'block'
							: 'hidden'
					}`}
					onClick={() => {
						dispatch(clearAll());
						setClearAllSearch(false);
					}}
				>
					<div className=" mr-2 flex cursor-pointer items-center rounded bg-[#6e7781] group-hover:bg-[#0969da]">
						<XIcon fill="#ffffff" size={16} />
					</div>
					<div className="flex cursor-pointer items-center text-sm text-[#6e7781] group-hover:text-[#0969da]">
						Clear current search query, filters, and sorts
					</div>
				</div>
				<div className="item-center flex lg:hidden">
					<div
						className=" flex cursor-pointer items-center"
						onClick={() => {
							dispatch(addState('open'));
							setPage('1');
						}}
					>
						<div className={`${result.state === '' ? 'block' : 'hidden'}`}>
							<IssueOpenedIcon size={16} />
						</div>
						<div className={`${result.state === 'open' ? 'block' : 'hidden'}`}>
							<IssueOpenedIcon size={16} />
						</div>
						<div
							className={`${result.state === 'closed' ? 'block' : 'hidden'}`}
						>
							<IssueOpenedIcon size={16} fill={'#64748b'} />
						</div>
						<div
							className={`ml-1 text-[14px] ${
								result.state === 'open' || result.state === ''
									? 'text-black'
									: 'text-slate-500'
							}`}
						>
							Open
						</div>
					</div>
					<div
						className=" ml-[10px] flex cursor-pointer items-center justify-center"
						onClick={() => {
							dispatch(addState('closed'));
							setPage('1');
						}}
					>
						<div className={`${result.state === '' ? 'block' : 'hidden'}`}>
							<CheckIcon size={16} />
						</div>
						<div
							className={`${result.state === 'closed' ? 'block' : 'hidden'}`}
						>
							<CheckIcon size={16} />
						</div>
						<div className={`${result.state === 'open' ? 'block' : 'hidden'}`}>
							<CheckIcon size={16} fill={'#64748b'} />
						</div>
						<div
							className={`ml-1 text-[14px] ${
								result.state === 'closed' ? 'text-black' : 'text-slate-500'
							}`}
						>
							Closed
						</div>
					</div>
				</div>
			</div>
			<div className="sm:px-4 md:px-6  lg:px-8">
				<div className="mt-4 flex justify-between border-y-[1px] border-gray-300 bg-[#f6f8fa] p-4 sm:justify-start sm:rounded-t sm:border-[1px] lg:justify-between">
					<div className="flex">
						<div className="hidden md:block">
							<input type="checkbox" />
						</div>
						<div className="hidden lg:ml-4 lg:block lg:flex">
							<button
								className=" flex cursor-pointer items-center"
								onClick={() => {
									dispatch(addState('open'));
									setPage('1');
								}}
							>
								<div className={`${result.state === '' ? 'block' : 'hidden'}`}>
									<IssueOpenedIcon size={16} />
								</div>
								<div
									className={`${result.state === 'open' ? 'block' : 'hidden'}`}
								>
									<IssueOpenedIcon size={16} />
								</div>
								<div
									className={`${
										result.state === 'closed' ? 'block' : 'hidden'
									}`}
								>
									<IssueOpenedIcon size={16} fill={'#64748b'} />
								</div>
								<div
									className={`ml-1 text-[14px]  ${
										result.state === 'open' || result.state === ''
											? 'text-block'
											: 'text-slate-500'
									}`}
								>
									Open
								</div>
							</button>
							<button className=" ml-[10px] flex items-center justify-center">
								<div className={`${result.state === '' ? 'block' : 'hidden'}`}>
									<CheckIcon size={16} fill={'#64748b'} />
								</div>
								<div
									className={`${
										result.state === 'closed' ? 'block' : 'hidden'
									}`}
								>
									<CheckIcon size={16} />
								</div>
								<div
									className={`${result.state === 'open' ? 'block' : 'hidden'}`}
								>
									<CheckIcon size={16} fill={'#64748b'} />
								</div>
								<div
									className={`ml-1 cursor-pointer text-[14px] ${
										result.state === 'closed' ? 'text-block' : 'text-slate-500'
									}`}
									onClick={() => {
										dispatch(addState('closed'));
										setPage('1');
									}}
								>
									Closed
								</div>
							</button>
						</div>
					</div>
					<FilterListNav
						filterArr={filterArr}
						$setDisplayFalse={() => setDisplay(false)}
						$setDisplayTrue={() => setDisplay(true)}
						$display={display}
						$setCurrentClick={(e: string) => setCurrentClick(e)}
						$labelData={labelData.data as GetLabel[]}
						$assigneeData={assigness.data as Assignee[]}
						SortbyArr={SortbyArr}
						$currentClick={currentClick}
					/>
				</div>
			</div>
			<div className="sm:px-4 md:px-6 lg:px-8">
				{noPR.map((item: Issues, index) => (
					<IssueList
						key={item.id}
						$index={index}
						title={item.title}
						labels={item.labels}
						assignees={item.assignees}
						comments={item.comments}
						number={item.number}
						created_at={item.created_at}
						user={item.user}
						state={item.state}
						body={item.body}
						state_reason={item.state_reason}
						currentUser={token.loginUser}
					/>
				))}
				<div
					className={`${
						(result.labels.length !== 0 ||
							result.assignee !== '' ||
							result.filterText !== '' ||
							result.state !== '') &&
						noPR.length === 0
							? 'flex'
							: 'hidden'
					} `}
				>
					<NoResultMatched />
				</div>
				<div
					className={`${
						result.labels.length === 0 &&
						result.assignee === '' &&
						result.filterText === '' &&
						result.state === '' &&
						noPR.length === 0
							? 'flex'
							: 'hidden'
					} `}
				>
					<NoIssuePage />
				</div>
			</div>
			<div className=" mt-4 flex justify-center">
				<div className="flex w-4/12 justify-between">
					<NewIssueAndLabel
						buttonName={'< Previous'}
						backgroundColor={'transparent'}
						onClick={() => {
							setPage((parseInt(page) - 1).toString());
							dispatch(switchPage(page));
						}}
						textColor={parseInt(page) === 1 ? 'gray' : '#287cdf'}
						$border={'none'}
						$hoverColor={'none'}
						$checkMouseEvent={parseInt(page) !== 1}
						$hoverBorderColor={'#d0d7de'}
					/>
					<NewIssueAndLabel
						buttonName={'Next >'}
						backgroundColor={'transparent'}
						onClick={() => {
							setPage((parseInt(page) + 1).toString());
							dispatch(switchPage(`${noPR.length < 3 ? page : () => {}}`));
						}}
						textColor={noPR.length >= 4 ? '#287cdf' : 'gray'}
						$border={'none'}
						$hoverColor={'none'}
						$checkMouseEvent={noPR.length >= 4}
						$hoverBorderColor={'#d0d7de'}
					/>
				</div>
			</div>
			<div className="flex w-full justify-center">
				<div className=" mt-4 flex items-start  px-4">
					<div className="flex h-full items-center">
						<LightBulbIcon size={14} />
					</div>
					<strong className="ml-1 text-sm font-semibold">ProTip!</strong>
					{
						<p className="ml-1 break-all text-center text-sm">
							{protipsArr[Math.floor(Math.random() * protipsArr.length)]}
						</p>
					}
				</div>
			</div>
		</div>
	);
}

export default IssuePage;
