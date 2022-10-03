import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LabelList from '../pages/Label/LabelList';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../../.storybook/header.css';

export default {
	title: 'LabelManagement/CreateLabelComponent',
	component: LabelList,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof LabelList>;

const Template: ComponentStory<typeof LabelList> = args => (
	<Provider store={store}>
		<div
			style={{
				margin: '20px',
				padding: '10px'
			}}
		>
			<LabelList {...args} />
		</div>
	</Provider>
);

export const CreateLabelComponentStories = Template.bind({});
CreateLabelComponentStories.args = {
	$dataBackgroundColor: `${'#ff0000'.split('#')[1]}`,
	$dataLabelName: 'label name',
	$dataDescription: 'test'
};
