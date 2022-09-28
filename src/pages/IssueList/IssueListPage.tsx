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
import IssueList from './IssueList';
import IssuePopup from './IssuePopup';
import { useState } from 'react';
import FilterPopup from './FilterPopup';

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
	const [popupDisplay, setPopupDisplay] = useState(false);
	const [filterPopupDisplay, setFilterPopupDisplay] = useState(false);

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
	return (
		<div className="mb-[220px]">
			<div className="w-full mt-6 px-4">
				<div className="w-full flex flex-wrap justify-between item-center mb-4">
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
					<div className="w-full grow mt-6 mb-4 flex items-center md:order-1 md:w-fit md:mt-0 md:mb-0">
						<div className="h-full rounded-l border-[1px] border-r-0 border-gray-300 px-4 flex items-center text-sm md:h-[32px]">
							<div className="hidden sm:block">
								<Sort
									$labeltext={'Filters'}
									array={filter}
									$headerText={'Filter Issues'}
									$top={'35px'}
									$right={'-227px'}
								/>
							</div>
							<div
								className="flex items-center"
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
						<InputComponent />
					</div>
				</div>
				<div className="hidden flex items-center group w-fit mb-4">
					<div className=" flex items-center bg-[#6e7781] rounded mr-2 group-hover:bg-[#0969da] cursor-pointer">
						<XIcon fill="#ffffff" size={16} />
					</div>
					<div className="flex text-[#6e7781] items-center group-hover:text-[#0969da] cursor-pointer">
						Clear current search query, filters, and sorts
					</div>
				</div>
				<div className="flex item-center lg:hidden">
					<a className=" flex items-center" href="#">
						<IssueOpenedIcon size={16} />
						<div className="ml-1 text-[14px]">{`${1}`} Open</div>
					</a>
					<a className=" flex items-center justify-center ml-[10px]" href="#">
						<CheckIcon size={16} />
						<div className="ml-1 text-[14px]">{`${0} Closed`}</div>
					</a>
				</div>
			</div>
			<div className="sm:px-4">
				<div className="flex justify-between border-y-[1px] border-gray-300 mt-4 p-4 bg-[#f6f8fa] sm:border-[1px] sm:rounded-t sm:justify-start lg:justify-between">
					<div className="flex">
						<div className="hidden  md:block">
							<input type="checkbox" />
						</div>
						<div className="hidden lg:ml-4 lg:block lg:flex">
							<a className=" flex items-center" href="#">
								<IssueOpenedIcon size={16} />
								<div className="ml-1 text-[14px]">{`${1}`} Open</div>
							</a>
							<a
								className=" flex items-center justify-center ml-[10px]"
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
									className="cursor-pointer flex items-center px-4 text-[14px] text-[#6a727b] sm:hidden"
									onClick={
										filterArr === 'Label'
											? () => setPopupDisplay(true)
											: () => console.log('wrong')
									}
								>
									{filterArr}
								</div>
								<div className="hidden flex items-center px-4 text-[14px] text-[#6a727b] sm:flex">
									<Sort
										$labeltext={filterArr}
										array={array}
										$headerText={title[index]}
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
				<IssueList />
				<IssueList />
				<IssueList />
				<IssueList />
				<IssueList />
			</div>
			<div className="px-4 mt-4">
				<LightBulbIcon size={16} />
			</div>
			<IssuePopup
				$display={popupDisplay}
				$onClick={() => setPopupDisplay(false)}
			/>
		</div>
	);
}

export default IssuePage;
