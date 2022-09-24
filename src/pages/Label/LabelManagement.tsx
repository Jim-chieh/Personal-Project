import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TagIcon, MilestoneIcon } from '@primer/octicons-react';
import LabelAndMilestones from '../../components/bottomsAndInput/LabelAndMilestones';
import InputComponent from '../../components/bottomsAndInput/InputComponent';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';
import Sort from '../../components/Sort';
import LabelList from './LabelList';
import { createLabelApi } from '../../redux/LabelCreateApi';
import { GetLebal } from '../../redux/LabelCreateApi';
import SingleLabel from './SingleLabel';
import CreateLabelComponent from './CreateLabelComponent';

type Display = { $display: boolean };

const Wrapper = styled.div`
	width: 100%;
	padding-bottom: 180px;
	@media screen and (max-width: 1011px) {
		padding-bottom: 220px;
	}
`;

const LabelInnerContainer = styled.div`
	display: flex;
`;

const Container = styled.div`
	max-width: 1216px;
	margin: 0 auto;
	margin-top: 24px;
	padding: 0 32px;
	display: flex;
	flex-direction: column;
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: nowrap;
	margin-bottom: 20px;
	overflow: initial;
	@media screen and (max-width: 767px) {
		flex-wrap: wrap;
	}
`;

const InputContainer = styled.div`
	display: flex;

	margin-right: auto;
	@media screen and (max-width: 767px) {
		margin-right: 150px;
		order: 3;
		margin-top: 16px;
	}
	@media screen and (max-width: 500px) {
		margin-right: unset;
	}
`;

const NewButton = styled.div`
	display: flex;
	@media screen and (max-width: 767px) {
		order: 2;
	}
`;

const LabelListHeader = styled.div`
	width: 100%;
	height: 55px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #d0d7de;
	background-color: #f6f8fa;
	border-radius: 5px 5px 0 0;
	padding: 0 16px;
	font-size: 14px;
`;

const TextContainer = styled.div`
	display: flex;
	align-items: center;
	color: black;
`;

const Text = styled.p`
	font-size: 14px;
	margin-left: 3px;
`;

const ControlDisplay = styled.div<Display>`
	width: 100%;
	height: 150px;
	background-color: #f6f8fa;
	margin-bottom: 16px;
	border: 1px solid #d0d7de;
	border-radius: 10px;
	padding: 16px;
	display: ${props => (props.$display ? 'block' : 'none')};
	flex-direction: column;
	@media screen and (max-width: 767px) {
		height: auto;
	}
`;

const CreateLabelComponentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 28px 0;
	@media screen and (max-width: 767px) {
		margin: unset;
	}
`;

const labelArr = [
	['Labels', <TagIcon size={14} />],
	['Milestones', <MilestoneIcon size={14} />]
];

function LabelManagement() {
	const [createLabelDisplay, setCreateLabelDisplay] = useState(false);
	const [colorCode, setColorCode] = useState(
		'#' + Math.floor(Math.random() * 16777215).toString(16)
	);
	const [labelNameChange, setLabelNameChange] = useState('');
	const colorRef = useRef(colorCode);

	const { data, isError, isSuccess, isLoading } =
		createLabelApi.useGetAllLabelsQuery({
			name: 'Jim-chieh',
			repo: 'Personal-Project'
		});

	function getRandomColor() {
		let randomColor = Math.floor(Math.random() * 16777215).toString(16);
		setColorCode('#' + randomColor.toLocaleUpperCase());
	}

	function cancelBtnClick() {
		setCreateLabelDisplay(false);
		setLabelNameChange('');
		setColorCode(colorRef.current);
	}
	console.log(colorCode);

	if (!isSuccess) return <>Loading...</>;

	return (
		<Wrapper>
			<Container>
				<HeaderContainer>
					<LabelInnerContainer>
						<LabelAndMilestones array={labelArr} />
					</LabelInnerContainer>
					<InputContainer>
						<InputComponent />
					</InputContainer>
					<NewButton>
						<NewIssueAndLabel
							buttonName={'New label'}
							backgroundColor={'#2da44e'}
							textColor={'#ffffff'}
							onClick={() => setCreateLabelDisplay(!createLabelDisplay)}
							$border={'#2a9048'}
							$hoverColor={'#2c974b'}
							$checkMouseEvent
						/>
					</NewButton>
				</HeaderContainer>
				<ControlDisplay $display={createLabelDisplay}>
					<SingleLabel
						// $width={'100%'}
						$backgroundColor={colorCode}
						text={
							labelNameChange.length === 0 ? 'Label preview' : labelNameChange
						}
					/>
					<CreateLabelComponentContainer>
						<CreateLabelComponent
							onClick={cancelBtnClick}
							getColorFn={getRandomColor}
							$backgroundColor={colorCode}
							$onChange={e => setLabelNameChange(e)}
							$onColorChange={e => setColorCode(e)}
							$textColor={colorCode}
							$checkInputLength={labelNameChange}
							$dataLabelName={labelNameChange}
							$colorPickerClick={e => {
								setColorCode(e);
							}}
						/>
					</CreateLabelComponentContainer>
				</ControlDisplay>
				<LabelListHeader>
					<TextContainer>
						{data.length}
						<Text>labels</Text>
					</TextContainer>
					<Sort />
				</LabelListHeader>
				{data.map((item: GetLebal) => (
					<LabelList
						key={item.id}
						$dataBackgroundColor={item.color}
						$dataLabelName={item.name}
						$dataDescription={item.description}
					/>
				))}
			</Container>
		</Wrapper>
	);
}

export default LabelManagement;
