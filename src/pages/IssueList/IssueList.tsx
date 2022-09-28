import { IssueOpenedIcon, CommentIcon } from '@primer/octicons-react';
import SingleLabel from '../Label/SingleLabel';

function IssueList() {
	return (
		<div className="flex border-b-[1px] border-gray-300 sm:border-x-[1px] sm:last:rounded-b">
			<div className="hidden md:pt-2 md:pl-4 md:block">
				<input type="checkbox" />
			</div>
			<div className="flex w-full">
				<div className="pt-2 pl-4">
					<IssueOpenedIcon size={16} fill="#1a7f37" />
				</div>
				<div className="flex justify-between w-full">
					<div className="pt-2 pr-4 pb-2 pl-2 w-7/12">
						<div className="flex flex-wrap ">
							<div className="flex w-full md:w-fit">
								<p className="font-semibold text-sm mr-1">TEST</p>
							</div>
							<SingleLabel text={'test'} $backgroundColor={'#ff0000'} />
						</div>
						<div>
							<p className="text-xs mt-1">{`#${1} opend ${4} days ago by Jim-chieh`}</p>
						</div>
					</div>
					<div className="pt-2 pr-4 flex">
						<div className="hidden h-fit sm:flex sm:ml-2 group cursor-pointer">
							<div className="h-fit w-5 mr-[-12px] group-hover:mr-[2px] transition-all">
								{/* <img src={img} className="h-full rounded-[50%]" /> */}
							</div>
							<div className="h-fit w-5 mr-[-12px] group-hover:mr-[2px] transition-all">
								{/* <img src={img} className="h-full rounded-[50%] " /> */}
							</div>
							<div className="h-fit w-5">
								{/* <img src={img} className="h-full rounded-[50%] " /> */}
							</div>
						</div>
						<div className="hidden sm:flex  sm:ml-5 ">
							<a className="flex h-fit items-center hover:text-[#0969da] cursor-pointer">
								<CommentIcon />
								<p className="ml-1 ">{`${1}`}</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IssueList;
