import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 70vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50px;
`;

function PleaseLogin() {
	return <Wrapper>請先登入!</Wrapper>;
}

export default PleaseLogin;
