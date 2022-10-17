import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RenderEmoji from '../pages/IssuePage/RenderEmoji';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default {
	title: 'IssuePage/RenderEmoji',
	component: RenderEmoji,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof RenderEmoji>;

const Template: ComponentStory<typeof RenderEmoji> = args => (
	<Provider store={store}>
		<div
			style={{
				margin: '20px',
				padding: '70px',
				width: '200px'
			}}
		>
			<RenderEmoji {...args} />
		</div>
	</Provider>
);

export const RenderEmojiStories = Template.bind({});
RenderEmojiStories.args = {
	type: 'laugh',
	number: 2
};
