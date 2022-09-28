import { IssueOpenedIcon, CommentIcon } from '@primer/octicons-react';
import SingleLabel from '../Label/SingleLabel';
import { Issues } from '../../redux/IssueListProps';

type IssuesListProps = {
	$data: Issues;
};

function IssueList({ $data }: IssuesListProps) {
	const { title, labels, assignees, comments } = $data;
	if ($data.pull_request !== undefined) return null;
	return (
		<div className="flex justify-between border-b-[1px] border-gray-300 sm:border-x-[1px] sm:last:rounded-b">
			<div className="hidden md:block md:pt-2 md:pl-4">
				<input type="checkbox" />
			</div>
			<div className="flex w-full">
				<div className="pt-2 pl-4">
					<IssueOpenedIcon size={16} fill="#1a7f37" />
				</div>
				<div className="flex w-full justify-between">
					<div className="w-7/12 pt-2 pr-4 pb-2 pl-2">
						<div className="flex flex-wrap ">
							<div className="flex w-full md:w-fit">
								<p className="mr-1 text-sm font-semibold">{title}</p>
							</div>
							{labels === undefined
								? null
								: labels.map(label => (
										<SingleLabel
											key={label.id}
											text={label.name}
											$backgroundColor={'#' + label.color}
										/>
								  ))}
						</div>
						<div>
							<p className="mt-1 text-xs">{`#${1} opend ${4} days ago by Jim-chieh`}</p>
						</div>
					</div>
					<div className="flex w-[40%] justify-end pt-2 pr-4">
						<div className="group hidden h-fit cursor-pointer last:group-hover:mr-0 sm:ml-2 sm:flex sm:w-[15%] sm:justify-end">
							{assignees.length === 0
								? null
								: assignees.map((assignee, index) => (
										<div
											className={`${
												index === assignees.length - 1 ? '' : 'mr-[-12px]'
											} h-fit w-5 transition-all ${
												index === assignees.length - 1
													? ''
													: 'group-hover:mr-[2px]'
											} `}
										>
											<img
												src={assignee.avatar_url}
												className="h-full rounded-[50%]"
												alt="abc"
											/>
										</div>
								  ))}
						</div>
						<div
							className={`hidden justify-end sm:ml-5 sm:flex  sm:w-[16%] sm:${
								comments === 0 ? 'hidden' : 'flex'
							}`}
						>
							<a className="flex h-fit cursor-pointer items-center hover:text-[#0969da]">
								<CommentIcon />
								<p className="ml-1 ">{`${comments}`}</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IssueList;
