import { XIcon, CheckIcon, RepoIcon } from '@primer/octicons-react';

const filterArr = [
	'Open issues and pull requests',
	'Your issues',
	'Your pull requests',
	'Everything assigned to you',
	'Everything mentioning you'
];

type FilterPopupProps = {
	$display: boolean;
	$onClick: () => void;
};

function FilterPopup({ $display, $onClick }: FilterPopupProps) {
	return (
		<div className={`${$display ? 'block' : 'hidden'}`}>
			<div
				className="w-full h-full opacity-40 bg-black fixed top-0 left-0 z-10"
				onClick={$onClick}
			></div>
			<div className="bg-white absolute top-[25%] left-4 right-4 rounded-lg group z-30">
				<div>
					<div className="flex justify-between items-center p-4 ">
						<div>Filter Issues</div>
						<div className="cursor-pointer" onClick={$onClick}>
							<XIcon />
						</div>
					</div>
					{filterArr.map((filter, index) => {
						return (
							<div
								className="flex justify-start items-center p-4 border-t-[1px]"
								key={index}
							>
								<div className="absolute">
									<CheckIcon />
								</div>
								<div className="pl-8 text-[14px]">{filter}</div>
							</div>
						);
					})}
					<a
						href="https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests"
						target="_blank"
						rel="noreferrer"
					>
						<div className="flex justify-start items-center p-4 border-t-[1px]">
							<div className="absolute">
								<RepoIcon />
							</div>
							<div className="pl-8 text-[14px] font-semibold">
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
