import { useState } from 'react';
import { XIcon } from '@primer/octicons-react';
import { GetLabel } from '../../redux/LabelCreateApi';

type IssuePopupProps = {
	$display: boolean;
	$onClick: () => void;
	$currentClick: string;
	$data?: GetLabel[];
};

function IssuePopup({
	$display,
	$onClick,
	$currentClick,
	$data
}: IssuePopupProps) {
	console.log($data);

	if ($currentClick === 'Label')
		return (
			<div className={`${$display ? 'block' : 'hidden'}`}>
				<div
					className="fixed top-0 left-0 h-full w-full bg-black opacity-40"
					onClick={$onClick}
				></div>
				<div className="group absolute top-[2%] left-4 right-4 rounded-lg bg-white">
					<div>
						<div className="flex items-center justify-between border-b-[1px] p-4">
							<div>Filter by label</div>
							<div className="cursor-pointer" onClick={$onClick}>
								<XIcon />
							</div>
						</div>
						<div className="flex items-center justify-between border-b-[1px] p-4">
							<input
								className="h-8 w-full rounded-md border-[1px] border-[#d0d7de] pl-3 text-sm focus:outline-blue-600 "
								placeholder="Filter labels"
							/>
						</div>
						<div className="flex items-center justify-between p-4  ">
							<div className="pl-3">Unlabeled</div>
						</div>
						<ul>
							{$data?.map(label => (
								<li
									className="flex  border-t-[1px]  p-4 pl-[26px]"
									key={label.id}
								>
									<div
										className={`mr-2 mt-1 h-[14px] w-[14px] rounded-[50%] bg-black`}
									></div>
									<div className="flex flex-col">
										<span className="text-[14px] font-semibold ">
											Filter by label
										</span>
										<span className="text-[14px] text-[#57606A]">
											Filter by label
										</span>
									</div>
								</li>
							))}
							<li className="flex border-t-[1px]  p-4 pl-[26px] ">
								<div className="mr-2  mt-1 h-[14px] w-[14px] rounded-[50%] bg-black"></div>
								<div className="flex flex-col">
									<span className="text-[14px] font-semibold">
										Filter by label
									</span>
									<span className="text-[14px] text-[#57606A]">
										Filter by label
									</span>
								</div>
							</li>
							<li className="flex border-t-[1px]  p-4 pl-[26px] ">
								<div className="mr-2  mt-1 h-[14px] w-[14px] rounded-[50%] bg-black"></div>
								<div className="flex flex-col">
									<span className="text-[14px] font-semibold">
										Filter by label
									</span>
									<span className="text-[14px] text-[#57606A]">
										Filter by label
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);

	if ($currentClick === 'Assignee')
		return (
			<div className={`${$display ? 'block' : 'hidden'}`}>
				<div
					className="fixed top-0 left-0 h-full w-full bg-black opacity-40"
					onClick={$onClick}
				></div>
				<div className="group absolute top-[2%] left-4 right-4 rounded-lg bg-white">
					<div>
						<div className="flex items-center justify-between border-b-[1px] p-4">
							<div>Filter by Assignee</div>
							<div className="cursor-pointer" onClick={$onClick}>
								<XIcon />
							</div>
						</div>
						<div className="flex items-center justify-between border-b-[1px] p-4">
							<input
								className="h-8 w-full rounded-md border-[1px] border-[#d0d7de] pl-3 text-sm focus:outline-blue-600 "
								placeholder="Filter labels"
							/>
						</div>
						<div className="flex items-center justify-between p-4  ">
							<div className="pl-3">Unlabeled</div>
						</div>
						<ul>
							{
								<li className="flex  border-t-[1px]  p-4 pl-[26px] ">
									<div
										className={`mr-2 mt-1 h-[14px] w-[14px] rounded-[50%] bg-black`}
									></div>
									<div className="flex flex-col">
										<span className="text-[14px] font-semibold ">
											Filter by label
										</span>
										<span className="text-[14px] text-[#57606A]">
											Filter by label
										</span>
									</div>
								</li>
							}
							<li className="flex border-t-[1px]  p-4 pl-[26px] ">
								<div className="mr-2  mt-1 h-[14px] w-[14px] rounded-[50%] bg-black"></div>
								<div className="flex flex-col">
									<span className="text-[14px] font-semibold">
										Filter by label
									</span>
									<span className="text-[14px] text-[#57606A]">
										Filter by label
									</span>
								</div>
							</li>
							<li className="flex border-t-[1px]  p-4 pl-[26px] ">
								<div className="mr-2  mt-1 h-[14px] w-[14px] rounded-[50%] bg-black"></div>
								<div className="flex flex-col">
									<span className="text-[14px] font-semibold">
										Filter by label
									</span>
									<span className="text-[14px] text-[#57606A]">
										Filter by label
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	if ($currentClick === 'Sort')
		return (
			<div className={`${$display ? 'block' : 'hidden'}`}>
				<div
					className="fixed top-0 left-0 h-full w-full bg-black opacity-40"
					onClick={$onClick}
				></div>
				<div className="group absolute top-[2%] left-4 right-4 rounded-lg bg-white">
					<div>
						<div className="flex items-center justify-between border-b-[1px] p-4">
							<div>Filter by Sort</div>
							<div className="cursor-pointer" onClick={$onClick}>
								<XIcon />
							</div>
						</div>
						<div className="flex items-center justify-between p-4  ">
							<div className="pl-3">Unlabeled</div>
						</div>
						<ul>
							{
								<li className="flex  border-t-[1px]  p-4 pl-[26px] ">
									<div
										className={`mr-2 mt-1 h-[14px] w-[14px] rounded-[50%] bg-black`}
									></div>
									<div className="flex flex-col">
										<span className="text-[14px] font-semibold ">
											Filter by label
										</span>
										<span className="text-[14px] text-[#57606A]">
											Filter by label
										</span>
									</div>
								</li>
							}
							<li className="flex border-t-[1px]  p-4 pl-[26px] ">
								<div className="mr-2  mt-1 h-[14px] w-[14px] rounded-[50%] bg-black"></div>
								<div className="flex flex-col">
									<span className="text-[14px] font-semibold">
										Filter by label
									</span>
									<span className="text-[14px] text-[#57606A]">
										Filter by label
									</span>
								</div>
							</li>
							<li className="flex border-t-[1px]  p-4 pl-[26px] ">
								<div className="mr-2  mt-1 h-[14px] w-[14px] rounded-[50%] bg-black"></div>
								<div className="flex flex-col">
									<span className="text-[14px] font-semibold">
										Filter by label
									</span>
									<span className="text-[14px] text-[#57606A]">
										Filter by label
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);

	return null;
}

export default IssuePopup;
