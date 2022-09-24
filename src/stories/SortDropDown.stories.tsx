import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SortDropDown from '../components/SortDropDown';

export default {
	title: 'SortDropDown',
	component: SortDropDown
} as ComponentMeta<typeof SortDropDown>;

const Template: ComponentStory<typeof SortDropDown> = args => (
	<div style={{ margin: '10px', position: 'relative' }}>
		<SortDropDown {...args} />
	</div>
);

export const SortDropDownStories = Template.bind({});
SortDropDownStories.args = {
	array: [['list1'], ['list2'], ['list3']],
	$isActive: true,
	$HeaderText: 'Sort'
};
