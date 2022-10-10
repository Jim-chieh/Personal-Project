import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IssueActions from '../pages/NewIssue/IssueActions';
import '../../.storybook/header.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { GearIcon } from '@primer/octicons-react';

export default {
	title: 'NewIssue/IssueActions',
	component: IssueActions,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof IssueActions>;

const Template: ComponentStory<typeof IssueActions> = args => (
	<Provider store={store}>
		<div
			style={{
				margin: '20px',
				padding: '80px'
			}}
		>
			<IssueActions {...args} />
		</div>
	</Provider>
);
const ActionsArr = [
	{
		title: 'Assignees',
		icon: '🐸',
		content: [],
		currentClick: [],
		description: 'No one—',
		more: 'assign yourself',
		currentLogin: '',
		popupData: {
			title: 'Assign up to 10 people to this issue',
			placeholder: 'Type or choose a user',
			secondTitle: 'Suggestions',
			content: [
				{
					picture: 'https://avatars.githubusercontent.com/u/98696228?v=4',
					header: 'Jim-chieh'
				}
			],
			smTop: 'sm:top-[20px]',
			smLeft: 'sm:left-[12px]',
			lgTop: 'md:top-[26px]',
			lgLeft: 'md:left-[-30px]',
			autoHeight: true,
			activeList: '',
			$stillShowOnMdSize: true,
			addDispatch: (e: string) => console.log(e)
		}
	},
	{
		title: 'Labels',
		icon: <GearIcon />,
		content: [],
		description: 'None yet',
		currentClick: [],
		popupData: {
			title: 'Filter by label',
			placeholder: 'Filter labels',
			content: [
				{
					$background: `${'#ff0000'}`,
					title: `${'test'}`,
					description: `${'description'}`
				}
			],
			smTop: 'sm:top-[0px]',
			smLeft: 'sm:left-[0px]',
			lgTop: 'md:top-[18px]',
			lgLeft: 'md:left-[-30px]',
			autoHeight: false,
			activeList: '',
			$stillShowOnMdSize: true,
			$shouldhasXIcon: true,
			addDispatch: (e: string) => console.log(e)
		}
	},
	{
		title: 'Projects',
		icon: <GearIcon />,
		content: [],
		description: 'None yet',
		autoheight: true,
		addDispatch: (e: string) => console.log(e)
	},
	{
		title: 'Milestone',
		icon: <GearIcon />,
		content: [],
		description: 'No milestone'
	},
	{
		title: 'Development',
		content: [],
		description: 'Shows branches and pull requests linked to this issue.',
		noHoverEffect: true
	},
	{
		title: 'Helpful resources',
		outerLink: (
			<a
				href="https://docs.github.com/en/site-policy/github-terms/github-community-guidelines"
				target="-blank"
				className="text-xs text-[#0969da] hover:underline"
			>
				GitHub Community Guidelines
			</a>
		),
		noHoverEffect: true
	}
];

export const IssueActionsStories = Template.bind({});

IssueActionsStories.args = {
	action: ActionsArr[0]
};
