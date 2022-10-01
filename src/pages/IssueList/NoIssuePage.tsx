import { IssueOpenedIcon } from '@primer/octicons-react';

function NoIssuePage() {
	return (
		<div className="flex w-full justify-between border-b-[1px] border-gray-300 sm:border-x-[1px] sm:last:rounded-b">
			<div className="flex w-full flex-col items-center justify-center px-[40px] py-[80px]">
				<IssueOpenedIcon size={24} fill={'#6c747d'} />
				<span className="text-6 my-4 text-2xl font-semibold">
					There aren’t any open issues.
				</span>
				<p>
					You could search{' '}
					<a
						href="https://github.com/search"
						target="_blank"
						rel="noreferrer"
						className="text-[#5869dc] decoration-solid hover:underline"
					>
						all of GitHub
					</a>{' '}
					or try an{' '}
					<a
						href="https://github.com/search/advanced"
						target="_blank"
						rel="noreferrer"
						className=" text-[#5869dc] decoration-solid hover:underline"
					>
						{' '}
						advanced search
					</a>
					.
				</p>
			</div>
		</div>
	);
}

export default NoIssuePage;
