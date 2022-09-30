import { XIcon, CheckIcon, RepoIcon } from '@primer/octicons-react';
import { useDispatch } from 'react-redux';
import { addFilter } from '../../redux/issueSlice';
import { useState } from 'react';

const filterArr = [
	{ showText: 'Your issues', action: `&creator=Jim-chieh` },
	{ showText: 'Everything assigned to you', action: '&assignee=Jim-chieh' },
	{ showText: 'Everything mentioning you', action: '&mentioned=Jim-chieh' }
];

type FilterPopupProps = {
	$display: boolean;
	$onClick: () => void;
	$current: string;
};

function FilterPopup({ $display, $onClick, $current }: FilterPopupProps) {
	const dispatch = useDispatch();
	const [currentIndex, setCurrentIndex] = useState();
	return (
		<div className={`${$display ? 'block' : 'hidden'}`}>
			<div
				className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-40 sm:opacity-0"
				onClick={$onClick}
			></div>
			<div className="group absolute top-[25%] left-4 right-4 z-30 rounded-lg bg-white sm:top-[40px] sm:left-[0px] sm:w-[300px] sm:border-y-[1px] sm:border-x-[1px]">
				<div>
					<div className="flex items-center justify-between p-4 sm:py-2 sm:text-xs	">
						<div>Filter Issues</div>
						<div className="cursor-pointer" onClick={$onClick}>
							<XIcon />
						</div>
					</div>
					{filterArr.map((filter, index) => {
						return (
							<div
								className="flex cursor-pointer items-center justify-start border-t-[1px] p-4 hover:bg-gray-100 sm:py-2"
								key={index}
								onClick={() => {
									dispatch(addFilter(filter.action));
									$onClick();
								}}
							>
								<div
									className={`absolute ${
										filter.action === $current ? 'block' : 'hidden'
									}`}
								>
									<CheckIcon />
								</div>
								<div className="pl-8 text-sm sm:text-xs">{filter.showText}</div>
							</div>
						);
					})}
					<a
						href="https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests"
						target="_blank"
						rel="noreferrer"
					>
						<div className="flex items-center justify-start border-t-[1px] p-4 sm:py-2">
							<div className="absolute">
								<RepoIcon />
							</div>
							<div className="pl-8 text-sm font-semibold sm:text-xs">
								View advanced search syntax
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	);
}

export default FilterPopup;
