import styled from 'styled-components';
import SingleLabel from './SingleLabel';
import CreateLabelComponent from './CreateLabelComponent';

const Wrapper = styled.div`
	width: 100%;
	height: 150px;
	background-color: #f6f8fa;
	margin-bottom: 16px;
	border: 1px solid #d0d7de;
	border-radius: 10px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 767px) {
		height: auto;
	}
`;

const LabelWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 12px 0;
	@media screen and (max-width: 767px) {
		margin: unset;
	}
`;

function CreateLabel() {
	return (
		<Wrapper>
			<SingleLabel
				$width={'100%'}
				$backgroundColor={'blue'}
				text={'Test'}
				$color={'#ffffff'}
				$margin
			/>
			<LabelWrapper>
				<CreateLabelComponent />
			</LabelWrapper>
		</Wrapper>
	);
}

export default CreateLabel;
