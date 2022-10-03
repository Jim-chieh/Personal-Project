import { TriangleDownIcon } from '@primer/octicons-react';
import { GetLabel } from '../../redux/LabelCreateApi';
import { Assignee } from '../../redux/IssueListProps';
import IssuePopup from './IssuePopup';

type FilterListNavProps = {
	filterArr: string[];
	$setDisplayFalse: () => void;
	$setDisplayTrue: () => void;
	$display: boolean;
	$setCurrentClick: (e: string) => void;
	$labelData: GetLabel[];
	$assigneeData: Assignee[];
	SortbyArr: {
		showText: string;
		action: string;
	}[];
	$currentClick: string;
};

function FilterListNav({
	filterArr,
	$setDisplayFalse,
	$setDisplayTrue,
	$display,
	$setCurrentClick,
	$labelData,
	$assigneeData,
	SortbyArr,
	$currentClick
}: FilterListNavProps) {
	return (
		<div className="flex w-full justify-between sm:relative sm:justify-start lg:w-fit">
			{filterArr.map((text, index) => (
				<div key={`${index}-${text}`}>
					<div
						className={`flex cursor-pointer items-center ${
							filterArr.length - 1 === index ? 'pl-4' : 'px-4'
						} text-[14px] text-[#6a727b]`}
						onClick={() => {
							$setDisplayTrue();
							$setCurrentClick(text);
						}}
					>
						{text}
						<div className="hidden sm:flex">
							<TriangleDownIcon />
						</div>
					</div>
				</div>
			))}
			<IssuePopup
				$display={$display}
				$currentClick={$currentClick}
				$onClick={() => {
					$setDisplayFalse();
				}}
				$labelData={$labelData}
				$assigneeData={$assigneeData}
				SortbyArr={SortbyArr}
			/>
		</div>
	);
}

export default FilterListNav;
