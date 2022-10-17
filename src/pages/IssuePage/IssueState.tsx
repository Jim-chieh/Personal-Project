import {
	IssueOpenedIcon,
	IssueClosedIcon,
	SkipIcon
} from '@primer/octicons-react';

interface IssueStateProps {
	$author: string;
	$created_at: string;
	$comments: number;
	currentState: string;
}

function IssueState({
	$author,
	$created_at,
	$comments,
	currentState
}: IssueStateProps) {
	function checkTime() {
		const createAt = new Date($created_at).getTime();
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
			showDay = 'seconds ago';
		} else if (days === -1) {
			result = 1;
			showDay = 'seconds ago';
		} else if (days === 0 && hours === 0 && minutes < 60) {
			result = minutes;
			showDay = 'minutes ago';
		} else if (days === 0 && hours + 1 < 24) {
			result = hours;
			showDay = 'hours ago';
		} else if (days === 1 || hours + 1 >= 24) {
			result = '';
			showDay = 'yesterday';
		} else if (days !== 0) {
			result = days;
			showDay = 'days ago';
		}
		return `opened this issue ${result} ${showDay} · ${$comments} comments`;
	}
	return (
		<div className="mb-4 flex w-[100%] flex-wrap ">
			<span
				className={`mr-2 flex w-auto rounded-2xl ${
					currentState === 'open'
						? 'bg-[#2da44e]'
						: currentState === 'completed'
						? 'bg-[#8250df]'
						: 'bg-[#6e7781]'
				}  px-3 py-[5px] `}
			>
				<div className="flex items-center text-sm text-white">
					{currentState === 'open' ? (
						<IssueOpenedIcon />
					) : currentState === 'completed' ? (
						<IssueClosedIcon />
					) : currentState === 'not_planned' ? (
						<SkipIcon />
					) : null}
					{currentState === 'open' ? (
						<p className="ml-1">Open</p>
					) : (
						<p className="ml-1">Closed</p>
					)}
				</div>
			</span>
			<div className="mt-[5px]  text-[14px]">
				<span className="pr-1  font-semibold">{$author}</span>
				<span className=" text-[#6c747d]">{checkTime()}</span>
			</div>
		</div>
	);
}

export default IssueState;
