import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssuePageFixedTtitle from '../pages/IssuePage/IssuePageFixedTitle';
import '../../.storybook/header.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default {
	title: 'IssuePage/FixedTitle/open',
	component: IssuePageFixedTtitle,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof IssuePageFixedTtitle>;

const Template: ComponentStory<typeof IssuePageFixedTtitle> = args => (
	<Provider store={store}>
		<div
			style={{
				margin: '20px',
				padding: '70px'
			}}
		>
			<IssuePageFixedTtitle {...args} />
		</div>
	</Provider>
);

export const IssuePageFixedTtitleStories = Template.bind({});
IssuePageFixedTtitleStories.args = {
	title: 'Storybook',
	number: 70,
	author: 'Jim-chieh',
	comments: 7,
	$created_at: '2022-10-01T08:54:53',
	currentState: 'open'
};
