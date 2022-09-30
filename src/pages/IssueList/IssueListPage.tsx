import {
	TagIcon,
	MilestoneIcon,
	CheckIcon,
	XIcon,
	IssueOpenedIcon,
	LightBulbIcon,
	TriangleDownIcon
} from '@primer/octicons-react';
import LabelAndMilestones from '../../components/bottomsAndInput/LabelAndMilestones';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';
import InputComponent from '../../components/bottomsAndInput/InputComponent';
import IssuePopup from './IssuePopup';
import { useRef, useState, useEffect } from 'react';
import FilterPopup from './FilterPopup';
import {
	useGetAllIssuesQuery,
	useGetAllAssigneesQuery
} from '../../redux/IssueApi';
import { Issues } from '../../redux/IssueListProps';
import IssueList from './IssueList';
import { useGetAllLabelsQuery } from '../../redux/LabelCreateApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearAll, addState } from '../../redux/issueSlice';
import { useNavigate } from 'react-router-dom';

const filterArr = ['Label', 'Assignee', 'Sort'];
function IssuePage() {
	const [display, setDisplay] = useState(false);
	const [filterPopupDisplay, setFilterPopupDisplay] = useState(false);
	const [inputValue, setInputValue] = useState('is:issue is:open');
	const [clearAllSearch, setClearAllSearch] = useState(false);
	const currentClick = useRef('');
	const result = useSelector((store: RootState) => store.issueListReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data } = useGetAllIssuesQuery({
		name: 'Jim-chieh',
		repo: 'Personal-Project',
		token: localStorage.getItem('token') as string,
		labels: result.labels.length === 0 ? '' : `labels=${result.labels.join()}`,
		assignee: result.assignee === '' ? '' : `&assignee=${result.assignee}`,
		sort: result.sort === '' ? '' : `&sort=${result.sort}`,
		filterText: result.filterText === '' ? '' : `&filter=${result.filterText}`,
		state: result.state === '' ? '' : `&state=${result.state}`
	});
	console.log(result);
	const labelData = useGetAllLabelsQuery({
		name: 'Jim-chieh',
		repo: 'Personal-Project',
		token: localStorage.getItem('token') as string
	});

	const assigness = useGetAllAssigneesQuery({
		name: 'Jim-chieh',
		repo: 'Personal-Project',
		token: localStorage.getItem('token') as string
	});

	const labelArr = [
		['Labels', <TagIcon size={14} />, '9'],
		['Milestones', <MilestoneIcon size={14} />, '0']
	];
	if (!data) return <div>loading</div>;

	return (
		<div className="mx-auto mb-[220px] max-w-[1280px] ">
			<div className="mt-6 w-full px-4">
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
							$onChange={(e: string) => {
								setInputValue(e);
							}}
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
						onClick={() => dispatch(addState('open'))}
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
						onClick={() => dispatch(addState('closed'))}
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
							{' '}
							Closed
						</div>
					</div>
				</div>
			</div>
			<div className="sm:px-4">
				<div className="mt-4 flex justify-between border-y-[1px] border-gray-300 bg-[#f6f8fa] p-4 sm:justify-start sm:rounded-t sm:border-[1px] lg:justify-between">
					<div className="flex">
						<div className="hidden md:block">
							<input type="checkbox" />
						</div>
						<div className="hidden lg:ml-4 lg:block lg:flex">
							<button
								className=" flex cursor-pointer items-center"
								onClick={() => dispatch(addState('open'))}
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
									onClick={() => dispatch(addState('closed'))}
								>
									Closed
								</div>
							</button>
						</div>
					</div>
					<div className="flex w-full justify-between sm:relative sm:justify-start lg:w-fit">
						{filterArr.map((text, index) => (
							<div key={`${index}-${text}`}>
								<div
									className="flex cursor-pointer items-center px-4 text-[14px] text-[#6a727b]"
									onClick={() => {
										setDisplay(true);
										currentClick.current = text as string;
									}}
								>
									{text}
									<div className="hidden sm:flex">
										<TriangleDownIcon />
									</div>
								</div>
							</div>
						))}
						<IssuePopup
							$display={display}
							$currentClick={currentClick.current}
							$onClick={() => setDisplay(false)}
							$labelData={labelData.data}
							$assigneeData={assigness.data}
						/>
					</div>
				</div>
			</div>
			<div className="sm:px-4">
				{data.map((item: Issues, index) => (
					<IssueList key={item.id} $data={item} $index={index} />
				))}
			</div>
			<div className="mt-4 px-4">
				<LightBulbIcon size={16} />
			</div>
		</div>
	);
}

export default IssuePage;
