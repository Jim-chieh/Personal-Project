import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssuePopup from '../pages/IssueList/IssuePopup';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../../.storybook/header.css';

export default {
	title: 'Issuelist/IssuePopup/sort',
	component: IssuePopup,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof IssuePopup>;

const Template: ComponentStory<typeof IssuePopup> = args => (
	<Provider store={store}>
		<div style={{ width: '300px', height: '300px', display: 'flex' }}>
			<IssuePopup {...args} />
		</div>
	</Provider>
);

export const IssuePopupStories = Template.bind({});
IssuePopupStories.args = {
	$display: true,
	$menuData: {
		title: 'Sort by',

		content: [
			{ showText: 'Newest', action: 'created-desc' },
			{ showText: 'Oldest', action: 'created-asc' },
			{ showText: 'Most commented', action: 'comments-desc' },
			{ showText: 'Least commented', action: 'comments-asc' },
			{ showText: 'Recently updated', action: 'updated-desc' },
			{ showText: 'Least recently updated', action: 'updated-asc' }
		],
		smTop: 'sm:top-[30px]',
		smLeft: 'sm:left-[12px]',
		lgLeft: 'lg:left-[50px]',
		autoHeight: false,
		activeList: 'created-desc',
		addDispatch: e => console.log(e)
	}
};
