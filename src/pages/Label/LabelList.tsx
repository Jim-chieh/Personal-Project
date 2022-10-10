import { useState, useRef } from 'react';
import styled from 'styled-components';
import SingleLabel from './SingleLabel';
import CreateLabelComponent from './CreateLabelComponent';
import { KebabHorizontalIcon } from '@primer/octicons-react';
import Dropdown from '../../components/Header/Repo/Dropdown';
import BlurEffect from '../../components/BlurEffect';
import {
	useUpdateLabelsMutation,
	useDeleteLabelsMutation
} from '../../redux/LabelCreateApi';

import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';

type Display = { $display: boolean };
type DisplayAndIndex = { $display: boolean; $index: number };
type Active = { $isActive: boolean };

const LabelWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid #d0d7de;
	background-color: #ffffff;
	padding: 16px 16px;
	font-size: 14px;
	border-top: none;
	:last-child {
		border-radius: 0 0 5px 5px;
	}
`;

const LabelContent = styled.span<Display>`
	width: 27%;
	display: ${props => (props.$display ? 'none' : 'flex')};
	align-items: center;
	font-size: 12px;
	color: #57606a;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const SingleLabelContainer = styled.div`
	width: 20%;
`;

const LabelRelate = styled.span<Display>`
	width: 25%;
	display: ${props => (props.$display ? 'none' : 'flex')};
	align-items: center;
	font-size: 12px;
	color: #57606a;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const EditDeleteContainer = styled.div``;

const Button = styled.button<DisplayAndIndex>`
	height: 18px;
	outline: none;
	border: none;
	color: #57606a;
	background-color: transparent;
	margin-left: 16px;
	text-align: center;
	:nth-child(1) {
		display: ${props => (props.$display ? 'none' : 'inline')};
	}
	:hover {
		text-decoration: underline;
		color: #0981e5;
		cursor: pointer;
	}

	@media screen and (max-width: 1011px) {
		display: none;
		:nth-child(1) {
			display: none;
		}
	}
`;

const ShowOnMobile = styled.div<Active>`
	display: none;
	@media screen and (max-width: 1011px) {
		width: 42px;
		height: 28px;
		background-color: ${props => (props.$isActive ? '#0969da' : '#f6f8fa')};
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		border: 1px solid #d5d8da;
		position: relative;
		color: ${props => (props.$isActive ? '#ffffff' : 'black')};
	}
`;

const LabelInfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const ControlDisplay = styled.div<Display>`
	display: flex;
	width: 100%;
	margin-top: 28px;
	display: ${props => (props.$display ? 'block' : 'none')};
`;

const buttonArr = ['Edit', 'Delete'];

type LabelProps = {
	$dataBackgroundColor: string;
	$dataLabelName: string;
	$dataDescription: string;
	$dataUrl?: string;
};

type UpdateLabelParameter = {
	name: string;
	repo: string;
	token: string;
	labelName: string;
	createLabelName: string;
	createLabelColor: string;
	createLabelDescription: string;
};

