import { Reactions } from '../../redux/singleIssueProp';

interface RenderEmojiProps {
	type: string;
	number: number;
}

function RenderEmoji({ type, number }: RenderEmojiProps) {
	function emoji() {
		if (type === '+1') return '👍';
		if (type === '-1') return '👎';
		if (type === 'laugh') return '😄';
		if (type === 'hooray') return '🎉';
		if (type === 'confused') return '😕';
		if (type === 'heart') return '❤️';
		if (type === 'rocket') return '🚀';
		if (type === 'eyes') return '👀';
	}

	return (
		<div className="mr-2 flex w-auto cursor-pointer items-center rounded-xl border-[1px] border-[#d0d7de]  px-1 text-sm hover:bg-[#eaeef2]">
			<div className="mt-[2px]">{emoji()}</div>
			<span className="ml-[2px] flex h-6 items-end px-1 pb-[2px] text-xs text-[#57606A]">
				{number}
			</span>
		</div>
	);
}

export default RenderEmoji;
