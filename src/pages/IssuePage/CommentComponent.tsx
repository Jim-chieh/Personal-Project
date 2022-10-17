import {
	KebabHorizontalIcon,
	SmileyIcon,
	IssueReopenedIcon,
	IssueClosedIcon,
	SkipIcon
} from '@primer/octicons-react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import BlurEffect from '../../components/BlurEffect';
import DropDown from '../../components/Header/Repo/Dropdown';
import { useState, useEffect } from 'react';
import CreateCommentComponent from '../NewIssue/CreateCommentComponent';
import {
	useSingleIssueUpdateMutation,
	useCommentUpdateMutation,
	useCommentDeleteMutation,
	commentDelte
} from '../../redux/singleIssueApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '../../redux/store';
import RenderEmoji from './RenderEmoji';
import { Reactions } from '../../redux/singleIssueProp';

interface CommentComponent {
	$avatar?: string;
	$created_at?: string;
	$author_association?: string;
	$author: string;
	$currentLogin: string;
	$body: string;
	currentIndex: number;
	currentBody: string;
	commentId?: number;
	$reactions?: Reactions;
}
const ActionArr = [
	'Copy link',
	'Quote reply',
	'Reference in new issue',
	'Edit',
	'Hide',
	'Delete',
	'Report content'
];

