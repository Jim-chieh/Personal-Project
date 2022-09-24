import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputComponent from '../components/bottomsAndInput/InputComponent';

export default {
	title: 'InputComponent',
	component: InputComponent,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof InputComponent>;

const Template: ComponentStory<typeof InputComponent> = args => (
	<div
		style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}
	>
		<InputComponent />
	</div>
);

export const InputComponentStories = Template.bind({});
InputComponentStories.args = {};
