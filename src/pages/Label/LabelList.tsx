import styled from 'styled-components';

const LabelWrapper = styled.div`
	width: 100%;
	height: 55px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #d0d7de;
	background-color: #ffffff;
	padding: 0 16px;
	font-size: 14px;
	border-top: none;
	:last-child {
		border-radius: 0 0 5px 5px;
	}
`;

const LabelConainer = styled.div`
	display: flex;
	width: 15%;
`;

const Label = styled.div`
	height: 24px;
	padding: 0 10px;
	border-radius: 10px;
	background-color: #cccccc;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LabelContent = styled.span`
	width: 27%;
	font-size: 12px;
	color: #57606a;
`;

const LabelRelate = styled.span`
	width: 25%;
	font-size: 12px;
	color: #57606a;
`;

const EditDeleteContainer = styled.div``;

const Button = styled.button`
	height: 18px;
	outline: none;
	border: none;
	color: #57606a;
	background-color: transparent;
	margin-left: 16px;
	:hover {
		text-decoration: underline;
		color: #0981e5;
	}
`;

const buttonArr = ['Edit', 'Delete'];

function LabelList() {
	function handleEdit() {
		console.log('Edit');
	}

	function handleDelete() {
		console.log('delete');
	}

	return (
		<>
			<LabelWrapper>
				<LabelConainer>
					<Label>123</Label>
				</LabelConainer>
				<LabelContent>
					Lorem ipsum dolor sit amet consectetur adipisicing
				</LabelContent>
				<LabelRelate>{''}</LabelRelate>
				<EditDeleteContainer>
					{buttonArr.map((button, index) => (
						<Button
							key={index}
							onClick={button === 'Edit' ? handleEdit : handleDelete}
						>
							{button}
						</Button>
					))}
				</EditDeleteContainer>
			</LabelWrapper>
		</>
	);
}

export default LabelList;
