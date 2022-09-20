import styled from 'styled-components';

const ContentBox = styled.div`
	width: 100%;
	height: 37px;
	font-size: 14px;
	color: #24292f;
	padding: 10px;
	border-bottom: 1px solid #cccccc;

	:last-child {
		border: none;
	}

	:hover {
		cursor: pointer;
	}
`;

function ProfileDropDown() {
	return (
		<>
			<ContentBox>
				Signed in as <strong>Jim-Chieh</strong>
			</ContentBox>
			<ContentBox>Sign out</ContentBox>
		</>
	);
}

export default ProfileDropDown;
