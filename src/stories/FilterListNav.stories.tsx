import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FilterListNav from '../pages/IssueList/FilterListNav';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../../.storybook/header.css';

export default {
	title: 'Issuelist/FilterListNav/FilterListNavLabel',
	component: FilterListNav,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof FilterListNav>;

const Template: ComponentStory<typeof FilterListNav> = args => (
	<Provider store={store}>
		<div style={{ width: '300px', height: '300px', display: 'flex' }}>
			<FilterListNav {...args} />
		</div>
	</Provider>
);

export const FilterListNavStories = Template.bind({});
FilterListNavStories.args = {
	filterArr: ['Label', 'Assignee', 'Sort'],
	$display: true,
	$labelData: [
		{
			color: 'a2eeef',
			default: true,
			description: 'New feature or request',
			id: 4524140941,
			name: 'enhancement',
			node_id: 'LA_kwDOH-ysqM8AAAABDajpjQ',
			url: 'https://api.github.com/repos/Jim-chieh/webpack/labels/enhancement'
		}
	],
	$assigneeData: [
		{
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
		}
	],
	SortbyArr: [
		{ showText: 'Newest', action: 'created-desc' },
		{ showText: 'Oldest', action: 'created-asc' },
		{ showText: 'Most commented', action: 'comments-desc' },
		{ showText: 'Least commented', action: 'comments-asc' },
		{ showText: 'Recently updated', action: 'updated-desc' },
		{ showText: 'Least recently updated', action: 'updated-asc' }
	],
	$currentClick: 'Label',
	$setDisplayFalse: () => console.log('click'),
	$setDisplayTrue: () => console.log('click'),
	$setCurrentClick: e => console.log(e)
};
