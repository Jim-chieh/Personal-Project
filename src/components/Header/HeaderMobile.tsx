import styled from 'styled-components';
import ProfileImg from './images.jpg';
import { SignOutIcon } from '@primer/octicons-react';

const SearchBarContainer = styled.div`
	width: 95%;
	margin: 0 auto;
	margin-bottom: 16px;
`;

const SearchBar = styled.input`
	width: 100%;
	height: 28px;
	background-color: transparent;
	border: 1px solid #57606a;
	border-radius: 5px;
	::placeholder {
		color: #c8c9cb;
	}
`;

const MobileNav = styled.div`
	width: 95%;
	height: 37px;
	margin: 0 auto;
	border-top: 1px solid #45494e;
	color: #ffffff;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-weight: 600;
	:last-child {
		height: 60px;
		align-items: flex-start;
		justify-content: flex-start;
		padding-top: 10px;
	}
`;

const Profile = styled.img`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	margin-right: 3px;
`;

const SingOut = styled(SignOutIcon)`
	margin-right: 3px;
`;

const navArr = [
	'Dashboard',
	'Pull requests',
	'Issues',
	'Codespaces',
	'Marketplace',
	'Explore',
	'Settings'
];

function HeaderMobile() {
	return (
		<>
			<SearchBarContainer>
				<SearchBar placeholder="Search" />
			</SearchBarContainer>
			{navArr.map((nav, index) => (
				<MobileNav key={index}>{nav}</MobileNav>
			))}
			<MobileNav>
				<Profile src={ProfileImg} />
				Jim-Chieh
			</MobileNav>
			<MobileNav>
				<SingOut size={16} />
				Sign out
			</MobileNav>
		</>
	);
}

export default HeaderMobile;
