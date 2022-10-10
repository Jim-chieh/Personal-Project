import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssuePopup from '../pages/IssueList/IssuePopup';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../../.storybook/header.css';

export default {
	title: 'Issuelist/IssuePopup/label',
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
		title: 'Filter by label',
		placeholder: 'Filter labels',
		basicAction: 'Unlabeled',
		content: [
			{
				$background: 'ff0000',
				title: 'test',
				description: '我是label描述'
			},
			{
				$background: 'ff0000',
				title: 'book',
				description: '我是label描述'
			},
			{
				$background: 'ff0000',
				title: 'banana',
				description: '我是label描述'
			}
		],
		smTop: 'sm:top-[30px]',
		smLeft: 'sm:left-[12px]',
		lgLeft: 'lg:left-[50px]',
		autoHeight: false,
		activeList: 'test',
		addDispatch: e => console.log(e)
	}
};
