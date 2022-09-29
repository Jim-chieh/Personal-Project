function IssueTitleHoverPopup() {
	return (
		<div className="absolute top-[-205px] left-[-20px] hidden md:block">
			<div className=" h-[192px] w-[320px] rounded-md border-[1px] bg-white">
				<div className="absolute bottom-[-11px] left-7 z-10 h-0 w-0 border-l-[8px] border-t-[12px] border-r-[8px] border-x-transparent border-t-white"></div>
				<div className=" absolute bottom-[-12px] left-[27px] h-0 w-0 border-l-[9px] border-t-[12px] border-r-[9px] border-x-transparent border-t-gray-300"></div>
				<div className="p-4">
					<div className="flex">
						<a href="789456" className="text-xs">
							123
						</a>
						<p className="text-xs">{`on ${'Sep 29'}`}</p>
					</div>
					<div className="flex">
						<div>icon</div>
						<div>
							<a className="text-xs">
								vdvdvd<p>#6</p>
							</a>
							<p className="text-xs">dsadsad</p>
						</div>
					</div>
					<div className="text-xs">
						<div>label</div>
					</div>
					<p className="text-xs text-gray-500">+ more</p>
				</div>
				<div className="border-t-[1px] p-4">
					<div>
						<div>頭貼</div>
						<p className="text-xs">You opened</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IssueTitleHoverPopup;
