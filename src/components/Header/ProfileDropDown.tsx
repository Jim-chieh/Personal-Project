import styled from 'styled-components';
import { SmileyIcon } from '@primer/octicons-react';

const ContentBox = styled.div`
	width: 100%;
	font-size: 14px;
	color: #24292f;
	border-bottom: 1px solid #d0d7de;
`;

const Profile = styled.div`
	width: 100%;
	font-size: 14px;
	color: #24292f;
	padding: 10px 0;
	padding-left: 16px;
	padding-right: 8px;
	border-bottom: 1px solid #d0d7de;
`;

const Signout = styled.div`
	width: 100%;
	font-size: 14px;
	color: #24292f;
	padding: 5px 0;
	margin: 5px 0;
	padding-left: 16px;
	padding-right: 8px;
	border-bottom: 1px solid #d0d7de;
	overflow: hidden;
	border: none;

	:hover {
		background-color: #0969da;
		color: #ffffff;
	}
`;

const ContentWithoutBorder = styled.div`
	width: 100%;
	/* height: 37px; */
	font-size: 14px;
	color: #24292f;
	font-size: 14px;
	padding: 5px 0;
	margin: 3px 0;
	padding-left: 16px;
	padding-right: 8px;
	:hover {
		background-color: #0969da;
		color: #ffffff;
	}
`;

const SetSatusContainer = styled.div`
	width: 90%;
	height: 31px;
	border: 1px solid #d0d7de;
	border-radius: 10px;
	margin: 10px auto;
	display: flex;
	align-items: center;
	color: #6c747d;
	padding: 10px 10px;
	padding-left: 16px;
	padding-right: 8px;
	:hover {
		color: #0969da;
	}
`;

const Smiley = styled(SmileyIcon)`
	margin-right: 8px;

	${SetSatusContainer}:hover & {
		fill: #0969da;
	}
`;

const profileArr = [
	'Your profile',
	'Your repositories',
	'	Your codespaces',
	'Your organizations',
	'Your projects',
	'Your stars',
	'Your gists'
];

const settingArr = ['Upgrade', 'Feature preview', 'Help', 'Settings'];

function ProfileDropDown() {
	return (
		<>
			<ContentBox>
				<Profile>
					Signed in as <strong>Jim-Chieh</strong>
				</Profile>
			</ContentBox>
			<ContentBox>
				<SetSatusContainer>
					<Smiley size={16} fill="#6c747d" />
					Set status
				</SetSatusContainer>
			</ContentBox>
			<ContentBox>
				{profileArr.map((profile, index) => (
					<ContentWithoutBorder key={index}>{profile}</ContentWithoutBorder>
				))}
			</ContentBox>
			<ContentBox>
				{settingArr.map((setting, index) => (
					<ContentWithoutBorder key={index}>{setting}</ContentWithoutBorder>
				))}
			</ContentBox>
			<ContentBox>
				<Signout
					onClick={() => {
						console.log('click');
					}}
				>
					Sign out
				</Signout>
			</ContentBox>
		</>
	);
}

export default ProfileDropDown;