function LabelList({
	$dataBackgroundColor,
	$dataLabelName,
	$dataDescription,
	$dataUrl
}: LabelProps) {
	const [editClick, setEditClick] = useState(false);
	const [mobileIconClick, setMobileIconClick] = useState(false);
	const [colorCode, setColorCode] = useState('#' + $dataBackgroundColor);
	const [nameChange, setNameChange] = useState($dataLabelName);
	const [descriptionChange, setDescriptionChange] = useState($dataDescription);
	const [isFteching, setIsFetching] = useState(false);
	const [updateLabels] = useUpdateLabelsMutation();
	const [deleteLabels] = useDeleteLabelsMutation();
	const token = useSelector((store: RootState) => store.loginReducer);
	const descriptionRef = useRef($dataDescription);

	function getRandomColor() {
		let randomColor = Math.floor(Math.random() * 16777215).toString(16);
		setColorCode('#' + randomColor);
	}

	function handleDropdownListClick(item: string) {
		if (item === 'Edit') {
			setEditClick(true);
		} else if (item === 'Delete') {
			if (
				window.confirm(
					'Are you sure? Deleting a label will remove it from all issues and pull requests.'
				)
			) {
				deleteLabels({
					name: 'Jim-chieh',
					repo: 'webpack',
					token: token.token,
					labelName: `${nameChange}`
				});
			}
		}
	}

	function handleInputChange(value: string) {
		setNameChange(value);
	}

	function handleColorInputChange(value: string) {
		setColorCode(value);
	}

	function handleCancelBtnClick() {
		setEditClick(!editClick);
		setNameChange($dataLabelName);
		setColorCode('#' + $dataBackgroundColor);
		setDescriptionChange(descriptionRef.current);
	}

	async function upadteLabel(values: UpdateLabelParameter) {
		try {
			setIsFetching(true);
			await updateLabels({ ...values }).unwrap();
			setIsFetching(false);
			setEditClick(false);
			setMobileIconClick(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	}

	return (
		<>
			<LabelWrapper>
				<LabelInfoContainer>
					<SingleLabelContainer>
						<SingleLabel
							$backgroundColor={colorCode}
							text={nameChange.length === 0 ? 'Label preview' : nameChange}
							$height={'24px'}
						/>
					</SingleLabelContainer>
					<LabelContent $display={editClick}>{$dataDescription}</LabelContent>
					<LabelRelate $display={editClick}>
						{$dataUrl ? '1 open issues and pull requests' : ''}
					</LabelRelate>
					<EditDeleteContainer>
						{buttonArr.map((button, index) => (
							<Button
								key={index}
								onClick={
									button === 'Edit'
										? () => setEditClick(!editClick)
										: () => {
												if (
													window.confirm(
														'Are you sure? Deleting a label will remove it from all issues and pull requests.'
													)
												) {
													deleteLabels({
														name: 'Jim-chieh',
														repo: 'Personal-Project',
														token: token.token,
														labelName: `${nameChange}`
													});
												}
										  }
								}
								$display={index === 0 ? editClick : true}
								$index={index}
							>
								{button}
							</Button>
						))}
						<ShowOnMobile
							onClick={() => setMobileIconClick(!mobileIconClick)}
							$isActive={mobileIconClick}
						>
							<KebabHorizontalIcon />
							<Dropdown
								array={buttonArr}
								$isActive={mobileIconClick}
								bottom={editClick ? '-40px' : '-70px'}
								right={'-4px'}
								onClick={handleDropdownListClick}
								$firstElementShouldhide={editClick ? 'none' : 'flex'}
							/>
							<BlurEffect
								open={mobileIconClick ? 'block' : 'none'}
								onClick={() => setMobileIconClick(false)}
							/>
						</ShowOnMobile>
					</EditDeleteContainer>
				</LabelInfoContainer>
				<ControlDisplay $display={editClick}>
					<CreateLabelComponent
						onClick={handleCancelBtnClick}
						getColorFn={getRandomColor}
						$backgroundColor={colorCode}
						$onNameInputChange={handleInputChange}
						$buttonName={isFteching ? 'Saving...' : 'Save changes'}
						$onColorChange={handleColorInputChange}
						$textColor={colorCode}
						$checkInputLength={isFteching ? '' : nameChange}
						$dataLabelName={nameChange}
						$colorPickerClick={e => setColorCode(e)}
						$onDescriptionChange={e => setDescriptionChange(e)}
						$descriptionValue={descriptionChange}
						$createLabelClick={() => {
							upadteLabel({
								name: 'Jim-chieh',
								repo: 'webpack',
								token: token.token,
								labelName: `${$dataLabelName}`,
								createLabelName: `${nameChange}`,
								createLabelColor: `${colorCode.split('#')[1]}`,
								createLabelDescription: `${descriptionChange}`
							});
						}}
					/>
				</ControlDisplay>
			</LabelWrapper>
		</>
	);
}

export default LabelList;
