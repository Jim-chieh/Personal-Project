import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SingleLabel from '../pages/Label/SingleLabel';
import '../../.storybook/header.css';

export default {
	title: 'SingleLabel',
	component: SingleLabel
} as ComponentMeta<typeof SingleLabel>;

const Template: ComponentStory<typeof SingleLabel> = args => (
	<div style={{ margin: '10px' }}>
		<SingleLabel {...args} />
	</div>
);

export const SingleLabelStories = Template.bind({});
SingleLabelStories.args = {
	text: 'Label Name',
	$backgroundColor: '#ff0000'
};
