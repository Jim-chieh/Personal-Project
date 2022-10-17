import {
	IssueOpenedIcon,
	IssueClosedIcon,
	SkipIcon
} from '@primer/octicons-react';

interface issuePageFixedTtitleProps {
	title: string;
	number: number;
	author: string;
	comments: number;
	$created_at: string;
	currentState: string;
}

function IssuePageFixedTtitle({
	title,
	number,
	author,
	comments,
	$created_at,
	currentState
}: issuePageFixedTtitleProps) {
	function checkTime() {
		const createAt = new Date($created_at as string).getTime();
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
			if (hours === 1) {
				result = hours;
				showDay = 'hour ago';
			} else {
				result = hours;
				showDay = 'hours ago';
			}
		} else if (days === 1 || hours + 1 >= 24) {
			result = '';
			showDay = 'yesterday';
		} else if (days !== 0) {
			result = days;
			showDay = 'days ago';
		}
		return `opened this issue ${result} ${showDay} · ${comments} comments`;
	}
	return (
		<div className=" h-[60px] w-full border-b-[1px] border-b-[#d0d7de] bg-white ">
			<div className="mx-auto flex h-full w-full max-w-[1216px] items-center pl-4">
				<div
					className={`mr-1 h-8  shrink-0 rounded-2xl ${
						currentState === 'open'
							? 'bg-[#2da44e]'
							: currentState === 'completed'
							? 'bg-[#8250df]'
							: 'bg-[#6e7781]'
					}  px-3 py-[5px] text-[14px] text-[#ffffff]`}
				>
					{currentState === 'open' ? (
						<IssueOpenedIcon />
					) : currentState === 'completed' ? (
						<IssueClosedIcon />
					) : currentState === 'not_planned' ? (
						<SkipIcon />
					) : null}
					{currentState === 'open' ? (
						<span className="ml-1">Open</span>
					) : (
						<span className="ml-1">Closed</span>
					)}
				</div>
				<div className=" flex flex-col justify-center">
					<div className="text-[14px]">
						<span className="pr-1 font-semibold">{title}</span>
						<span className="text-[#6c747d]">#{number}</span>
					</div>
					<div className="text-[12px]">
						<span className="pr-1 font-semibold">{author}</span>
						<span className="text-[#6c747d]">{checkTime()}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IssuePageFixedTtitle;
