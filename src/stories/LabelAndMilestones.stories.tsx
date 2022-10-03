import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LabelAndMilestones from '../components/bottomsAndInput/LabelAndMilestones';
import '../../.storybook/header.css';

export default {
	title: 'LabelManagement/LabelAndMilestones',
	component: LabelAndMilestones,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof LabelAndMilestones>;

const Template: ComponentStory<typeof LabelAndMilestones> = args => (
	<div
		style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}
	>
		<LabelAndMilestones {...args} />
	</div>
);

export const LabelAndMilestonesStories = Template.bind({});
LabelAndMilestonesStories.args = {
	array: [
		['Labels', '🐸'],
		['Milestones', '🐸']
	]
};
