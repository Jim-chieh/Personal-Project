import ActionList from './ActionList';
import styled from 'styled-components';
import {
	RepoIcon,
	PinIcon,
	EyeIcon,
	RepoForkedIcon,
	StarIcon
} from '@primer/octicons-react';

const Wrapper = styled.div`
	width: 100%;
	background-color: #f6f8fa;
`;

const RepoNameContainer = styled.div`
	width: 100%;
	padding: 0 32px;
	padding-top: 16px;
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	margin-bottom: 16px;
	white-space: nowrap;
	flex-wrap: wrap;
	@media screen and (max-width: 1011px) {
		padding: 0 24px;
		padding-top: 16px;
	}
`;

const RepoInner = styled.div`
	height: 30px;
	display: flex;
	align-items: center;
	@media screen and (max-width: 567px) {
		flex-wrap: wrap;
	}
`;

const RepoIconComponent = styled(RepoIcon)`
	margin-right: 8px;
`;

const ShowRepoName = styled.a`
	text-decoration: none;
	color: #0969da;
	font-size: 20px;
`;

const Slash = styled.span`
	font-size: 20px;
	margin: 0 4px;
`;

const Public = styled.div`
	width: 50px;
	height: 20px;
	border-radius: 10px;
	font-size: 12px;
	color: #57606a;
	margin-left: 8px;
	border: 1px solid #d0d7de;
	padding: 0px 7px;
	display: flex;
	align-items: center;
`;

const RepoActions = styled.div`
	display: flex;
	margin-left: auto;
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const Pin = styled(PinIcon)`
	margin-right: 8px;
`;

const PinContainer = styled.div`
	/* width: 70px; */
	height: 28px;
	border: 1px solid #d5d8da;
	border-radius: 10px;
	padding: 3px 12px;
	font-size: 12px;
	display: flex;
	align-items: center;
	margin-right: 8px;
	:hover {
		cursor: pointer;
		background-color: #f3f4f6;
	}
`;

const Unwatch = styled(EyeIcon)`
	margin-right: 8px;
`;

const IconWrapper = styled.div`
	/* width: 100px; */
	height: 28px;
	border: 1px solid #d5d8da;
	border-radius: 10px;
	padding: 0px 12px;
	font-size: 12px;
	display: flex;
	align-items: center;
	margin-right: 8px;
	:hover {
		cursor: pointer;
		background-color: #f3f4f6;
	}
	:last-child {
		margin-right: 0px;
	}
`;

const IconContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Triangle = styled.div`
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 4px 4px 0 4px;
	border-color: #4e5257 transparent transparent transparent;
	margin-left: 4px;
	/* position: absolute; */
`;

const Circle = styled.div`
	width: 20px;
	height: 20px;
	background-color: #e2e3e6;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 4px;
`;

const Fork = styled(RepoForkedIcon)`
	margin-right: 8px;
`;

const TriangleContainer = styled.div`
	height: 100%;
	border-left: 1px solid #d5d8da;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 0px 8px 3px;
	margin-left: 8px;
	${IconContainer}:hover & {
		background-color: blue;
	}
`;

const Star = styled(StarIcon)`
	margin-right: 8px;
`;

function RepoDetail() {
	return (
		<Wrapper>
			<RepoNameContainer>
				<RepoInner>
					<RepoIconComponent size={16} fill="#57606a" />
					<ShowRepoName>Jim-chieh</ShowRepoName>
					<Slash>/</Slash>
					<ShowRepoName>
						<strong>Personal-Project</strong>
					</ShowRepoName>
					<Public>Public</Public>
				</RepoInner>
				<RepoActions>
					<PinContainer>
						<Pin size={16} />
						Pin
					</PinContainer>
					<IconWrapper>
						<Unwatch size={16} />
						Unwatch
						<Circle>1</Circle>
						<Triangle />
					</IconWrapper>
					<IconWrapper>
						<IconContainer>
							<Fork size={16} />
							Fork
							<Circle>0</Circle>
						</IconContainer>
						<TriangleContainer>
							<Triangle />
						</TriangleContainer>
					</IconWrapper>
					<IconWrapper>
						<IconContainer>
							<Star size={16} />
							Star
							<Circle>0</Circle>
						</IconContainer>
						<TriangleContainer>
							<Triangle />
						</TriangleContainer>
					</IconWrapper>
				</RepoActions>
			</RepoNameContainer>
			<ActionList />
		</Wrapper>
	);
}

export default RepoDetail;
