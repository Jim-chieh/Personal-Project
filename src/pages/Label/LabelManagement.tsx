import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TagIcon, MilestoneIcon } from '@primer/octicons-react';
import api from '../../utils/api';
import LabelAndMilestones from '../../components/bottomsAndInput/LabelAndMilestones';
import InputComponent from '../../components/bottomsAndInput/InputComponent';
import NewIssueAndLabel from '../../components/bottomsAndInput/NewIssueAndLabel';
import Sort from '../../components/Sort';
import LabelList from './LabelList';
import CreateLabel from './CreateLabel';

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
	display: ${props => (props.$display ? 'block' : 'none')};
`;

function LabelManagement() {
	const [createLabelClick, setCreateLabelClick] = useState(false);

	// const [labels, setLabels] = useState();
	// const labelName = useRef();
	// const labelColor = useRef();
	// const labeldescription = useRef();
	// console.log(labels);
	// useEffect(() => {
	// 	fetch('https://api.github.com/repos/Jim-chieh/Personal-Project/labels')
	// 		.then(res => res.json())
	// 		.then(data => console.log(data));
	// 	console.log('render');
	// }, []);

	// useEffect(() => {
	// 	const data = api.getLabels();
	// 	data.then(data => setLabels(data));
	// }, []);

	const labelArr = [
		['Labels', <TagIcon size={14} />],
		['Milestones', <MilestoneIcon size={14} />]
	];

	// function handleDelete(labelName) {
	// 	const data = api.createLabel;
	// }

	// function handleAddLabel() {
	// 	const newlabelColor = labelColor.current.substr(1);
	// 	console.log(newlabelColor);

	// 	const data = api.createLabel(
	// 		'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',
	// 		labelName.current,
	// 		newlabelColor,
	// 		labeldescription.current
	// 	);
	// 	console.log(data);
	// }

	function handleNewLabelClick() {
		setCreateLabelClick(!createLabelClick);
	}

	function handleCancelClick() {
		setCreateLabelClick(false);
	}

	// if (!labels) return null;

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
							onClick={handleNewLabelClick}
							$border={'#2a9048'}
							$hoverColor={'#2c974b'}
							$checkMouseEvent
						/>
					</NewButton>
				</HeaderContainer>
				<ControlDisplay $display={createLabelClick}>
					<CreateLabel onClick={handleCancelClick} />
				</ControlDisplay>
				<LabelListHeader>
					<TextContainer>
						{9}
						<Text>labels</Text>
					</TextContainer>
					<Sort />
				</LabelListHeader>
				<LabelList />
				<LabelList />
				<LabelList />
			</Container>
		</Wrapper>
	);
}

export default LabelManagement;
