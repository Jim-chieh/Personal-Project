import {
	IssueOpenedIcon,
	CommentIcon,
	CheckCircleIcon,
	CircleSlashIcon
} from '@primer/octicons-react';
import SingleLabel from '../Label/SingleLabel';
import { Label, Assignee2, User } from '../../redux/IssueListProps';
import IssueTitleHoverPopup from './IssueTitleHoverPopup';

type IssuesListProps = {
	title: string;
	labels: Label[];
	assignees: Assignee2[];
	comments: number;
	number: number;
	created_at: string;
	user: User;
	state: string;
	state_reason: string;
	body: string;
	$index: number;
	currentUser: string;
};

function IssueList({
	title,
	labels,
	assignees,
	comments,
	number,
	created_at,
	user,
	state,
	state_reason,
	body,
	$index,
	currentUser
}: IssuesListProps) {
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
		if (
			days === 0 &&
			hours === 0 &&
			minutes === 0 &&
			seconds >= 0 &&
			seconds < 60
		) {
			result = seconds;
			showDay = 'seconds';
		} else if (days === -1) {
			result = 1;
			showDay = 'seconds';
		} else if (days === 0 && hours === 0 && minutes < 60) {
			result = minutes;
			showDay = 'minutes';
		} else if (days === 0 && hours + 1 < 24) {
			result = hours;
			showDay = 'hours';
			console.log('here1');
		} else if (days !== 0) {
			result = days;
			showDay = 'days';
		} else if (days === 0 && hours + 1 >= 24) {
			result = days + 1;
			showDay = 'day';
		}
		return `#${number} ${state} ${result} ${showDay} ago by ${user.login}`;
	}

	return (
		<div className="flex justify-between border-b-[1px] border-gray-300 sm:min-h-[61px] sm:border-x-[1px] sm:last:rounded-b">
			<div className="hidden md:block md:pt-2 md:pl-4">
				<input type="checkbox" />
			</div>
			<div className="flex w-full">
				<div
					className={`pt-2 pl-4 ${
						state_reason === 'completed' ? 'block' : 'hidden'
					}`}
				>
					<CheckCircleIcon size={16} fill="#8250df" />
				</div>
				<div
					className={`pt-2 pl-4 ${
						state_reason === 'not_planned' ? 'block' : 'hidden'
					}`}
				>
					<CircleSlashIcon size={16} fill="#57606a" />
				</div>
				<div
					className={`pt-2 pl-4 ${state_reason === null ? 'block' : 'hidden'}`}
				>
					<IssueOpenedIcon size={16} fill="#1a7f37" />
				</div>
				<div className="flex w-full justify-between">
					<div className="pt-2 pr-4 pb-2 pl-2 sm:w-7/12">
						<div className="flex flex-wrap ">
							<div className="group relative flex w-full cursor-pointer md:w-fit">
								<p className=" mr-1 flex items-end text-sm font-semibold group-hover:text-[#0969da]">
									{title}
								</p>
								<div className=" z-10 hidden group-hover:block">
									<IssueTitleHoverPopup
										title={title}
										labels={labels}
										assignees={assignees}
										comments={comments}
										number={number}
										created_at={created_at}
										user={user}
										state={state}
										state_reason={state_reason}
										body={body}
										currentLogin={currentUser}
									/>
								</div>
							</div>
							{labels === undefined
								? null
								: labels.map(label => (
										<div key={label.id} className="ml-1">
											<SingleLabel
												text={label.name}
												$backgroundColor={'#' + label.color}
											/>
										</div>
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
							className={`s } sm:ml- hidden justify-end
							sm:flex  sm:w-[16%] `}
						>
							{comments > 0 ? (
								<div className="flex h-fit cursor-pointer items-center hover:text-[#0969da]">
									<CommentIcon />
									<p className="ml-1 ">{`${comments}`}</p>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IssueList;
