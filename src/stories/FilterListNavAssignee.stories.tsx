import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssuePopup from '../pages/IssueList/IssuePopup';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../../.storybook/header.css';

export default {
	title: 'Issuelist/IssuePopup/assignee',
	component: IssuePopup,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof IssuePopup>;

const Template: ComponentStory<typeof IssuePopup> = args => (
	<Provider store={store}>
		<div style={{ width: '100%', height: '300px', display: 'relative' }}>
			<IssuePopup {...args} />
		</div>
	</Provider>
);

export const IssuePopupStories = Template.bind({});
IssuePopupStories.args = {
	$display: true,
	$onClick: () => {},
	$menuData: {
		title: 'Filter by who’s assigned',
		placeholder: 'Filter users',
		basicAction: 'Assigned to nobody',
		content: [
			{
				picture: 'https://avatars.githubusercontent.com/u/98696228?v=4',
				header: 'Jim-chieh'
			}
		],
		smTop: 'sm:top-[30px]',
		smLeft: 'sm:left-[95px]',
		lgLeft: 'lg:left-[-135px]',
		autoHeight: true,
		activeList: 'Jim-chieh',
		addDispatch: e => console.log(e)
	}
};
