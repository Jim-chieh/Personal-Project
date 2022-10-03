import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NewIssueAndLabel from '../components/bottomsAndInput/NewIssueAndLabel';
import '../../.storybook/header.css';

export default {
	title: 'LabelManagement/NewIssueButton',
	component: NewIssueAndLabel,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof NewIssueAndLabel>;

const Template: ComponentStory<typeof NewIssueAndLabel> = args => (
	<div
		style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}
	>
		<NewIssueAndLabel {...args} />
	</div>
);

export const NewIssueButtonStories = Template.bind({});
NewIssueButtonStories.args = {
	buttonName: 'test',
	backgroundColor: '#ff0000',
	textColor: '#ffffff',
	$border: '',
	$hoverColor: 'blue',
	$checkMouseEvent: true
};
