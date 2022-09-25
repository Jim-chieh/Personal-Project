import { SyncIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';
import { useState } from 'react';
import BlurEffect from '../../components/BlurEffect';

type Color = { $textColor?: string; $inputTextColor?: string };

const LabelContainer = styled.div`
	display: flex;
	flex-grow: 1;
	@media screen and (max-width: 767px) {
		flex-direction: column;
	}
`;

const SingleLabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 25%;
	padding-right: 16px;
	@media screen and (max-width: 767px) {
		width: 100%;
		margin: 8px 0;
		padding-right: 0px;
	}
`;

const LabelText = styled.label`
	font-size: 14px;
	color: #24292f;
	margin-bottom: 8px;
	font-weight: 600;
`;

const LabelInput = styled.input<Color>`
	width: 100%;
	height: 32px;
	outline: none;
	background-color: transparent;
	padding: 5px 12px;
	border: 1px solid #d0d7de;
	border-radius: 5px;
	color: ${props => props.$inputTextColor};

	:focus {
		border: 2px solid #0981e5;
	}

	::placeholder {
		color: 6e7781;
	}
`;

const DescriptionContainer = styled(SingleLabelContainer)`
	width: 30%;
	@media screen and (max-width: 1011px) {
		width: 25%;
	}

	@media screen and (max-width: 767px) {
		width: 100%;
		margin: 8px 0;
	}
`;

const ColorContainer = styled(SingleLabelContainer)`
	width: 20%;
	position: relative;

	@media screen and (max-width: 767px) {
		width: 100%;
		margin: 8px 0;
	}
`;

const ColorChange = styled.div`
	display: flex;
`;

const ColorButtonContainer = styled.div`
	display: flex;
	width: 32px;
	height: 32px;
	margin-right: 12px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	margin-left: auto;
	@media screen and (max-width: 767px) {
		flex-direction: row-reverse;
		margin-top: 8px;
		margin-left: unset;
		margin-right: auto;
	}
`;

const ButtonContainer = styled.div`
	height: 34px;
	display: flex;
	align-items: flex-end;
	margin-left: auto;
	:first-child {
		margin-right: 8px;
	}
	@media screen and (max-width: 767px) {
		:first-child {
			margin-right: 0px;
		}
		:last-child {
			margin-right: 8px;
		}
	}
`;

const ColorPickerWrapper = styled.div<ColorPeekerWrapperProps>`
	width: 260px;
	height: 95px;
	position: absolute;
	display: ${props => (props.$display ? 'flex' : 'none')};
	flex-direction: column;
	background-color: #ffffff;
	padding: 8px;
	border-radius: 8px;
	border: 1px solid #d0d7de;
	top: 58px;
	left: 33px;
	z-index: 199;
	&:after {
		border-right: solid 8px transparent;
		border-left: solid 8px transparent;
		border-bottom: solid 8px #ffffff;
		transform: translateX(-50%);
		position: absolute;
		outline: 1px red;
		z-index: 1;
		content: '';
		top: -8px;
		left: 35px;
		height: 0;
		width: 0;
	}

	&:before {
		border-right: solid 9px transparent;
		border-left: solid 9px transparent;
		border-bottom: solid 9px #e6eaee;
		transform: translateX(-50%);
		position: absolute;
		outline: 1px red;
		z-index: 1;
		content: '';
		top: -8.6px;
		left: 35px;
		height: 0;
		width: 0;
	}
`;

const ColorPickerP = styled.p`
	color: #57606a;
	font-size: 12px;
	margin-left: 4px;
`;

const ColorPickerContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const ColorPicker = styled.div<ColorPeekerContainerProps>`
	background-color: ${props => '#' + props.$backgroundColor};
	width: 24px;
	height: 24px;
	border-radius: 5px;
	margin: 0px 3px;
	margin-top: 7px;
	:hover {
		cursor: pointer;
	}
`;

type ColorPeekerContainerProps = {
	$backgroundColor: string;
};

type ColorPeekerWrapperProps = {
	$display: boolean;
};

type CreateLabelProps = {
	onClick?: () => void;
	getColorFn: () => void;
	$backgroundColor: string;
	$buttonName: string;
	$onNameInputChange: (e: string) => void;
	$onColorChange: (e: string) => void;
	$textColor: string;
	$checkInputLength: string;
	$inputValue?: string;
	$dataLabelName?: string;
	$handleCancelBtnClick?: () => void;
	$colorPickerClick: (e: string) => void;
	$onDescriptionChange: (e: string) => void;
	$createLabelClick?: () => void;
	$descriptionValue?: string;
};

const colorPickerArr = [
	'b60205',
	'd93f0b',
	'fbca04',
	'0e8a16',
	'006b75',
	'1d76db',
	'0052cc',
	'5319e7',
	'e99695',
	'f9d0c4',
	'fef2c0',
	'c2e0c6',
	'bfdadc',
	'c5def5',
	'bfd4f2',
	'd4c5f9'
];

function CreateLabelComponent({
	onClick,
	getColorFn,
	$onNameInputChange,
	$buttonName,
	$onColorChange,
	$textColor,
	$checkInputLength,
	$dataLabelName,
	$colorPickerClick,
	$onDescriptionChange,
	$createLabelClick,
	$descriptionValue
}: CreateLabelProps) {
	const [colorPickerDisplay, setColorPickerDisplay] = useState(false);
	function lightOrDark(bgcolor: string) {
		const r = parseInt(bgcolor.slice(0, 2), 16);
		const g = parseInt(bgcolor.slice(2, 4), 16);
		const b = parseInt(bgcolor.slice(4, 6), 16);
		const hsp = r * 0.3 + g * 0.6 + b * 0.1;
		if (hsp > 127.5) {
			return <SyncIcon fill="#000000" />;
		} else {
			return <SyncIcon fill="#ffffff" />;
		}
	}

	return (
		<LabelContainer>
			<SingleLabelContainer>
				<LabelText htmlFor="label">Label name</LabelText>
				<LabelInput
					id="label"
					placeholder="Label name"
					onChange={
						$onNameInputChange
							? e => $onNameInputChange(e.target.value)
							: () => {}
					}
					value={$dataLabelName}
				/>
			</SingleLabelContainer>
			<DescriptionContainer>
				<LabelText htmlFor="description">Description</LabelText>
				<LabelInput
					id="description"
					placeholder="Description (optional)"
					value={$descriptionValue}
					onChange={
						$onDescriptionChange
							? e => $onDescriptionChange(e.target.value)
							: () => {}
					}
				/>
			</DescriptionContainer>
			<ColorContainer>
				<LabelText htmlFor="color">Color</LabelText>
				<ColorChange>
					<ColorButtonContainer>
						<NewIssueAndLabel
							buttonName={lightOrDark($textColor.substring(1, 7))}
							backgroundColor={$textColor}
							onClick={getColorFn ? () => getColorFn() : () => {}}
							textColor={$textColor}
							$border={'transparent'}
							$hoverColor={''}
							$checkMouseEvent
						/>
					</ColorButtonContainer>
					<LabelInput
						id="color"
						placeholder="Color"
						value={$textColor.toUpperCase()}
						onChange={
							$onColorChange
								? e =>
										$onColorChange(
											e.target.value.length === 0
												? '#'
												: e.target.value.length >= 8
												? e.target.value.substring(0, 7)
												: e.target.value
										)
								: () => {}
						}
						onClick={() => {
							setColorPickerDisplay(true);
						}}
						$inputTextColor={
							$textColor.length === 4 || $textColor.length === 7
								? 'black'
								: '#FF0000'
						}
					/>
					<ColorPickerWrapper $display={colorPickerDisplay}>
						<ColorPickerP>Choose from default colors:</ColorPickerP>
						<ColorPickerContainer>
							{colorPickerArr.map((colorPicker, index) => (
								<ColorPicker
									key={index}
									$backgroundColor={colorPicker}
									onClick={() => {
										$colorPickerClick('#' + colorPicker);
										setColorPickerDisplay(false);
									}}
								/>
							))}
						</ColorPickerContainer>
					</ColorPickerWrapper>
					<BlurEffect
						open={colorPickerDisplay ? 'block' : 'none'}
						onClick={() => setColorPickerDisplay(false)}
					/>
				</ColorChange>
			</ColorContainer>
			<ButtonWrapper>
				<ButtonContainer>
					<NewIssueAndLabel
						buttonName={'Cancel'}
						backgroundColor={'#ffffff'}
						onClick={onClick ? () => onClick() : () => {}}
						textColor={'#24293c'}
						$border={'#d5d8da'}
						$hoverColor={'#d5d8da'}
						$checkMouseEvent
					/>
				</ButtonContainer>
				<ButtonContainer>
					<NewIssueAndLabel
						buttonName={$buttonName}
						backgroundColor={
							$checkInputLength.length > 0 ? '#2da44e' : '#94d3a2'
						}
						onClick={$createLabelClick ? $createLabelClick : () => {}}
						textColor={'#ffffff'}
						$border={'#8ac297'}
						$hoverColor={'#2c974b'}
						$checkMouseEvent={$checkInputLength.length > 0 ? true : false}
					/>
				</ButtonContainer>
			</ButtonWrapper>
		</LabelContainer>
	);
}

export default CreateLabelComponent;
