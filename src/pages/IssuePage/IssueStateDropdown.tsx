import { CheckIcon } from '@primer/octicons-react';

interface issueStateProps {
	$onClick: () => void;
	stateArr: {
		icon: JSX.Element;
		colorCode: string;
		state: string;
		reason: string;
		showText: string;
		description?: string;
	}[];
	currentState: string;
	$dropDownClick?: (e: string) => void;
	currentClickState: string;
}

function IssueStateDropdown({
	$onClick,
	stateArr,
	currentState,
	$dropDownClick,
	currentClickState
}: issueStateProps) {
	return (
		<div className="">
			<div
				className="fixed top-0 left-0 h-full w-full opacity-0"
				onClick={$onClick}
			></div>
			<div className=" absolute top-[35px] left-[-126px] z-10 min-h-[56px] w-[298px] cursor-pointer overflow-hidden rounded-lg border-[1px] border-[#d0d7de] bg-white">
				{stateArr.map((state, index) =>
					state.reason === currentState ? null : (
						<div
							className={`group  py-2 pl-[30px] pr-2 hover:bg-[#0969da] ${
								(currentState === 'open' && index === 2) ||
								(currentState !== 'open' && index >= 1)
									? 'border-t-[1px] border-[#d0d7de]'
									: ''
							}`}
							key={index.toString() + state.reason}
							onClick={
								$dropDownClick ? () => $dropDownClick(state.reason) : () => {}
							}
						>
							<div
								className={`${state.colorCode} relative flex group-hover:text-white`}
							>
								<div>{state.icon}</div>
								<span className="ml-1 text-[14px] text-black group-hover:text-white">
									{state.showText}
								</span>
								<div
									className={`${
										currentClickState === state.reason ? 'block' : 'hidden'
									} absolute left-[-20px] top-[-3px] text-black group-hover:text-white`}
								>
									<CheckIcon />
								</div>
							</div>
							{currentState === 'open' && (
								<span className="text-xs text-[#57606a] group-hover:text-white">
									{state.description}
								</span>
							)}
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default IssueStateDropdown;