function CommentComponent({
	$avatar,
	$created_at,
	$author_association,
	$author,
	$currentLogin,
	$body,
	currentIndex,
	currentBody,
	commentId,
	$reactions
}: CommentComponent) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [textInputValue, setTextInputValue] = useState(currentBody);
	const [singleIssueUpdate] = useSingleIssueUpdateMutation();
	const [commentUpdate] = useCommentUpdateMutation();
	const [commentDelete] = useCommentDeleteMutation();
	const [isFetching, setIsFetching] = useState(false);
	const userData = useSelector((store: RootState) => store.loginReducer);
	useEffect(() => {
		setTextInputValue(currentBody);
	}, [$avatar]);
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
		} else if (days === 1) {
			result = '';
			showDay = 'yesterday';
		} else if (days !== 0) {
			result = days;
			showDay = 'days ago';
		}
		return `commented ${result} ${showDay} `;
	}

	function handleDropdownClick(e: string) {
		if (e === 'Edit') {
			setEditOpen(true);
			setDropdownOpen(false);
		} else if (e === 'Delete') {
			if (window.confirm('Are you sure you want to delete this?')) {
				commentDelete({
					name: 'Jim-chieh',
					repo: 'webpack',
					token: userData.token,
					id: commentId?.toString() as string
				});
				setDropdownOpen(false);
			}
		}
	}

	async function handleUpdateClick() {
		if (currentIndex === 0) {
			setIsFetching(true);
			await singleIssueUpdate({
				name: 'Jim-chieh',
				repo: 'webpack',
				token: userData.token,
				body: textInputValue,
				id: commentId?.toString() as string
			});
			setEditOpen(false);
			setIsFetching(true);
		} else {
			setIsFetching(true);
			await commentUpdate({
				name: 'Jim-chieh',
				repo: 'webpack',
				token: userData.token,
				body: textInputValue,
				id: commentId?.toString() as string
			});
			setEditOpen(false);
			setIsFetching(false);
		}
	}

	const array = [];
	for (const [key, value] of Object.entries($reactions as Reactions)) {
		if (key !== 'url' && key !== 'total_count' && value !== 0) {
			array.push(
				<RenderEmoji type={key} number={value} key={key + value.toString()} />
			);
		}
	}

	return (
		<div className="z-5 relative pb-8 before:absolute before:bottom-0 before:top-0 before:left-[20px] before:z-0 before:w-[2px] before:bg-[#d8dee4]">
			<div
				className={`${
					editOpen ? 'hidden' : 'block'
				} relative rounded-md border-[1px] border-[#dce1e6] md:mr-3 ${
					$author === $currentLogin ? 'border-[#bbdfff]' : 'border-[#d0d7de]'
				} `}
			>
				<div className="absolute left-[-60px] hidden h-10 w-10 md:block">
					<img src={$avatar} alt="userAvatar" className="rounded-[50%]" />
				</div>
				<div
					className={`border-r-gray ${
						$author === $currentLogin
							? 'border-r-[#bbdfff]'
							: 'border-r-[#d0d7de]'
					}  absolute left-[-8px] top-[11px] hidden border-y-[8px] border-r-[8px] border-l-0 border-solid border-y-transparent md:block`}
				></div>
				<div
					className={`absolute left-[-6px] top-[11px] hidden border-y-[8px] border-r-[8px] border-l-0 border-solid border-y-transparent border-r-white md:block  ${
						$author === $currentLogin
							? 'border-r-[#ddf4ff]'
							: 'border-r-[#f6f8fa]'
					}`}
				></div>
				<div
					className={`flex h-9 items-center justify-between rounded-t-md border-b-[1px] border-b-[#dce1e6] px-4 text-sm ${
						$author === $currentLogin ? 'bg-[#ddf4ff]' : 'bg-[#f6f8fa]'
					}`}
				>
					<div className="flex">
						<div className=" mr-1 font-semibold">{`${$author} `}</div>
						<div className="text-[#57606a]">{checkTime()}</div>
					</div>
					<div className="flex">
						{$author_association !== 'NONE' && (
							<>
								<div
									className={`ml-1 hidden items-center rounded-xl border-[1px] px-[7px] text-xs text-[#57606a] sm:flex ${
										$author === $currentLogin
											? 'border-[#a7d8ff]'
											: 'border-[#d0d7de]'
									} `}
								>
									{($author_association?.[0] as string) +
										$author_association?.slice(1).toLowerCase()}
								</div>
								{$author_association === 'OWNER' && currentIndex !== 0 && (
									<div
										className={`ml-1 hidden items-center rounded-xl border-[1px] px-[7px] text-xs text-[#57606a] sm:flex ${
											$author === $currentLogin
												? 'border-[#a7d8ff]'
												: 'border-[#d0d7de]'
										} `}
									>
										{'Author'}
									</div>
								)}
							</>
						)}
						<div className="ml-2 hidden cursor-pointer text-[#57606a] hover:text-[#277bde] md:block">
							<SmileyIcon />
						</div>

						<div className="ml-2 cursor-pointer ">
							<div
								className="text-[#57606a] hover:text-[#277bde]"
								onClick={() => setDropdownOpen(true)}
							>
								<KebabHorizontalIcon />
							</div>
							<DropDown
								array={ActionArr}
								$isActive={dropdownOpen}
								top={'35px'}
								right={'5px'}
								onClick={e => handleDropdownClick(e)}
								$isNotLabelPage={true}
								firstChild={currentIndex}
							/>
							<BlurEffect
								open={dropdownOpen ? 'block' : 'none'}
								onClick={() => setDropdownOpen(false)}
							/>
						</div>
					</div>
				</div>
				<div className={` rounded-b-md  bg-white p-4`}>
					<ReactMarkdown children={$body} remarkPlugins={[gfm]} />
				</div>
				<div
					className={`${
						$reactions?.total_count === 0 ? 'hidden' : 'flex'
					} flex-wrap bg-white px-4 pb-4`}
				>
					<div className="mr-1 flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-xl border-[1px] border-[#d3d4d7] bg-[#f6f8fa] hover:border-[#d3d4d7] hover:bg-[#f3f4f6]">
						<SmileyIcon fill="#57606a" />
					</div>
					{array.map(item => item)}
				</div>
			</div>
			<div
				className={`${editOpen ? 'block' : 'hidden'} bg-white ${
					isFetching ? 'opacity-80' : ''
				}`}
			>
				<CreateCommentComponent
					$avatarUrl={$avatar as string}
					$shouldHasTitle={false}
					$createBtnClick={() => handleUpdateClick()}
					$isFetching={false}
					$shouldHasDescription={false}
					$shouldHideOnMobile={false}
					$shouldHasCloseBtn={false}
					$checkTitleOrBodyIsEmpty={'body'}
					$buttonName={'Update comment'}
					$shouldHasCancelBtn
					$cancelBtnClick={() => {
						setTextInputValue(currentBody);
						setEditOpen(false);
					}}
					currentBody={textInputValue}
					textInputOnCange={(e: string) => setTextInputValue(e)}
					commentId={commentId}
					$isAuthor={$author_association === 'OWNER'}
				/>
			</div>
		</div>
	);
}

export default CommentComponent;
