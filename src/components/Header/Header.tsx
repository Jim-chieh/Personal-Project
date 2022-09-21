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
import ProfileDropDown from './ProfileDropDown';
import ProfileImg from './images.jpg';
import RepoDetail from './Repo/RepoDetail';
import Dropdown from './Dropdown';

type Click = { $isActive: boolean };

const Wrapper = styled.div`
	width: 100%;
	height: 62px;
	background-color: #24292f;
	padding: 16px 32px;
	display: flex;
	align-items: center;
	@media screen and (max-width: 1011px) {
		padding: 16px 24px;
	}
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

const SearchBar = styled.input<Click>`
	border: 1px solid ${props => (props.$isActive ? '#ffffff' : '#57606a')};
	background-color: ${props => (props.$isActive ? 'white' : 'transparent')};
	padding: 0 12px;
	height: 28px;
	width: ${props => (props.$isActive ? '40%' : '266px')};
	border-radius: 5px;
	margin-right: 16px;
	position: relative;
	outline: none;
	transition: all 0.5s;
	color: ${props => (props.$isActive ? 'black' : 'white')};
	::placeholder {
		color: #c8c9cb;
	}
`;

const InputSlash = styled.div<Click>`
	width: 20px;
	height: 20px;
	color: ${props => (props.$isActive ? 'white' : '#979a9c')};
	font-size: 14px;
	border: 1px solid ${props => (props.$isActive ? 'white' : '#57606a')};
	border-radius: 5px;
	position: absolute;
	left: 312px;
	top: 21px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.5s;
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
	position: relative;
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

const Input = styled.input`
	width: 32px;
	height: 20px;
	border: none;
	outline: none;
	background-color: transparent;
	position: absolute;
	right: 4px;
	cursor: pointer;
	color: transparent;
`;

const ProfileInput = styled(Input)`
	width: 30px;
	right: 55px;
`;

const MobileMenu = styled.div<Click>`
	display: none;
	@media screen and (max-width: 767px) {
		background-color: #24292f;
		display: ${props => (props.$isActive ? 'block' : 'none')};
	}
`;

const ProfileDrop = styled.div<Click>`
	position: absolute;
	bottom: -464px;
	right: 0px;
	width: 178px;
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-radius: 10px;
	display: ${props => (props.$isActive ? 'block' : 'none')};
	&:after {
		border-right: solid 10px transparent;
		border-left: solid 10px transparent;
		border-bottom: solid 10px #ffffff;
		transform: translateX(-50%);
		position: absolute;
		content: '';
		top: -10px;
		right: 0px;
		height: 0;
		width: 0;
	}

	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const navArr = ['Pull requests', 'Issues', 'Marketplace', 'Explore', 'Pulls'];
const plusArr = [
	'New repository',
	'Import repository',
	'New gist',
	'New organization'
];

function Header() {
	const [menuClick, setMenuClick] = useState(false);
	const [inputClick, setInputClick] = useState(false);
	const [profileClick, setProfileClick] = useState(false);
	const [plusClick, setPlusClick] = useState(false);

	return (
		<>
			<Wrapper>
				<HambergerContainer onClick={() => setMenuClick(!menuClick)}>
					<ThreeBarsIcon size={24} fill="#ffffff" />
				</HambergerContainer>
				<GitHubIcon size={32} fill="#ffffff" />
				<NavBarContainer>
					<SearchBar
						placeholder="Search or jump to..."
						onClick={() => setInputClick(true)}
						onBlur={() => setInputClick(false)}
						$isActive={inputClick}
					/>
					<InputSlash $isActive={inputClick}>/</InputSlash>
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
					<Input
						onClick={() => setProfileClick(!profileClick)}
						onBlur={() => setProfileClick(false)}
					/>
					<Profile src={ProfileImg} alt="Profile" />
					<Triangle size={16} fill="#ffffff" />
					<ProfileDrop $isActive={profileClick}>
						<ProfileDropDown />
					</ProfileDrop>
					<ProfileInput
						onClick={() => setPlusClick(!plusClick)}
						onBlur={() => setPlusClick(false)}
					/>
					<Dropdown array={plusArr} $isActive={plusClick} />
				</IconContainer>
			</Wrapper>
			<MobileMenu $isActive={menuClick}>
				<HeaderMobile />
			</MobileMenu>
			<RepoDetail />
		</>
	);
}

export default Header;
