import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateLabelComponent from '../pages/Label/CreateLabelComponent';

export default {
	title: 'CreateLabelComponent',
	component: CreateLabelComponent,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof CreateLabelComponent>;

const Template: ComponentStory<typeof CreateLabelComponent> = args => (
	<div style={{ margin: '20px', width: '100%', display: 'flex' }}>
		<CreateLabelComponent {...args} />
	</div>
);

export const CreateLabelComponentStories = Template.bind({});
CreateLabelComponentStories.args = {
	$textColor: 'red',
	$checkInputLength: '5',
	$dataLabelName: ''
};
