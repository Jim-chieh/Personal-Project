import { useState } from 'react';
import { XIcon, CheckIcon } from '@primer/octicons-react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { PopupDataProps } from './IssueListPage';
import { clearAssignee } from '../../redux/createIssueSlice';

type IssuePopupProps = {
	$display: boolean;
	$onClick: () => void;
	$menuData?: PopupDataProps;
	$stillShowOnMdSize?: boolean;
	$shouldhasXIcon?: boolean;
};

function IssuePopup({
	$display,
	$onClick,
	$menuData,
	$stillShowOnMdSize,
	$shouldhasXIcon
}: IssuePopupProps) {
	const [inputValue, setInputValue] = useState('');
	const dispatch = useDispatch();

	if (!$menuData) return null;

	return (
		<div className={`${$display ? 'block' : 'hidden'} `}>
			<div
				className={`fixed top-0 left-0 h-full w-full bg-black opacity-40 ${
					$stillShowOnMdSize ? 'md:opacity-0' : 'sm:opacity-0'
				}`}
				onClick={() => {
					$onClick();
					setInputValue('');
				}}
			></div>
			<div
				className={`group	absolute top-[2%] left-4 right-4 z-10 h-[550px] overflow-auto rounded-lg bg-white ${
					$menuData?.smTop
				} ${$menuData?.smLeft} sm:z-10 ${
					$stillShowOnMdSize && $menuData?.autoHeight
						? 'md:h-fit'
						: $menuData?.autoHeight
						? 'sm:h-fit'
						: 'sm:h-[400px] sm:max-h-fit'
				} sm:${
					$stillShowOnMdSize ? '' : 'w-[300px]'
				} sm:border-[1px]  sm:border-[#d0d7de] ${$menuData?.lgLeft}`}
			>
				<div>
					<div className="flex items-center justify-between border-b-[1px] p-4 text-sm sm:h-[33px] sm:text-xs">
						<div>{$menuData?.title}</div>
						<div
							className="cursor-pointer"
							onClick={() => {
								$onClick();
								setInputValue('');
							}}
						>
							<XIcon />
						</div>
					</div>
					{$menuData?.placeholder && (
						<div className="flex items-center justify-between border-b-[1px] p-4 sm:p-2">
							<input
								className="h-8 w-full rounded-md border-[1px] border-[#d0d7de] pl-3 text-sm focus:outline-blue-600 sm:h-8"
								placeholder={$menuData?.placeholder}
								onChange={e => setInputValue(e.target.value)}
								value={inputValue}
							/>
						</div>
					)}
					{$menuData?.secondTitle && (
						<div
							className={`flex items-center justify-between ${
								$menuData.activeList?.length === 0
									? 'bg-[#f6f8fa]'
									: 'bg-transprant'
							} p-4 text-sm sm:h-[33px] sm:text-xs ${
								$menuData.activeList?.length === 0
									? ''
									: 'cursor-pointer hover:bg-gray-100'
							}`}
						>
							{$menuData.activeList?.length === 0 ? (
								$menuData?.secondTitle
							) : (
								<div className="flex" onClick={() => dispatch(clearAssignee())}>
									<XIcon />
									<p className="ml-2">Clear Assignees</p>
								</div>
							)}
						</div>
					)}
					{$menuData?.basicAction && (
						<div
							className=" relative flex cursor-pointer items-center justify-between p-4 text-sm hover:bg-gray-100 sm:py-[7px] sm:px-[16px] sm:text-[12px]"
							onClick={() => {
								$onClick();
								$menuData.addDispatch($menuData?.basicAction as string);
								setInputValue('');
							}}
						>
							<div className="pl-[32px] sm:pl-[25px] ">
								{$menuData?.basicAction}
							</div>
							<div
								className={`absolute left-5 top-4 sm:top-[5px] sm:left-[15px] ${
									$menuData.activeList?.includes('none')
										? 'visible'
										: 'invisible'
								}`}
							>
								<CheckIcon />
							</div>
						</div>
					)}
					<div>
						{$menuData?.content?.map(
							(
								{
									$background,
									title,
									description,
									header,
									picture,
									showText,
									action
								},
								index
							) => (
								<div
									className={`relative ${
										inputValue.trim() === ''
											? () => {}
											: title?.toLocaleLowerCase().includes(inputValue) ||
											  description?.toLocaleLowerCase().includes(inputValue) ||
											  header?.toLocaleLowerCase().includes(inputValue) ||
											  showText
											? 'flex'
											: 'hidden'
									} cursor-pointer border-t-[1px] p-4 ${
										$background
											? 'pl-[50px]'
											: showText
											? 'pl-[40px]'
											: 'pl-[32px]'
									}     

											hover:bg-gray-100 sm:py-[7px] sm:pl-[40px]`}
									key={index}
								>
									<div className="flex">
										{$background && title && (
											<>
												<div
													className={`absolute left-5 top-4 sm:top-[5px] sm:left-[15px] ${
														$menuData.activeList?.includes(title)
															? 'visible'
															: 'invisible'
													}`}
												>
													<CheckIcon />
												</div>
												<div
													className={`absolute right-5 top-4 sm:top-[5px] sm:right-[15px] ${
														$shouldhasXIcon &&
														$menuData.activeList?.includes(title)
															? 'visible'
															: 'invisible'
													}`}
												>
													<XIcon />
												</div>
												<div
													className={`flex w-full`}
													onClick={() => {
														$menuData?.addDispatch(title);
														if (inputValue !== '') setInputValue('');
													}}
												>
													<div
														className={`mr-2 mt-1 h-[14px] w-[14px] rounded-[50%] ${
															$background === 'ffffff'
																? 'border-[1px] border-gray-500'
																: ''
														}`}
														style={{ backgroundColor: `${'#' + $background}` }}
													></div>
													<div className="flex flex-col">
														<span className="text-[14px] font-semibold sm:text-[12px]">
															{title}
														</span>
														<span className="text-[14px] text-[#57606A] sm:text-[12px]">
															{description}
														</span>
													</div>
												</div>
											</>
										)}

										{picture && header && (
											<div className="relative w-full">
												<div
													className={`absolute left-[-15px] top-[0px] sm:top-[0px] sm:left-[-25px] ${
														$menuData.activeList?.includes(header)
															? 'visible'
															: 'invisible'
													}`}
												>
													<CheckIcon />
												</div>
												<div
													className={`mr-2 mt-1 flex pl-3 sm:pl-0`}
													onClick={() => {
														$menuData.addDispatch(header);
													}}
												>
													<img
														src={picture}
														alt="avatar"
														className="mr-2 h-5 w-5 rounded-[50%] sm:h-[22px] sm:h-[20px] sm:w-[22px] sm:w-[20px]"
													/>
													<p className="text-sm font-semibold sm:text-xs">
														{header}
													</p>
												</div>
											</div>
										)}

										{action && (
											<div
												className="relative w-full"
												onClick={() => {
													$menuData.addDispatch(action as string);
												}}
											>
												<div
													className={`absolute left-[-15px] top-[0px] sm:top-[0px] sm:left-[-25px] ${
														$menuData.activeList === action
															? 'visible'
															: 'invisible'
													}`}
												>
													<CheckIcon />
												</div>
												{showText && (
													<span className={`text-sm `}>{showText}</span>
												)}
											</div>
										)}
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default IssuePopup;
