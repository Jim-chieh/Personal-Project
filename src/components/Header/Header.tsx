import { useState, useEffect } from 'react';
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
import RepoDetail from './Repo/RepoDetail';
import Dropdown from './Repo/Dropdown';
import { supabase } from '../../OAuth/Clients';
import BlurEffect from '../BlurEffect';
import { redirect } from 'react-router-dom';

type Click = { $isActive: boolean };

export interface UserType {
	id: string;
	aud: string;
	role: string;
	email: string;
	email_confirmed_at: string;
	phone: string;
	confirmed_at: string;
	last_sign_in_at: string;
	app_metadata: AppMetadata;
	user_metadata: UserMetadata;
	identities: Identity[];
	created_at: string;
	updated_at: string;
}

export interface AppMetadata {
	provider: string;
	providers: string[];
}

export interface UserMetadata {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	full_name: string;
	iss: string;
	name: string;
	preferred_username: string;
	provider_id: string;
	sub: string;
	user_name: string;
}

export interface Identity {
	id: string;
	user_id: string;
	identity_data: IdentityData;
	provider: string;
	last_sign_in_at: string;
	created_at: string;
	updated_at: string;
}

export interface IdentityData {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	full_name: string;
	iss: string;
	name: string;
	preferred_username: string;
	provider_id: string;
	sub: string;
	user_name: string;
}

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
	:hover {
		cursor: pointer;
	}
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
	max-width: 518px;
	width: 266px;
	border-radius: 5px;
	margin-right: 16px;
	flex-grow: ${props => (props.$isActive ? '1' : '0')};
	position: relative;
	outline: none;
	transition: ease-in-out 0.3s;
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
	/* transition: all 0.1s; */
`;

const NavContainer = styled.div`
	display: flex;
	align-items: center;
	:hover {
		color: #bebfc1;
	}
`;

const Nav = styled.div`
	color: #ffffff;
	font-size: 14px;
	margin-right: 16px;
	font-weight: bold;
	:hover {
		cursor: pointer;
		color: #bebfb8;
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
	:hover & {
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

const MobileMenu = styled.div<Click>`
	display: none;
	@media screen and (max-width: 767px) {
		background-color: #24292f;
		display: ${props => (props.$isActive ? 'block' : 'none')};
	}
`;

const ProfileDrop = styled.div<Click>`
	position: absolute;
	bottom: -530px;
	right: 0px;
	width: 178px;
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-radius: 10px;
	display: ${props => (props.$isActive ? 'block' : 'none')};
	z-index: 199;
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

const SighinButton = styled.button`
	width: 70px;
	height: 30px;
	padding: 5px;
	background-color: transparent;
	border: 1px solid #ffffff;
	color: #ffffff;
	border-radius: 5px;
	:hover {
		cursor: pointer;
		border: 1px solid #cccccc;
		color: #cccccc;
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
	const [user, setUser] = useState<UserType>();

	useEffect(() => {
		checkUser();
		window.addEventListener('hashchange', () => {
			checkUser();
		});
	}, []);

	async function checkUser() {
		const user = supabase.auth.user() as UserType;
		setUser(user);
		if (user) {
			const token = JSON.parse(
				localStorage.getItem('supabase.auth.token') as string
			);
			JSON.stringify(
				localStorage.setItem('token', token.currentSession.provider_token)
			);
		}
	}

	async function signInWithGitHub() {
		const { user, session, error } = await supabase.auth.signIn(
			{
				provider: 'github'
			},
			{
				scopes: 'repo gist notifications'
			}
		);
	}

	async function signOut() {
		await supabase.auth.signOut();
		setUser(undefined);
		localStorage.removeItem('token');
		window.location.reload();
	}

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

				{user === null ? (
					<SighinButton onClick={signInWithGitHub}>Sign in</SighinButton>
				) : user === undefined ? (
					<SighinButton onClick={signInWithGitHub}>Sign in</SighinButton>
				) : (
					<>
						<Bell size={16} fill="#ffffff" />
						<IconContainer onClick={() => setPlusClick(!plusClick)}>
							<Plus size={16} fill="#ffffff" />
							<Triangle size={16} fill="#ffffff" />
							<Dropdown
								array={plusArr}
								$isActive={plusClick}
								bottom={'-158px'}
								right={'0px'}
							/>
							<BlurEffect
								open={plusClick ? 'block' : 'none'}
								onClick={() => setPlusClick(false)}
							/>
						</IconContainer>
						<IconContainer onClick={() => setProfileClick(!profileClick)}>
							<Profile
								src={user.identities[0].identity_data.avatar_url}
								alt="Profile"
							/>
							<Triangle size={16} fill="#ffffff" />
							<ProfileDrop $isActive={profileClick}>
								<ProfileDropDown
									$signoutClick={signOut}
									$userFullName={
										user.identities[0].identity_data.preferred_username
									}
								/>
							</ProfileDrop>
							<BlurEffect
								open={profileClick ? 'block' : 'none'}
								onClick={() => setProfileClick(false)}
							/>
						</IconContainer>
					</>
				)}
			</Wrapper>
			{user === null || user === undefined ? null : (
				<MobileMenu $isActive={menuClick}>
					<HeaderMobile
						$userFullName={
							(user as UserType).identities[0].identity_data.preferred_username
						}
						$userProfileUrl={
							(user as UserType).identities[0].identity_data.avatar_url
						}
						$signoutClick={signOut}
					/>
				</MobileMenu>
			)}
			<RepoDetail />
		</>
	);
}

export default Header;
