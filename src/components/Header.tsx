import { useState } from 'react';
import styled from 'styled-components';
import {
	MarkGithubIcon,
	BellIcon,
	PlusIcon,
	TriangleDownIcon,
	ThreeBarsIcon
} from '@primer/octicons-react';
import HeaderMobile from './HeaderMobile';

import ProfileImg from './images.jpg';

const Wrapper = styled.div`
	width: 100%;
	height: 62px;
	background-color: #24292f;
	padding: 16px 24px;
	display: flex;
	align-items: center;
	@media screen and (max-width: 767px) {
		justify-content: space-between;
	}
`;

const HambergerContainer = styled.div`
	display: none;
	@media screen and (max-width: 767px) {
		display: block;
	}
`;

const GitHubIcon = styled(MarkGithubIcon)`
	margin-right: 16px;
`;

const NavBarContainer = styled.div`
	display: flex;
	flex-grow: 1;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const SearchBar = styled.input`
	border: 1px solid #57606a;
	background-color: transparent;
	padding: 0 12px;
	height: 28px;
	width: 266px;
	border-radius: 5px;
	margin-right: 16px;
	position: relative;
	::placeholder {
		color: #c8c9cb;
	}
`;

const InputSlash = styled.div`
	width: 20px;
	height: 20px;
	color: #979a9c;
	font-size: 14px;
	border: 1px solid #57606a;
	border-radius: 5px;
	position: absolute;
	left: 312px;
	top: 21px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const NavContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Nav = styled.div`
	color: #ffffff;
	font-size: 14px;
	margin-right: 16px;
	font-weight: bold;
	:hover {
		cursor: pointer;
		color: bebfb8;
	}

	:first-child {
		@media screen and (max-width: 1011px) {
			display: none;
		}
	}

	:last-child {
		display: none;
		@media screen and (max-width: 1011px) {
			display: inline-block;
			order: -1;
		}
	}
`;

const Bell = styled(BellIcon)`
	margin-right: 16px;
	:hover {
		fill: #bebfc1;
		cursor: pointer;
	}
	@media screen and (max-width: 767px) {
		margin-right: 0px;
	}
`;

const IconContainer = styled.div`
	margin-right: 16px;
	display: flex;
	align-items: center;
	@media screen and (max-width: 767px) {
		display: none;
	}
	:hover {
		cursor: pointer;
	}

	:last-child {
		margin-right: 0px;
	}
`;

const Plus = styled(PlusIcon)`
	${IconContainer}:hover & {
		fill: #bebfc1;
	}
`;

const Triangle = styled(TriangleDownIcon)`
	${IconContainer}:hover & {
		fill: #bebfc1;
	}
`;

const Profile = styled.img`
	width: 20px;
	height: 20px;
	border-radius: 50%;
`;

const MobileMenu = styled.div`
	background-color: #24292f;
`;

const navArr = ['Pull requests', 'Issues', 'Marketplace', 'Explore', 'Pulls'];

function Header() {
	const [menuClick, setMenuClick] = useState();
	return (
		<>
			<Wrapper>
				<HambergerContainer>
					<ThreeBarsIcon size={24} fill="#ffffff" />
				</HambergerContainer>
				<GitHubIcon size={32} fill="#ffffff" />
				<NavBarContainer>
					<SearchBar placeholder="Search or jump to..." />
					<InputSlash>/</InputSlash>
					<NavContainer>
						{navArr.map((nav, index) => (
							<Nav key={index}>{nav}</Nav>
						))}
					</NavContainer>
				</NavBarContainer>
				<Bell size={16} fill="#ffffff" />
				<IconContainer>
					<Plus size={16} fill="#ffffff" />
					<Triangle size={16} fill="#ffffff" />
				</IconContainer>
				<IconContainer>
					<Profile src={ProfileImg} alt="Profile" />
					<Triangle size={16} fill="#ffffff" />
				</IconContainer>
			</Wrapper>
			<MobileMenu>
				<HeaderMobile />
			</MobileMenu>
		</>
	);
}

export default Header;
