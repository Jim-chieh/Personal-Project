import { XIcon } from '@primer/octicons-react';

type IssuePopupProps = {
	$display: boolean;
	$onClick: () => void;
};

function IssuePopup({ $display, $onClick }: IssuePopupProps) {
	if (!$display) return null;

	return (
		<div>
			<div
				className="w-full h-full opacity-40 bg-black fixed top-0"
				onClick={$onClick}
			></div>
			<div className="bg-white absolute top-[2%] left-4 right-4 rounded-lg group">
				<div>
					<div className="flex justify-between items-center p-4 border-b-[1px]">
						<div>Filter by label</div>
						<div className="cursor-pointer" onClick={$onClick}>
							<XIcon />
						</div>
					</div>
					<div className="flex justify-between items-center p-4 border-b-[1px]">
						<input
							className="border-[1px] border-[#d0d7de] focus:outline-blue-600 w-full h-8 rounded-md pl-3 text-sm "
							placeholder="Filter labels"
						/>
					</div>
					<div className="flex justify-between items-center p-4  ">
						<div className="pl-3">Unlabeled</div>
					</div>
					<ul>
						{
							<li className="flex  p-4  pl-[26px] border-t-[1px] ">
								<div className="mr-2 mt-1 w-[14px] h-[14px] rounded-[50%] bg-black"></div>
								<div className="flex flex-col">
									<span className="font-semibold text-[14px] ">
										Filter by label
									</span>
									<span className="text-[14px] text-[#57606A]">
										Filter by label
									</span>
								</div>
							</li>
						}
						<li className="flex p-4  pl-[26px] border-t-[1px] ">
							<div className="mr-2  mt-1 w-[14px] h-[14px] rounded-[50%] bg-black"></div>
							<div className="flex flex-col">
								<span className="font-semibold text-[14px]">
									Filter by label
								</span>
								<span className="text-[14px] text-[#57606A]">
									Filter by label
								</span>
							</div>
						</li>
						<li className="flex p-4  pl-[26px] border-t-[1px] ">
							<div className="mr-2  mt-1 w-[14px] h-[14px] rounded-[50%] bg-black"></div>
							<div className="flex flex-col">
								<span className="font-semibold text-[14px]">
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
}

export default IssuePopup;
