import styled from 'styled-components';

const NewIssue = styled.button`
	width: 97px;
	height: 31px;
	background-color: #2da44e;
	outline: none;
	border: 1px solid #2a9048;
	border-radius: 5px;
	color: #ffffff;
	font-size: 14px;
	font-weight: 600;
	white-space: nowrap;
	:hover {
		background-color: #2c974b;
	}
`;

function NewIssueAndLabel() {
	return <NewIssue>New label</NewIssue>;
}

export default NewIssueAndLabel;
