import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateCommentComponent from '../pages/NewIssue/CreateCommentComponent';
import '../../.storybook/header.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default {
	title: 'NewIssue/CreateLabelComponent',
	component: CreateCommentComponent,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof CreateCommentComponent>;

const Template: ComponentStory<typeof CreateCommentComponent> = args => (
	<Provider store={store}>
		<div
			style={{
				margin: '20px',
				padding: '10px'
			}}
		>
			<CreateCommentComponent {...args} />
		</div>
	</Provider>
);

export const CreateCommentComponentStories = Template.bind({});
CreateCommentComponentStories.args = {
	$avatarUrl: 'https://avatars.githubusercontent.com/u/98696228?v=4',
	$shouldHasTitle: true,
	$createBtnClick: () => console.log('click')
};
