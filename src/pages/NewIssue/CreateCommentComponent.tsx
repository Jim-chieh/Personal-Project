import { useState, useRef } from 'react';
import { addTitle, addBody } from '../../redux/createIssueSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './markdown.css';
import TextareaMarkdown, {
	TextareaMarkdownRef
} from 'textarea-markdown-editor';
import {
	TypographyIcon,
	ChevronDownIcon,
	MarkdownIcon,
	InfoIcon,
	ChevronUpIcon,
	BoldIcon,
	HeadingIcon,
	ItalicIcon,
	ListOrderedIcon,
	ListUnorderedIcon,
	TasklistIcon,
	CodeIcon,
	CrossReferenceIcon,
	ImageIcon,
	LinkIcon,
	MentionIcon,
	QuoteIcon,
	ReplyIcon
} from '@primer/octicons-react';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';

type CreateCommentComponentProps = {
	$avatarUrl: string;
	$shouldHasTitle: boolean;
	$createBtnClick: () => void;
	$isFetching: boolean;
};

function CreateCommentComponent({
	$avatarUrl,
	$shouldHasTitle,
	$createBtnClick,
	$isFetching
}: CreateCommentComponentProps) {
	const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
	const [fontAndListDisplay, setFontAndListDisplay] = useState(false);
	const createSlice = useSelector(
		(store: RootState) => store.createIssueReducer
	);
	const [currentClick, setCurrentClick] = useState('Write');
	const [value, setValue] = useState('');
	const ref = useRef<TextareaMarkdownRef>(null);

	function autoAdjustTextArea(target: EventTarget) {
		// @ts-ignore
		target.style.height = '1px';
		// @ts-ignore
		target.style.height = target.scrollHeight + 'px';
	}

	const hideOnDesktopArr = [
		{ icon: <HeadingIcon />, text: 'Heading' },
		{ icon: <BoldIcon />, text: 'Bold' },
		{ icon: <ItalicIcon />, text: 'Italic' },
		{ icon: <ListUnorderedIcon />, text: 'Unorder' },
		{ icon: <ListOrderedIcon />, text: 'ListOrder' },
		{ icon: <TasklistIcon />, text: 'Task' }
	];
	function handleHideOnDesktopArr(e: string) {
		if (e === 'Heading') {
			ref.current?.trigger('h3');
		} else if (e === 'Bold') {
			ref.current?.trigger('bold');
		} else if (e === 'Italic') {
			ref.current?.trigger('italic');
		} else if (e === 'Unorder') {
			ref.current?.trigger('unordered-list');
		} else if (e === 'ListOrder') {
			ref.current?.trigger('ordered-list');
		} else if (e === 'Task') {
			ref.current?.trigger('task');
		}
	}

	const fontStyleArr = [
		{ icon: <HeadingIcon />, text: 'Heading' },
		{ icon: <BoldIcon />, text: 'Bold' },
		{ icon: <ItalicIcon />, text: 'Italic' }
	];

	function handleFontArrClick(e: string) {
		if (e === 'Heading') {
			ref.current?.trigger('h3');
		} else if (e === 'Bold') {
			ref.current?.trigger('bold');
		} else if (e === 'Italic') {
			ref.current?.trigger('italic');
		}
	}

	const listArr = [
		{ icon: <ListUnorderedIcon />, text: 'Unorder' },
		{ icon: <ListOrderedIcon />, text: 'ListOrder' },
		{ icon: <TasklistIcon />, text: 'Task' }
	];

	function handleListArrClick(e: string) {
		if (e === 'Unorder') {
			ref.current?.trigger('unordered-list');
		} else if (e === 'ListOrder') {
			ref.current?.trigger('ordered-list');
		} else if (e === 'Task') {
			setValue(value + '- [ ] ');
		}
	}

	const quoteCodeLinkArr = [
		{ icon: <QuoteIcon />, text: 'Quote' },
		{ icon: <CodeIcon />, text: 'Code' },
		{ icon: <LinkIcon />, text: 'Link' }
	];

	function handleQuoteArrClick(e: string) {
		if (e === 'Quote') {
			ref.current?.trigger('block-quotes');
		} else if (e === 'Code') {
			ref.current?.trigger('code-block');
		} else if (e === 'Link') {
			ref.current?.trigger('link');
		}
	}

	const alwaysDisplay = [
		{
			icon: <MentionIcon />,
			text: 'Mention'
		},
		{
			icon: <ImageIcon />,
			text: 'Image'
		},
		{ icon: <CrossReferenceIcon />, text: 'CrossReference' },
		{ icon: <ReplyIcon />, text: 'Reply' }
	];

	function handleAlwaysDisplayArrClick(e: string) {
		if (e === 'Mention') {
			ref.current?.trigger('@');
		} else if (e === 'Image') {
			ref.current?.trigger('image');
		} else if (e === 'CrossReference') {
			ref.current?.trigger('#');
		} else if (e === 'Reply') {
			ref.current?.trigger('^');
		}
	}

	return (
		<div className="md:w-[68%] md:pl-[56px]">
			<div className="relative mr-3 rounded-md md:border-[1px] md:border-[#dce1e6]">
				<div className="absolute left-[-60px] hidden h-10 w-10 md:block">
					<img src={$avatarUrl} alt="userAvatar" className="rounded-[50%]" />
				</div>
				<div className="border-r-gray absolute left-[-9px] top-[10px] hidden border-y-[9px] border-r-[9px] border-l-0 border-solid border-y-transparent md:block"></div>
				<div className="absolute left-[-6px] top-[11px] hidden border-y-8 border-r-8 border-l-0 border-solid border-y-transparent border-r-white md:block"></div>
				<div
					className={`mb-4 md:mb-0 md:p-2 ${
						$shouldHasTitle ? 'block' : 'hidden'
					}`}
				>
					<input
						placeholder="Title"
						className="h-8 w-full rounded-md border-[1px] border-[#d4dbe1] bg-[#f6f8fa] px-3 py-[5px]"
						onChange={e => dispatch(addTitle(e.target.value))}
						value={createSlice.title}
					/>
				</div>
				<div className="block lg:flex lg:justify-between lg:border-b-[1px] lg:border-b-[#d4dbe1]">
					<div className="flex w-full md:mx-2 md:mt-2 md:mb-[-1px]">
						<button
							className={`w-6/12 border-x-[1px] ${
								currentClick === 'Write' ? 'border-t-[1px]' : 'border-y-[1px]'
							}  border-[#d4dbe1]  ${
								currentClick === 'Write' ? 'bg-transprant' : 'bg-[#f6f8fa]'
							} px-4 py-2 text-sm md:mr-1 md:w-auto md:rounded-t-md  ${
								currentClick === 'Write'
									? ' md:border-x-[1px] md:border-b-[1px] md:border-b-[#ffffff]'
									: ' md:border-0'
							}  md:bg-[transparent]`}
							onClick={() => setCurrentClick('Write')}
						>
							Write
						</button>
						<button
							className={`md:z-5 w-6/12 border-r-[1px] ${
								currentClick === 'Preview' ? 'border-t-[1px]' : 'border-y-[1px]'
							} border-[#d4dbe1] ${
								currentClick === 'Preview' ? 'bg-transprant' : 'bg-[#f6f8fa]'
							}  px-4 py-2 text-sm md:w-auto md:rounded-t-md  ${
								currentClick === 'Preview'
									? ' md:border-x-[1px]'
									: ' md:border-0'
							}  md:bg-[transparent]`}
							onClick={() => setCurrentClick('Preview')}
						>
							Preview
						</button>
					</div>
					<div
						className={` ${
							currentClick === 'Write' ? 'flex' : 'hidden'
						} w-full flex-wrap px-2 pt-2 md:mb-0 md:border-t-[1px] md:border-[#d4dbe1] lg:flex-nowrap lg:justify-end lg:border-0 ${
							fontAndListDisplay ? '' : 'mb-3'
						}`}
					>
						<div className="flex h-8 flex-grow md:hidden">
							<button
								className="ml-[5px] mr-1 px-1 py-2 text-[#57606a] hover:text-[#0969da]"
								onClick={() => setFontAndListDisplay(!fontAndListDisplay)}
							>
								<TypographyIcon />

								{fontAndListDisplay === true ? (
									<ChevronDownIcon />
								) : (
									<ChevronUpIcon />
								)}
							</button>
						</div>
						<div className="hidden md:flex md:h-8">
							{fontStyleArr.map((item, index) => (
								<button
									className="ml-[5px] p-1 text-[#57606a] hover:text-[#0969da]"
									key={index}
									onClick={() => {
										handleFontArrClick(item.text);
									}}
								>
									{item.icon}
								</button>
							))}
						</div>
						<div className="flex h-8 flex-nowrap">
							{quoteCodeLinkArr.map((item, index) => (
								<button
									className="ml-[5px] p-2 text-[#57606a] hover:text-[#0969da] md:p-1"
									key={index}
									onClick={() => handleQuoteArrClick(item.text)}
								>
									{item.icon}
								</button>
							))}
						</div>
						<div className="flex hidden h-8 flex-nowrap md:flex">
							{listArr.map((item, index) => (
								<button
									className="ml-[5px] p-2 text-[#57606a] hover:text-[#0969da] md:p-1"
									key={index}
									onClick={() => handleListArrClick(item.text)}
								>
									{item.icon}
								</button>
							))}
						</div>
						<div className="flex h-8 flex-nowrap">
							{alwaysDisplay.map((item, index) => (
								<button
									className={`mx-1 p-2 text-[#57606a] hover:text-[#0969da] md:p-1 md:${
										index === 1 ? 'hidden' : 'block'
									} `}
									key={index}
									onClick={() => handleAlwaysDisplayArrClick(item.text)}
								>
									{item.icon}
								</button>
							))}
						</div>
						{fontAndListDisplay && (
							<div className="flex w-full flex-nowrap md:hidden">
								{hideOnDesktopArr.map((item, index) => (
									<button
										key={index}
										className={`${
											index === 0
												? 'mr-1 ml-[5px] py-2 pl-1 pr-2'
												: 'ml-[5px] p-2'
										} text-[#57606a] hover:text-[#0969da]`}
										onClick={() => handleHideOnDesktopArr(item.text)}
									>
										{item.icon}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
				<div
					className={`${
						currentClick === 'Write' ? 'block' : 'hidden'
					} rounded-md border-[1px] border-[#d0d7de] bg-[#f6f8fa]  md:m-2`}
				>
					<TextareaMarkdown
						className=" max-h-[500px] min-h-[200px]  w-full rounded-md  border-b-[1px] border-dashed border-b-[#d0d7de] p-2 text-sm focus:outline-[#0969da] md:rounded-b-none"
						placeholder="Leave a comment"
						ref={ref}
						value={value}
						onChange={e => {
							setValue(e.target.value);
							dispatch(addBody(e.target.value));
						}}
						onKeyUp={e => autoAdjustTextArea(e.target)}
						commands={[
							{
								name: 'code',
								shortcut: ['command+e', 'ctrl+e']
							},
							{
								name: 'link',
								shortcut: ['command+k', 'ctrl+k']
							},
							{
								name: 'block-quotes',
								shortcut: ['command+shift+/', 'ctrl+shift+/'],
								shortcutPreventDefault: true
							}
						]}
					/>
					<label className="mt-[-8px] hidden cursor-pointer justify-between px-[10px] py-[7px] md:flex">
						<input
							accept=".gif,.jpeg,.jpg,.mov,.mp4,.png,.svg,.webm,.csv,.docx,.fodg,.fodp,.fods,.fodt,.gz,.log,.md,.odf,.odg,.odp,.ods,.odt,.pdf,.pptx,.tgz,.txt,.xls,.xlsx,.zip"
							type="file"
							className="hidden"
						/>
						<span className="flex items-center text-sm text-[#57606a]">
							Attach files by dragging & dropping, selecting or pasting them.
						</span>
						<div className="text-[#57606a] hover:text-[#0969da]">
							<MarkdownIcon />
						</div>
					</label>
				</div>
				<div
					className={`${
						currentClick === 'Preview' ? 'block' : 'hidden'
					} mx-2 mt-4 mb-2 min-h-[250px] border-b-[1px] border-[#d4dbe1] px-2 pb-1`}
				>
					<ReactMarkdown children={createSlice.body} remarkPlugins={[gfm]} />
				</div>
				<div className="mx-2 mb-2  hidden justify-between md:flex">
					<div className="group flex cursor-pointer items-center text-[#57606a] hover:text-[#0969da]">
						<MarkdownIcon />
						<p
							className={`ml-1 text-xs text-[#57606a] group-hover:text-[#0969da] `}
						>
							Styling with Markdown is supported
						</p>
					</div>
					<div className="hidden md:flex">
						<NewIssueAndLabel
							buttonName={'Submit new issue'}
							backgroundColor={
								createSlice.title === '' || $isFetching ? '#94d3a2' : '#2da44e'
							}
							onClick={$createBtnClick}
							textColor={'#ffffff'}
							$border={createSlice.title === '' ? '#82b88f' : '#2c974b'}
							$hoverColor={'#2c974b'}
							$checkMouseEvent={createSlice.title !== ''}
							$hoverBorderColor={'#2c974b'}
						/>
					</div>
				</div>
			</div>
			<div className="mt-4 mb-2 md:m-2">
				<InfoIcon fill={'#57606a'} />
				<span className="ml-1 text-xs text-[#57606a]">
					Remember, contributions to this repository should follow our{' '}
					<a
						href="https://docs.github.com/en/site-policy/github-terms/github-community-guidelines"
						target="_blank"
						rel="noreferrer"
						className="text-[#0969da] hover:underline"
					>
						GitHub Community Guidelines
					</a>
					.
				</span>
			</div>
		</div>
	);
}

export default CreateCommentComponent;
