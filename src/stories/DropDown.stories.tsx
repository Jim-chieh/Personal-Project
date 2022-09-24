import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '../components/Header/Repo/Dropdown';

export default {
	title: 'List',
	component: Dropdown,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = args => (
	<div
		style={{
			width: '178px',
			height: '500px',
			backgroundColor: 'black',
			position: 'relative',
			overflow: 'hidden'
		}}
	>
		<Dropdown {...args} />
	</div>
);

export const DropdownStories = Template.bind({});
DropdownStories.args = {
	array: ['list1', 'list2', 'list3', 'list4'],
	$isActive: true,
	bottom: '0px',
	right: '-20px',
	$firstElementShouldhide: 'none'
};
