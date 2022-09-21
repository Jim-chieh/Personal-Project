import styled from 'styled-components';
import { SearchIcon } from '@primer/octicons-react';

const Wrapper = styled.div`
	padding: 0px 8px;
	position: relative;
	flex-grow: 1;
	@media screen and (max-width: 767px) {
		padding-left: 0px;
	}
`;

const Input = styled.input`
	width: 320px;
	height: 32px;
	padding: 5px 12px 5px 32px;
	background-color: #f6f8fa;
	border: 1px solid #d0d7de;
	border-radius: 5px;
	outline: none;
	font-size: 16px;
	::placeholder {
		color: #6e7781;
		font-size: 14px;
	}
	:focus {
		background-color: #ffffff;
		border: 2px solid #0969da;
	}
`;

const Search = styled(SearchIcon)`
	position: absolute;
	left: 19px;
	top: 8px;
	@media screen and (max-width: 767px) {
		left: 12px;
	}
`;

function InputComponent() {
	return (
		<Wrapper>
			<Input placeholder="Search all labels" />
			<Search size={16} fill="#57606a" />
		</Wrapper>
	);
}

export default InputComponent;
