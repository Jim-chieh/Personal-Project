import { useState } from 'react';
import styled from 'styled-components';
import SingleLabel from './SingleLabel';
import CreateLabelComponent from './CreateLabelComponent';

type Display = { $display: boolean };
type DisplayAndIndex = { $display: boolean; $index: number };

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

	function handleEditClick() {
		setEditClick(!editClick);
	}

	function handleDeleteClick() {
		console.log('Delete');
	}

	return (
		<>
			<LabelWrapper>
				<LabelInfoContainer>
					<SingleLabel
						$width={'15%'}
						$backgroundColor={'blue'}
						text={'TEXTING'}
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
									button === 'Edit' ? handleEditClick : handleDeleteClick
								}
								$display={index === 0 ? editClick : true}
								$index={index}
							>
								{button}
							</Button>
						))}
					</EditDeleteContainer>
				</LabelInfoContainer>
				<ControlDisplay $display={editClick}>
					<CreateLabelComponent onClick={handleEditClick} />
				</ControlDisplay>
			</LabelWrapper>
		</>
	);
}

export default LabelList;
