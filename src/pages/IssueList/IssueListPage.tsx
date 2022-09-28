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
import Sort from '../../components/Sort';
import InputComponent from '../../components/bottomsAndInput/InputComponent';
import IssuePopup from './IssuePopup';
import { useRef, useState } from 'react';
import FilterPopup from './FilterPopup';
import { useGetAllIssuesQuery } from '../../redux/IssueApi';
import { Issues } from '../../redux/IssueListProps';
import IssueList from './IssueList';
import { useGetAllLabelsQuery } from '../../redux/LabelCreateApi';

const filter = [
	['Open issues and pull requests', <CheckIcon />],
	['Your issues'],
	['Your pull requests'],
	['Everything assigned to you'],
	['Everything mentioning you'],
	['View advanced search syntax']
];

const title = ['Filter by label', "Filter by who's assigned", 'Sort by'];

const filterArr = ['Label', 'Assignee', 'Sort'];
function IssuePage() {
	const [display, setDisplay] = useState(false);
	const [filterPopupDisplay, setFilterPopupDisplay] = useState(false);
	const [inputValue, setInputValue] = useState('is:issue is:open');
	const currentClick = useRef('');
	const { data } = useGetAllIssuesQuery({
		name: 'Jim-chieh',
		repo: 'Personal-Project',
		token: localStorage.getItem('token') as string
	});

	const labelData = useGetAllLabelsQuery({
		name: 'Jim-chieh',
		repo: 'Personal-Project',
		token: localStorage.getItem('token') as string
	});

	const array = [
		['Alphabetically', <CheckIcon />],
		['Reverse alphabetically'],
		['Most issues'],
		['Fewest issues']
	];
	const labelArr = [
		['Labels', <TagIcon size={14} />, '9'],
		['Milestones', <MilestoneIcon size={14} />, '0']
	];

	if (!data) return <div>loading</div>;

	return (
		<div className="mb-[220px]">
			<div className="mt-6 w-full px-4">
				<div className="item-center mb-4 flex w-full flex-wrap justify-between">
					<div className="md:order-2 md:ml-4">
						<LabelAndMilestones array={labelArr} />
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
					<div className="mt-6 mb-4 flex w-full grow items-center md:order-1 md:mt-0 md:mb-0 md:w-fit">
						<div className="flex h-full items-center rounded-l border-[1px] border-r-0 border-gray-300 px-4 text-sm md:h-[32px]">
							<div className="hidden sm:block">
								<Sort
									$labeltext={'Filters'}
									array={array}
									$headerText={'Filter Issues'}
									$top={'35px'}
									$right={'-227px'}
								/>
							</div>
							<div
								className="flex items-center sm:hidden md:hidden lg:hidden"
								onClick={() => setFilterPopupDisplay(true)}
							>
								<p className="text-[14px] font-medium">Filters</p>
								<TriangleDownIcon />
							</div>
						</div>
						<FilterPopup
							$display={filterPopupDisplay}
							$onClick={() => setFilterPopupDisplay(false)}
						/>
						<InputComponent
							$value={inputValue}
							$onChange={(e: string) => {
								setInputValue(e);
							}}
						/>
					</div>
				</div>
				<div className="group mb-4 flex hidden w-fit items-center">
					<div className=" mr-2 flex cursor-pointer items-center rounded bg-[#6e7781] group-hover:bg-[#0969da]">
						<XIcon fill="#ffffff" size={16} />
					</div>
					<div className="flex cursor-pointer items-center text-[#6e7781] group-hover:text-[#0969da]">
						Clear current search query, filters, and sorts
					</div>
				</div>
				<div className="item-center flex lg:hidden">
					<a className=" flex items-center" href="#">
						<IssueOpenedIcon size={16} />
						<div className="ml-1 text-[14px]">{`${1}`} Open</div>
					</a>
					<a className=" ml-[10px] flex items-center justify-center" href="#">
						<CheckIcon size={16} />
						<div className="ml-1 text-[14px]">{`${0} Closed`}</div>
					</a>
				</div>
			</div>
			<div className="sm:px-4">
				<div className="mt-4 flex justify-between border-y-[1px] border-gray-300 bg-[#f6f8fa] p-4 sm:justify-start sm:rounded-t sm:border-[1px] lg:justify-between">
					<div className="flex">
						<div className="hidden md:block">
							<input type="checkbox" />
						</div>
						<div className="hidden lg:ml-4 lg:block lg:flex">
							<a className=" flex items-center" href="#">
								<IssueOpenedIcon size={16} />
								<div className="ml-1 text-[14px]">{`${1}`} Open</div>
							</a>
							<a
								className=" ml-[10px] flex items-center justify-center"
								href="#"
							>
								<CheckIcon size={16} />
								<div className="ml-1 text-[14px]">{`${0} Closed`}</div>
							</a>
						</div>
					</div>
					<div className="flex w-full justify-between sm:justify-start lg:w-fit ">
						{filterArr.map((filterArr, index) => (
							<div key={index}>
								<div
									className="flex cursor-pointer items-center px-4 text-[14px] text-[#6a727b] sm:hidden"
									onClick={() => {
										setDisplay(true);
										currentClick.current = filterArr;
									}}
								>
									{filterArr}
								</div>
								<div className="hidden items-center px-4 text-[14px] text-[#6a727b] sm:flex">
									<Sort
										$labeltext={filterArr}
										array={array}
										$headerText={filterArr}
										$top={'35px'}
										$right={'-33px'}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="sm:px-4">
				{data.map((item: Issues) => (
					<IssueList key={item.id} $data={item} />
				))}
			</div>
			<div className="mt-4 px-4">
				<LightBulbIcon size={16} />
			</div>
			<IssuePopup
				$display={display}
				$currentClick={currentClick.current}
				$onClick={() => setDisplay(false)}
				$data={labelData.data}
			/>
		</div>
	);
}

export default IssuePage;
