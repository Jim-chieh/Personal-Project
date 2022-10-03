import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueTitleHoverPopup from '../pages/IssueList/IssueTitleHoverPopup';
import '../../.storybook/header.css';

export default {
	title: 'Issuelist/Issuelist',
	component: IssueTitleHoverPopup,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof IssueTitleHoverPopup>;

const Template: ComponentStory<typeof IssueTitleHoverPopup> = args => (
	<div
		style={{
			marginLeft: '50px',
			marginTop: '250px',
			padding: '20px',
			display: 'block',
			justifyContent: 'space-between',
			position: 'relative'
		}}
	>
		<IssueTitleHoverPopup {...args} />
	</div>
);

export const IssueTitleHoverPopupStories = Template.bind({});
IssueTitleHoverPopupStories.args = {
	user: {
		avatar_url: 'https://avatars.githubusercontent.com/u/98696228?v=4',
		events_url: 'https://api.github.com/users/Jim-chieh/events{/privacy}',
		followers_url: 'https://api.github.com/users/Jim-chieh/followers',
		following_url:
			'https://api.github.com/users/Jim-chieh/following{/other_user}',
		gists_url: 'https://api.github.com/users/Jim-chieh/gists{/gist_id}',
		gravatar_id: '',
		html_url: 'https://github.com/Jim-chieh',
		id: 98696228,
		login: 'Jim-chieh',
		node_id: 'U_kgDOBeH8JA',
		organizations_url: 'https://api.github.com/users/Jim-chieh/orgs',
		received_events_url:
			'https://api.github.com/users/Jim-chieh/received_events',
		repos_url: 'https://api.github.com/users/Jim-chieh/repos',
		site_admin: false,
		starred_url:
			'https://api.github.com/users/Jim-chieh/starred{/owner}{/repo}',
		subscriptions_url: 'https://api.github.com/users/Jim-chieh/subscriptions',
		type: 'User',
		url: 'https://api.git'
	},
	labels: [
		{
			color: 'a2eeef',
			default: true,
			description: 'New feature or request',
			id: 4524140941,
			name: 'test',
			node_id: 'LA_kwDOH-ysqM8AAAABDajpjQ',
			url: 'https://api.github.com/repos/Jim-chieh/webpack/labels/enhancement'
		}
	],
	number: 5,
	title: 'storybook標題',
	created_at: '2022-10-01T08:54:53Z',
	state_reason: 'not_planned',
	body: '有description才有這個'
};
