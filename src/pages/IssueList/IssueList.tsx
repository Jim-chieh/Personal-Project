import { IssueOpenedIcon, CommentIcon } from '@primer/octicons-react';
import SingleLabel from '../Label/SingleLabel';
import { Issues } from '../../redux/IssueListProps';
import IssueTitleHoverPopup from './IssueTitleHoverPopup';

type IssuesListProps = {
	$data: Issues;
	$index: number;
};

function IssueList({ $data, $index }: IssuesListProps) {
	const { title, labels, assignees, comments, number, created_at, user } =
		$data;

	function checkTime() {
		const createAt = new Date(created_at).getTime();
		const currentTimeStamp = new Date().getTime();
		const date = currentTimeStamp - createAt;
		const days = Math.floor(date / (24 * 3600 * 1000));
		const leave1 = date % (24 * 3600 * 1000);
		const hours = Math.floor(leave1 / (3600 * 1000));
		const leave2 = leave1 % (3600 * 1000);
		const minutes = Math.floor(leave2 / (60 * 1000));
		const leave3 = leave2 % (60 * 1000);
		const seconds = Math.round(leave3 / 1000);
		let result;
		let showDay = '';
		if (days !== 0) {
			result = days;
			if (days === 1) {
				showDay = 'day';
			} else {
				showDay = 'days';
			}
		} else if (days === 0 && hours === 0 && minutes === 0 && seconds < 60) {
			result = seconds;
			showDay = 'seconds';
		} else if (days === 0 && hours === 0 && minutes < 60) {
			result = minutes;
			showDay = 'minutes';
		} else if (days === 0 && hours + 1 < 24) {
			result = hours;
			showDay = 'hours';
		} else if (days === 0 && hours + 1 >= 24) {
			result = days + 1;
			showDay = 'day';
		}
		return `#${number} opened ${result} ${showDay} ago by ${user.login}`;
	}

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
					<div className="pt-2 pr-4 pb-2 pl-2 sm:w-7/12">
						<div className="flex flex-wrap md:relative">
							<div className="group flex w-full cursor-pointer md:w-fit">
								<p className="mr-1 text-sm font-semibold">{title}</p>
								<div className="z-10 hidden group-hover:block">
									<IssueTitleHoverPopup />
								</div>
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
							<p className="mt-1 text-xs">{checkTime()}</p>
						</div>
					</div>
					<div className="hidden sm:flex sm:w-[40%] sm:justify-end sm:pt-2 sm:pr-4">
						<div className="flex-warp group hidden h-fit cursor-pointer last:group-hover:mr-0 sm:ml-2 sm:flex sm:w-[19%] sm:justify-end">
							{assignees.length === 0
								? null
								: assignees.map((assignee, index) => (
										<div
											key={index}
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
