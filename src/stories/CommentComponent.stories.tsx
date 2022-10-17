import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommentComponent from '../pages/IssuePage/CommentComponent';
import '../../.storybook/header.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default {
	title: 'IssuePage/CommentComponent',
	component: CommentComponent,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof CommentComponent>;

const Template: ComponentStory<typeof CommentComponent> = args => (
	<Provider store={store}>
		<div
			style={{
				margin: '20px',
				padding: '70px'
			}}
		>
			<CommentComponent {...args} />
		</div>
	</Provider>
);

export const CommentComponentStories = Template.bind({});
CommentComponentStories.args = {
	$avatar: 'https://avatars.githubusercontent.com/u/98696228?v=4',
	$created_at: '2022-10-01T08:54:53',
	$author_association: 'OWNER',
	$author: 'Jim-chieh',
	$currentLogin: 'Jim-chieh',
	$body: 'test',
	currentIndex: 2,
	currentBody: '',
	commentId: 123456,
	$reactions: {
		url: 'https://api.github.com/repos/Jim-chieh/webpack/issues/50/reactions',
		total_count: 8,
		'+1': 1,
		'-1': 1,
		laugh: 1,
		hooray: 1,
		confused: 1,
		heart: 1,
		rocket: 1,
		eyes: 1
	}
};
