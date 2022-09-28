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
				className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-40"
				onClick={$onClick}
			></div>
			<div className="group absolute top-[25%] left-4 right-4 z-30 rounded-lg bg-white">
				<div>
					<div className="flex items-center justify-between p-4 ">
						<div>Filter Issues</div>
						<div className="cursor-pointer" onClick={$onClick}>
							<XIcon />
						</div>
					</div>
					{filterArr.map((filter, index) => {
						return (
							<div
								className="flex items-center justify-start border-t-[1px] p-4"
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
						<div className="flex items-center justify-start border-t-[1px] p-4">
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
