import { useRef, useState } from 'react';
import styled from 'styled-components';
import { TagIcon, MilestoneIcon, CheckIcon } from '@primer/octicons-react';
import LabelAndMilestones from '../../components/bottomsAndInput/LabelAndMilestones';
import InputComponent from '../../components/bottomsAndInput/InputComponent';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';
import Sort from '../../components/Sort';
import LabelList from './LabelList';
import {
	useGetAllLabelsQuery,
	useCreateLabelsMutation
} from '../../redux/LabelCreateApi';
import { GetLabel } from '../../redux/LabelCreateApi';
import SingleLabel from './SingleLabel';
import CreateLabelComponent from './CreateLabelComponent';
import PleaseLogin from '../../components/PleaseLogin';

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

interface CreateLabel {
	name: string;
	repo: string;
	token: string;
	createLabelName: string;
	createLabelColor: string;
	createLabelDescription: string;
}

const labelArr = [
	['Labels', <TagIcon size={14} />, '', 'Labels'],
	['Milestones', <MilestoneIcon size={14} />]
];

const textArray = ['Sort'];

const array = [
	['Alphabetically', <CheckIcon />],
	['Reverse alphabetically'],
	['Most issues'],
	['Fewest issues']
];

function LabelManagement() {
	const [createLabelDisplay, setCreateLabelDisplay] = useState(false);
	const [createLabels] = useCreateLabelsMutation();
	const [isFetching, setIsfetching] = useState(false);
	const [colorCode, setColorCode] = useState(
		'#' + Math.floor(Math.random() * 16777215).toString(16)
	);
	const [labelNameChange, setLabelNameChange] = useState('');
	const [descriptionChange, setDescriptionChange] = useState('');
	const colorRef = useRef(colorCode);
	const token = localStorage.getItem('token') as string;

	const { data, isError, isSuccess, isLoading } = useGetAllLabelsQuery({
		name: 'Jim-chieh',
		repo: 'Personal-Project',
		token: localStorage.getItem('token') as string
	});

	function getRandomColor() {
		let randomColor = Math.floor(Math.random() * 16777215).toString(16);
		setColorCode('#' + randomColor.toLocaleUpperCase());
	}

	function cancelBtnClick() {
		setCreateLabelDisplay(false);
		setLabelNameChange('');
		setDescriptionChange('');
		setColorCode(colorRef.current);
	}

	async function createLabel(values: CreateLabel) {
		try {
			setIsfetching(true);
			await createLabels({ ...values }).unwrap();
			setIsfetching(false);
			setCreateLabelDisplay(false);
		} catch (err) {
			console.log(err);
			setIsfetching(false);
		}
	}

	if (token === 'undefined') return <PleaseLogin />;

	if (!isSuccess) return <>Loading...</>;

	return (
		<Wrapper>
			<Container>
				<HeaderContainer>
					<LabelInnerContainer>
						<LabelAndMilestones array={labelArr} />
					</LabelInnerContainer>
					<InputContainer>
						<InputComponent $onChange={() => {}} />
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
						$backgroundColor={colorCode}
						text={
							labelNameChange.length === 0 ? 'Label preview' : labelNameChange
						}
					/>
					<CreateLabelComponentContainer>
						<CreateLabelComponent
							onClick={cancelBtnClick}
							getColorFn={getRandomColor}
							$buttonName={isFetching ? 'Saving...' : 'Create label'}
							$backgroundColor={colorCode}
							$onNameInputChange={e => setLabelNameChange(e)}
							$onColorChange={e => setColorCode(e)}
							$textColor={colorCode}
							$checkInputLength={isFetching ? '' : labelNameChange}
							$dataLabelName={labelNameChange}
							$descriptionValue={descriptionChange}
							$colorPickerClick={e => {
								setColorCode(e);
							}}
							$onDescriptionChange={e => setDescriptionChange(e)}
							$createLabelClick={() => {
								createLabel({
									name: 'Jim-chieh',
									repo: 'Personal-Project',
									token: token,
									createLabelName: `${labelNameChange}`,
									createLabelColor: `${colorCode.split('#')[1]}`,
									createLabelDescription: `${descriptionChange}`
								});
							}}
						/>
					</CreateLabelComponentContainer>
				</ControlDisplay>
				<LabelListHeader>
					<TextContainer>
						{data.length}
						<Text>labels</Text>
					</TextContainer>
					<Sort
						$labeltext={textArray}
						array={array}
						$headerText={'Sort'}
						$top={'22px'}
						$right={' 6px'}
					/>
				</LabelListHeader>
				{data.map((item: GetLabel) => (
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
