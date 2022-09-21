import styled from 'styled-components';
import { MarkGithubIcon } from '@primer/octicons-react';

const OuterWrapper = styled.div`
	width: 100%;
	position: absolute;
	bottom: 40px;
`;

const Wrapper = styled.div`
	max-width: 1248px;
	height: 114px;
	padding: 0 16px;
	display: flex;
	align-items: center;
	margin: 0 auto;
	@media screen and (max-width: 1011px) {
		height: 156px;
	}
	@media screen and (max-width: 642px) {
		height: 174px;
	}
`;

const Container = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: flex-start;
	padding-top: 40px;
	padding-bottom: 8px;
	border-top: 1px solid #d8dee4;

	@media screen and (max-width: 1011px) {
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
	}
`;

const LogoWrapper = styled.div`
	width: 175px;
	/* height: 25px; */
`;

const LogoContainer = styled.div`
	width: 136px;
	height: 25px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media screen and (max-width: 1011px) {
		margin-top: 8px;
		flex-wrap: wrap;
	}
`;

const GithubCopyRight = styled.span`
	font-size: 12px;
	color: #57606a;
`;

const NavBar = styled.ul`
	width: 67%;
	list-style: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 30px;
	@media screen and (max-width: 1011px) {
		margin-bottom: 8px;
		flex-wrap: wrap;
		justify-content: center;
		width: 94%;
		margin-left: 0;
	}
`;

const NavList = styled.li`
	color: #0969da;
	font-size: 12px;
	line-height: 1.5;
	@media screen and (max-width: 1011px) {
		margin-right: 16px;
		height: 16px;
	}

	:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;

const FooterArr = [
	'Terms',
	'Privacy',
	'Security',
	'Status',
	'Docs',
	'Contact GitHub',
	'Pricing',
	'API',
	'Training',
	'Blog',
	'About'
];

function Footer() {
	return (
		<OuterWrapper>
			<Wrapper>
				<Container>
					<LogoWrapper>
						<LogoContainer>
							<MarkGithubIcon size={24} fill="#6e7781" />
							<GithubCopyRight>© 2022 GitHub, Inc.</GithubCopyRight>
						</LogoContainer>
					</LogoWrapper>
					<NavBar>
						{FooterArr.map((footer, index) => (
							<NavList key={index}>{footer}</NavList>
						))}
					</NavBar>
				</Container>
			</Wrapper>
		</OuterWrapper>
	);
}

export default Footer;
