import styled from 'styled-components';
import { SearchIcon } from '@primer/octicons-react';

type WrapperProps = {
	$padding: boolean;
};

const Wrapper = styled.div<WrapperProps>`
	padding: ${props => (props.$padding ? '0px 8px' : '0px')};
	padding-left: ${props => (props.$padding ? '8px' : '0px')};
	position: relative;
	flex-grow: 1;
	@media screen and (max-width: 767px) {
		padding-left: 0px;
	}
`;

const Input = styled.input<WrapperProps>`
	width: 100%;
	height: 32px;
	padding: 5px 12px 5px 32px;
	background-color: #f6f8fa;
	border: 1px solid #d0d7de;
	border-radius: ${props => (props.$padding ? ' 5px ' : '0 5px 5px 0')};
	outline: none;
	font-size: 16px;
	color: #6e7781;
	font-size: 14px;
	::placeholder {
		color: #6e7781;
		font-size: 14px;
	}
	:focus {
		background-color: #ffffff;
		border: 2px solid #0969da;
	}
`;

const Search = styled(SearchIcon)<WrapperProps>`
	position: absolute;
	left: ${props => (props.$padding ? ' 19px ' : '11px')};
	top: 8px;
	@media screen and (max-width: 767px) {
		left: 12px;
	}
`;

type InputComponents = {
	$value?: string;
	$onChange: (e: string) => void;
	$shouldHasPadding: boolean;
};

function InputComponent({
	$value,
	$onChange,
	$shouldHasPadding
}: InputComponents) {
	return (
		<Wrapper $padding={$shouldHasPadding}>
			<Input
				placeholder="Search all labels"
				value={$value}
				onChange={e => $onChange(e.target.value)}
				$padding={$shouldHasPadding}
			/>
			<Search size={16} fill="#57606a" $padding={$shouldHasPadding} />
		</Wrapper>
	);
}

export default InputComponent;
