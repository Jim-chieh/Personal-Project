import { Assignee2, Issues, Label, User } from '../../redux/IssueListProps';
import SingleLabel from '../Label/SingleLabel';
import {
	CheckCircleIcon,
	IssueOpenedIcon,
	CircleSlashIcon
} from '@primer/octicons-react';

type HoverPopupProps = {
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
	currentLogin: string;
};

function IssueTitleHoverPopup({
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
	currentLogin
}: HoverPopupProps) {
	const toNewDate = new Date(created_at);
	const dateToString = toNewDate.toString();
	const dateSplit = dateToString.split(' ');

	return (
		<div
			className=" absolute  left-[-20px]  md:block"
			style={{
				top: `${
					currentLogin !== user.login && body !== null && labels.length !== 0
						? '-150px'
						: currentLogin !== user.login &&
						  body === null &&
						  labels.length === 0
						? '-115px'
						: currentLogin !== user.login &&
						  body !== null &&
						  labels.length === 0
						? '-125px'
						: labels.length !== 0 && body !== null
						? '-190px'
						: labels.length === 0 && body === null
						? '-145px'
						: labels.length === 0 && body !== null
						? '-165px'
						: '-165px'
				}`
			}}
		>
			<div className="  min-w-[320px] rounded-md border-[1px] bg-white">
				<div className="absolute bottom-[-11px] left-7 z-10 h-0 w-0 border-l-[8px] border-t-[12px] border-r-[8px] border-x-transparent border-t-white"></div>
				<div className=" absolute bottom-[-12px] left-[27px] h-0 w-0 border-l-[9px] border-t-[13px] border-r-[10px] border-x-transparent border-t-gray-300"></div>
				<div
					className={`p-4 pb-2 ${currentLogin !== user.login ? 'mb-2' : ''}`}
				>
					<div className="mb-3 flex text-gray-500">
						<a href="789456" className="mr-1 text-xs">
							{user.login}{' '}
						</a>
						<p className="text-xs">{`on ${dateSplit[1]}${' '}${
							dateSplit[2]
						}`}</p>
					</div>
					<div className="flex  text-sm">
						{state_reason === null ? (
							<IssueOpenedIcon fill={'#1a7f37'} />
						) : state_reason === 'not_planned' ? (
							<CircleSlashIcon fill={'#57606a'} />
						) : (
							<CheckCircleIcon fill={'#8250df'} />
						)}
						<div className="ml-2 flex">
							{title}
							<p className="ml-2">{'#' + number}</p>
						</div>
					</div>
					<div>
						<span
							className={`ml-6 mt-2 h-[15px] overflow-hidden text-xs text-gray-500 ${
								body === null ? 'hidden' : 'block'
							}`}
						>
							{body}
						</span>
					</div>
					<div className="mt-1 flex pl-5 text-xs">
						{labels.map((label, index) =>
							index >= 3 ? null : (
								<div className="mr-[2px] flex" key={index}>
									<SingleLabel
										text={label.name}
										$backgroundColor={'#' + label.color}
									/>
								</div>
							)
						)}
						{labels.length > 3 ? (
							<div className=" ml-1 flex items-center text-gray-400">+more</div>
						) : null}
					</div>
				</div>
				<div
					className={`border-t-[1px] p-4 ${
						currentLogin !== user.login ? 'hidden' : 'block'
					}`}
				>
					<div className="flex">
						<div className="mr-2 h-5 w-5">
							<img
								className="h-full w-full rounded-[50%]"
								src={user.avatar_url}
								alt="user_picture"
							/>
						</div>
						<p className="text-xs text-gray-500">You opened</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IssueTitleHoverPopup;
