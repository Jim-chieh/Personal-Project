import { useState } from 'react';
import styled from 'styled-components';
import SingleLabel from './SingleLabel';
import CreateLabelComponent from './CreateLabelComponent';
import { KebabHorizontalIcon } from '@primer/octicons-react';
import Dropdown from '../../components/Header/Repo/Dropdown';

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
`;

const LabelRelate = styled.span<Display>`
	width: 25%;
	display: ${props => (props.$display ? 'none' : 'flex')};
	align-items: center;
	font-size: 12px;
	color: #57606a;
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
	/* padding: 16px 0; */
`;

const buttonArr = ['Edit', 'Delete'];

function LabelList() {
	const [editClick, setEditClick] = useState(false);
	const [mobileIconClick, setMobileIconClick] = useState(false);
	const [colorCode, setColorCode] = useState(
		'#' + Math.floor(Math.random() * 16777215).toString(16)
	);
	const [nameChange, setNameChange] = useState('');
	// const [colorChange, setColorChange]

	function getRandomColor() {
		let randomColor = Math.floor(Math.random() * 16777215).toString(16);
		setColorCode('#' + randomColor);
	}

	function handleDeleteClick() {
		console.log('Delete');
	}

	function handleDropdownListClick(item: string) {
		if (item === 'Edit') {
			setEditClick(true);
		} else {
			console.log('Delete');
		}
	}

	function handleInputChange(value: string) {
		setNameChange(value);
	}

	return (
		<>
			<LabelWrapper>
				<LabelInfoContainer>
					<SingleLabel
						$width={'15%'}
						$backgroundColor={colorCode}
						text={nameChange.length === 0 ? 'Label preview' : nameChange}
						$color={'#ffffff'}
						$margin={false}
					/>
					<LabelContent $display={editClick}>
						Lorem ipsum dolor sit amet consectetur adipisicing
					</LabelContent>
					<LabelRelate $display={editClick}>{''}</LabelRelate>
					<EditDeleteContainer>
						{buttonArr.map((button, index) => (
							<Button
								key={index}
								onClick={
									button === 'Edit'
										? () => setEditClick(!editClick)
										: handleDeleteClick
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
								bottom={'-70px'}
								right={'-4px'}
								onClick={handleDropdownListClick}
							/>
						</ShowOnMobile>
					</EditDeleteContainer>
				</LabelInfoContainer>
				<ControlDisplay $display={editClick}>
					<CreateLabelComponent
						onClick={() => setEditClick(!editClick)}
						getColorFn={getRandomColor}
						$backgroundColor={colorCode}
						$onChange={handleInputChange}
					/>
				</ControlDisplay>
			</LabelWrapper>
		</>
	);
}

export default LabelList;
