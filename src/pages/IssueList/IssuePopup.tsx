import { useState } from 'react';
import { XIcon, CheckIcon } from '@primer/octicons-react';
import { GetLabel } from '../../redux/LabelCreateApi';
import { Issues } from '../../redux/IssueListProps';

type IssuePopupProps = {
	$display: boolean;
	$onClick: () => void;
	$currentClick: string;
	$labelData?: GetLabel[];
	$assigneeData?: Issues;
};

const SortbyArr = [
	'Newest',
	'Oldest',
	'Most commented',
	'Least commented',
	'Recently updated',
	'Least recently updated'
];

function IssuePopup({
	$display,
	$onClick,
	$currentClick,
	$labelData,
	$assigneeData
}: IssuePopupProps) {
	const [checkIconActive, setCheckIconActive] = useState(0);
	if ($currentClick === 'Label')
		return (
			<div className={`${$display ? 'block' : 'hidden'} `}>
				<div
					className=" fixed top-0 left-0 h-full w-full bg-black opacity-40 sm:opacity-0"
					onClick={$onClick}
				></div>
				<div className="group	absolute top-[2%] left-4 right-4 max-h-[700px] overflow-auto rounded-lg bg-white sm:top-[30px] sm:left-[12px] sm:h-[400px] sm:max-h-fit sm:w-[300px] sm:w-[300px] sm:border-x-[1px] sm:border-y-[1px] lg:left-[-245px]">
					<div>
						<div className="flex items-center justify-between  border-b-[1px] p-4 text-sm sm:h-[33px] sm:text-xs">
							<div>Filter by label</div>
							<div className="cursor-pointer" onClick={$onClick}>
								<XIcon />
							</div>
						</div>
						<div className="flex items-center justify-between border-b-[1px] p-4 sm:p-2">
							<input
								className="h-8 w-full rounded-md border-[1px] border-[#d0d7de] pl-3 text-sm focus:outline-blue-600 sm:h-8"
								placeholder="Filter labels"
							/>
						</div>
						<div className=" flex cursor-pointer items-center justify-between p-4 text-sm hover:bg-gray-100 sm:py-[7px] sm:px-[16px] sm:text-[12px]">
							<div className="pl-[32px] sm:pl-[25px] ">Unlabeled</div>
						</div>
						<ul>
							{$labelData?.map(label => (
								<li
									className="relative flex cursor-pointer  border-t-[1px] p-4 pl-[50px] hover:bg-gray-100 sm:py-[7px] sm:pl-[40px]"
									key={label.id}
								>
									<div className="absolute left-5 top-4 sm:top-[5px] sm:left-[15px]">
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
					onClick={$onClick}
				></div>
				<div className="group absolute	 top-[2%] left-4 right-4 max-h-[700px] overflow-auto rounded-lg bg-white sm:top-[30px] sm:left-[95px] sm:h-fit sm:max-h-[500px] sm:w-[300px] sm:w-[300px] sm:border-x-[1px] sm:border-y-[1px] lg:left-[-140px]">
					<div>
						<div className="flex items-center justify-between border-b-[1px] p-4 text-sm sm:h-[33px] sm:text-[12px]">
							<div>Filter by Assignee</div>
							<div className="cursor-pointer" onClick={$onClick}>
								<XIcon />
							</div>
						</div>
						<div className="flex items-center justify-between border-b-[1px] p-4 sm:p-2">
							<input
								className="h-8 w-full rounded-md border-[1px] border-[#d0d7de] pl-3 text-sm focus:outline-blue-600 "
								placeholder="Filter users"
							/>
						</div>
						<div className="relative flex items-center justify-between p-4 text-[14px] sm:py-[7px] sm:px-[16px] sm:pl-[30px] sm:text-[12px]">
							<div className="pl-5 sm:pl-3 ">Assigned to nobody</div>
							<div className="absolute sm:left-[12px]">
								<CheckIcon />
							</div>
						</div>
						<ul>
							{$assigneeData?.user === undefined ? null : (
								<li className="relative  flex border-y-[1px] p-4 pl-[26px] sm:py-[7px] sm:pl-[38px]">
									<div className={`mr-2 mt-1 flex pl-3 sm:pl-0`}>
										<img
											src={$assigneeData?.user.avatar_url}
											alt="avatar"
											className="mr-2 h-5 w-5 rounded-[50%] sm:h-[22px] sm:h-[20px] sm:w-[22px] sm:w-[20px]"
										/>
										<p className="text-sm font-semibold sm:text-xs">
											{$assigneeData?.user.login}
										</p>
									</div>
									<div className="absolute left-4 sm:left-[13px]">
										<CheckIcon />
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		);
	if ($currentClick === 'Sort')
		return (
			<div className={`${$display ? 'block' : 'hidden'} `}>
				<div
					className="sm: fixed top-0 left-0 h-full w-full bg-black opacity-40 opacity-0"
					onClick={$onClick}
				></div>
				<div className="group absolute top-[2%] left-4 right-4 rounded-lg bg-white sm:top-[30px] sm:left-[12px] sm:left-[210px] sm:h-fit  sm:max-h-[500px] sm:w-[300px] sm:w-[300px] sm:border-x-[1px] sm:border-y-[1px] lg:left-[-65px]">
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
									className="flex  border-t-[1px]  p-4 pl-[50px] sm:py-[7px] sm:pl-[38px] sm:text-xs"
									key={index}
									onClick={() => {
										setCheckIconActive(index);
										$onClick();
									}}
								>
									<div className="relative flex">
										<span className="text-sm font-semibold sm:font-normal">
											{sort}
										</span>
										<div
											className={`${
												checkIconActive === index ? 'block' : 'hidden'
											} top- absolute left-[-30px] top-[-3px]`}
										>
											<div className="absolute sm:left-[5px] sm:top-[5px]">
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
