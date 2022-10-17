import { useState } from 'react';
import IssuePopup from '../IssueList/IssuePopup';
import { PopupDataProps } from '../IssueList/IssueListPage';
import SingleLabel from '../Label/SingleLabel';

type IssueActionsProps = {
	action: {
		title: string;
		icon?: JSX.Element | string;
		currentClick?: string[];
		currentLogin?: string;
		outerOnclick?: () => void;
		content?: {
			$background?: string;
			title?: string;
			description?: string;
			header?: string;
			picture?: string;
			showText?: string;
			action?: string;
			participants?: string;
		}[];
		description?: string | JSX.Element;
		more?: string;
		outerLink?: JSX.Element;
		noHoverEffect?: boolean;
		popupData?: PopupDataProps;
	};
	index: number;
};

function IssueActions({ action, index }: IssueActionsProps) {
	const [display, setDisplay] = useState(false);
	function returnNothing() {
		return null;
	}
	return (
		<div className="relative mt-6 md:mt-0 md:w-[240px]">
			<div
				className={`${
					index === 0 ? 'pt-4' : 'mt-4 border-t-[1px] border-[#d8dee4] pt-4 '
				}`}
			>
				<div
					className="group mb-1 flex cursor-pointer justify-between py-1 "
					onClick={() => setDisplay(!display)}
				>
					<span
						className={`cursor-pointer  text-xs  text-[#565f69] ${
							action.noHoverEffect
								? 'cursor-text'
								: 'group-hover:text-[#0969da]'
						} `}
					>
						{action.title}
					</span>
					<div className="text-xs text-[#57606a] group-hover:text-[#0969da]">
						{action.icon}
					</div>
				</div>
				<div
					className={`${
						action.title === 'Assignees' ? 'block' : 'flex'
					} flex-wrap`}
				>
					{action.content === undefined ? (
						action.outerLink
					) : action.content.length === 0 ||
					  action.currentClick?.length === 0 ? (
						<div className="text-xs">
							{action.description}
							<span
								className="cursor-pointer text-[#57606a] hover:text-[#0969da]"
								onClick={() => {
									action.popupData?.addDispatch(action.currentLogin as string);
								}}
							>
								{action.more}
							</span>
						</div>
					) : (
						action.content.map((item, index) => (
							<div key={index}>
								{item.picture && item.header && (
									<div
										className={`mt-2 items-center ${
											action.currentClick?.includes(item.header as string)
												? 'flex'
												: 'hidden'
										}`}
									>
										<img
											className="cursour-pointer mr-1 h-5 w-5 rounded-[50%]"
											src={item.picture}
											alt="user avatar"
										/>
										<p className="cursor-pointer text-xs font-semibold hover:text-[#0969da]">
											{item.header}
										</p>
									</div>
								)}
								{item.$background && item.title && (
									<div
										className={` ${
											action.currentClick?.includes(item.title)
												? 'flex'
												: 'hidden'
										} mr-1 `}
									>
										<SingleLabel
											text={item.title}
											$backgroundColor={'#' + item.$background}
										/>
									</div>
								)}
								{item.participants && (
									<img
										className="cursour-pointer mr-1 h-[26px] w-[26px] rounded-[50%] border-[1px] border-[#dddede]"
										src={item.participants}
										alt="user avatar"
									/>
								)}
							</div>
						))
					)}
				</div>
			</div>
			<div
				className={`absolute ${action.popupData?.lgLeft}  ${action.popupData?.lgTop} left-0 right-0 top-0`}
			>
				<IssuePopup
					$display={display}
					$onClick={() => {
						setDisplay(false);
					}}
					$onBlurEffectClick={() => {
						action.outerOnclick ? action.outerOnclick() : returnNothing();
					}}
					$menuData={action.popupData}
					$stillShowOnMdSize={action.popupData?.$stillShowOnMdSize}
					$shouldhasXIcon={action.popupData?.$shouldhasXIcon}
				/>
			</div>
		</div>
	);
}

export default IssueActions;
