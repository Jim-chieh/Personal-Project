import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '../components/Header/Repo/Dropdown';
import '../../.storybook/header.css';

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
			width: '200px',
			height: '500px',
			position: 'relative'
		}}
	>
		<Dropdown {...args} />
	</div>
);

export const DropdownStories = Template.bind({});
DropdownStories.args = {
	array: ['list1', 'list2', 'list3', 'list4'],
	$isActive: true,
	bottom: '350px',
	right: '0px',
	$firstElementShouldhide: 'none'
};
