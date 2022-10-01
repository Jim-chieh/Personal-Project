import { useState } from 'react';
import { XIcon, CheckIcon } from '@primer/octicons-react';
import { GetLabel } from '../../redux/LabelCreateApi';
import { Assignee } from '../../redux/IssueListProps';
import { useDispatch, useSelector } from 'react-redux';
import {
	addLabel,
	clearLabel,
	removeLabel,
	addAssignee,
	clearAssignee,
	addSort
} from '../../redux/issueSlice';
import { RootState } from '../../redux/store';

type IssuePopupProps = {
	$display: boolean;
	$onClick: () => void;
	$currentClick: string;
	$labelData?: GetLabel[];
	$assigneeData?: Assignee[];
};

const SortbyArr = [
	{ showText: 'Newest', action: 'created-desc' },
	{ showText: 'Oldest', action: 'created-asc' },
	{ showText: 'Most commented', action: 'comments-desc' },
	{ showText: 'Least commented', action: 'comments-asc' },
	{ showText: 'Recently updated', action: 'updated-desc' },
	{ showText: 'Least recently updated', action: 'updated-asc' }
];

function IssuePopup({
	$display,
	$onClick,
	$currentClick,
	$labelData,
	$assigneeData
}: IssuePopupProps) {
	const [inputValue, setInputValue] = useState('');
	const [assigneeInputValue, setAssigneeInputValue] = useState('');
	const result = useSelector((store: RootState) => store);
	const dispatch = useDispatch();

	if ($currentClick === 'Label')
		return (
			<div className={`${$display ? 'block' : 'hidden'} `}>
				<div
					className=" fixed top-0 left-0 h-full w-full bg-black opacity-40 sm:opacity-0"
					onClick={() => {
						$onClick();
						setInputValue('');
					}}
				></div>
				<div className="group	absolute top-[2%] left-4 right-4 max-h-[700px] overflow-auto rounded-lg bg-white sm:top-[30px] sm:left-[12px] sm:z-10 sm:h-[400px] sm:max-h-fit sm:w-[300px] sm:w-[300px] sm:border-x-[1px] sm:border-y-[1px] lg:left-[-245px]">
					<div>
						<div className="flex items-center justify-between  border-b-[1px] p-4 text-sm sm:h-[33px] sm:text-xs">
							<div>Filter by label</div>
							<div
								className="cursor-pointer"
								onClick={() => {
									$onClick();
									setInputValue('');
								}}
							>
								<XIcon />
							</div>
						</div>
						<div className="flex items-center justify-between border-b-[1px] p-4 sm:p-2">
							<input
								className="h-8 w-full rounded-md border-[1px] border-[#d0d7de] pl-3 text-sm focus:outline-blue-600 sm:h-8"
								placeholder="Filter labels"
								onChange={e => setInputValue(e.target.value)}
								value={inputValue}
							/>
						</div>
						<div
							className=" flex cursor-pointer items-center justify-between p-4 text-sm hover:bg-gray-100 sm:py-[7px] sm:px-[16px] sm:text-[12px]"
							onClick={() => {
								$onClick();
								dispatch(clearLabel());
								setInputValue('');
							}}
						>
							<div className="pl-[32px] sm:pl-[25px] ">Unlabeled</div>
						</div>
						<ul>
							{$labelData?.map(label => (
								<li
									className={`relative  cursor-pointer  border-t-[1px] p-4 pl-[50px] hover:bg-gray-100 sm:py-[7px] sm:pl-[40px] ${
										inputValue.trim().length === 0
											? 'flex'
											: label.name
													.toLocaleLowerCase()
													.includes(inputValue.toLocaleLowerCase()) ||
											  label.description
													.toLocaleLowerCase()
													.includes(inputValue.toLocaleLowerCase())
											? 'flex'
											: 'hidden'
									}`}
									key={label.id}
									onClick={() => {
										$onClick();
										setInputValue('');
										if (result.issueListReducer.labels.includes(label.name)) {
											const hadClicked = (e: string) => e === label.name;
											const newLabelList = [...result.issueListReducer.labels];
											const findIndex = newLabelList.findIndex(hadClicked);
											newLabelList.splice(findIndex, 1);
											dispatch(removeLabel(newLabelList));
										} else {
											dispatch(addLabel(label.name));
										}
									}}
								>
									<div
										className={`absolute left-5 top-4 sm:top-[5px] sm:left-[15px] ${
											result.issueListReducer.labels.includes(label.name)
												? 'visible'
												: 'invisible'
										}`}
									>
										<CheckIcon />
									</div>
									<div
										className={`mr-2 mt-1 h-[14px] w-[14px] rounded-[50%] ${
											label.color === 'ffffff'
												? 'border-[1px] border-gray-500'
												: ''
										}`}
										style={{ backgroundColor: `${'#' + label.color}` }}
									></div>
									<div className="flex flex-col">
										<span className="text-[14px] font-semibold sm:text-[12px]">
											{label.name}
										</span>
										<span className="text-[14px] text-[#57606A] sm:text-[12px]">
											{label.description}
										</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	if ($currentClick === 'Assignee')
		return (
			<div className={`${$display ? 'block' : 'hidden'}`}>
				<div
					className="fixed top-0 left-0 h-full w-full bg-black opacity-40 sm:opacity-0"
					onClick={() => {
						$onClick();
						setAssigneeInputValue('');
					}}
				></div>
				<div className="group absolute top-[2%] left-4 right-4 h-[700px] max-h-[700px] max-h-[700px] overflow-auto rounded-lg bg-white sm:top-[30px] sm:left-[95px] sm:z-10 sm:h-fit sm:max-h-[500px] sm:w-[300px] sm:w-[300px] sm:border-x-[1px] sm:border-y-[1px] lg:left-[-140px]">
					<div>
						<div className="flex items-center justify-between border-b-[1px] p-4 text-sm sm:h-[33px] sm:text-[12px] ">
							<div>Filter by Assignee</div>
							<div
								className="cursor-pointer"
								onClick={() => {
									$onClick();
									setAssigneeInputValue('');
								}}
							>
								<XIcon />
							</div>
						</div>
						<div className="flex items-center justify-between border-b-[1px] p-4 sm:p-2">
							<input
								className="h-8 w-full rounded-md border-[1px] border-[#d0d7de] pl-3 text-sm focus:outline-blue-600 "
								placeholder="Filter users"
								onChange={e => setAssigneeInputValue(e.target.value)}
								value={assigneeInputValue}
							/>
						</div>
						<div
							className="relative flex cursor-pointer items-center justify-between p-4 text-[14px] sm:py-[7px] sm:px-[16px] sm:pl-[30px] sm:text-[12px]"
							onClick={() => {
								$onClick();
								setAssigneeInputValue('');
								dispatch(clearAssignee('none'));
							}}
						>
							<div className="pl-5 hover:bg-gray-100 sm:pl-3">
								Assigned to nobody
							</div>
							<div
								className={`absolute sm:left-[12px] ${
									result.issueListReducer.assignee === 'none'
										? 'visible'
										: 'invisible'
								}`}
							>
								<CheckIcon />
							</div>
						</div>
						<ul>
							{$assigneeData
								? $assigneeData.map((data: Assignee) => (
										<li
											key={data.id}
											className={`relative flex cursor-pointer border-y-[1px] p-4 pl-[26px] hover:bg-gray-100 sm:py-[7px] sm:pl-[38px] ${
												assigneeInputValue.trim().length === 0
													? () => {}
													: data.login
															.toLocaleLowerCase()
															.includes(assigneeInputValue)
													? 'flex'
													: 'hidden'
											}`}
											onClick={() => {
												$onClick();
												setAssigneeInputValue('');
												dispatch(addAssignee(data.login));
											}}
										>
											<div className={`mr-2 mt-1 flex pl-3 sm:pl-0`}>
												<img
													src={data.avatar_url}
													alt="avatar"
													className="mr-2 h-5 w-5 rounded-[50%] sm:h-[22px] sm:h-[20px] sm:w-[22px] sm:w-[20px]"
												/>
												<p className="text-sm font-semibold sm:text-xs">
													{data.login}
												</p>
											</div>
											<div
												className={`absolute left-4 sm:left-[13px] ${
													result.issueListReducer.assignee === data.login
														? 'visible'
														: 'invisible'
												}`}
											>
												<CheckIcon />
											</div>
										</li>
								  ))
								: null}
						</ul>
					</div>
				</div>
			</div>
		);
	if ($currentClick === 'Sort')
		return (
			<div className={`${$display ? 'block' : 'hidden'} `}>
				<div
					className="sm: fixed top-0 left-0 h-full w-full bg-black opacity-40 sm:opacity-0"
					onClick={$onClick}
				></div>
				<div className="group absolute top-[2%] left-4 right-4 rounded-lg bg-white sm:top-[30px] sm:left-[12px] sm:left-[210px] sm:z-10  sm:h-fit sm:max-h-[500px] sm:w-[300px] sm:w-[300px] sm:border-x-[1px] sm:border-y-[1px] lg:left-[-65px]">
					<div>
						<div className="flex items-center justify-between border-b-[1px] p-4 sm:h-[33px] sm:text-[12px]">
							<div>Sort by</div>
							<div className="cursor-pointer" onClick={$onClick}>
								<XIcon />
							</div>
						</div>

						<ul>
							{SortbyArr.map((sort, index) => (
								<li
									className="flex  cursor-pointer  border-t-[1px] p-4 pl-[50px] hover:bg-gray-100 sm:py-[7px] sm:pl-[38px] sm:text-xs"
									key={index}
									onClick={() => {
										$onClick();
										dispatch(addSort(sort.action));
									}}
								>
									<div className="relative flex">
										<span
											className={`text-sm  ${
												result.issueListReducer.sort === sort.action
													? 'sm:font-semibold'
													: 'sm:font-normal'
											}`}
										>
											{sort.showText}
										</span>
										<div
											className={`${
												result.issueListReducer.sort === sort.action
													? 'block'
													: 'hidden'
											} top- absolute left-[-30px] top-[-3px]`}
										>
											<div className={`absolute sm:left-[5px] sm:top-[5px] `}>
												<CheckIcon />
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);

	return null;
}

export default IssuePopup;
