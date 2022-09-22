import { SyncIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';

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

const LabelInput = styled.input`
	width: 100%;
	height: 32px;
	outline: none;
	background-color: transparent;
	padding: 5px 12px;
	border: 1px solid #d0d7de;
	border-radius: 5px;

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
	width: 18%;

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
	margin-right: 8px;
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

type CreateLabelProps = { onClick?: () => void };
function CreateLabelComponent({ onClick }: CreateLabelProps) {
	function handleColorChangeClick() {
		console.log('click');
	}

	function handleCreateLableClick() {
		console.log('create clicked');
	}

	return (
		<LabelContainer>
			<SingleLabelContainer>
				<LabelText htmlFor="label">Label name</LabelText>
				<LabelInput id="label" placeholder="Label name" />
			</SingleLabelContainer>
			<DescriptionContainer>
				<LabelText htmlFor="description">Description</LabelText>
				<LabelInput id="description" placeholder="Description (optional)" />
			</DescriptionContainer>
			<ColorContainer>
				<LabelText htmlFor="color">Color</LabelText>
				<ColorChange>
					<ColorButtonContainer>
						<NewIssueAndLabel
							buttonName={<SyncIcon fill="#ffffff" />}
							backgroundColor={'#772f7d'}
							onClick={handleColorChangeClick}
							textColor={'#ffffff'}
							$border={'transparent'}
							$hoverColor={''}
						/>
					</ColorButtonContainer>

					<LabelInput
						id="color"
						placeholder="Color "
						value={'#'}
						onChange={() => {
							console.log('change');
						}}
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
					/>
				</ButtonContainer>
				<ButtonContainer>
					<NewIssueAndLabel
						buttonName={'Create label'}
						backgroundColor={'#94d3a2'}
						onClick={handleCreateLableClick}
						textColor={'#ffffff'}
						$border={'#8ac297'}
						$hoverColor={'#2c974b'}
					/>
				</ButtonContainer>
			</ButtonWrapper>
		</LabelContainer>
	);
}

export default CreateLabelComponent;
