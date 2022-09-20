import { useEffect, useRef, useState } from 'react';
import api from '../utils/api';

function LabelManagement() {
	// const [labels, setLabels] = useState();
	const labelName = useRef();
	const labelColor = useRef();
	const labeldescription = useRef();
	// console.log(labels);
	// useEffect(() => {
	// 	fetch('https://api.github.com/repos/Jim-chieh/Personal-Project/labels')
	// 		.then(res => res.json())
	// 		.then(data => console.log(data));
	// 	console.log('render');
	// }, []);

	// useEffect(() => {
	// 	const data = api.getLabels();
	// 	data.then(data => setLabels(data));
	// }, []);

	function handleDelete(labelName) {
		const data = api.createLabel;
	}

	function handleAddLabel() {
		const newlabelColor = labelColor.current.substr(1);
		console.log(newlabelColor);

		const data = api.createLabel(
			'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',
			labelName.current,
			newlabelColor,
			labeldescription.current
		);
		console.log(data);
	}

	// if (!labels) return null;

	return (
		<>
			{/* {labels.map(label => {
					return (
						<div key={label.id}>
							<img src={label.url} alt="abc" />
							<button onClick={() => handleDelete(label.name)}>刪除</button>
						</div>
					);
				})} */}
			<input onChange={e => (labelName.current = e.target.value)}></input>
			<input
				type="color"
				onChange={e => {
					labelColor.current = e.target.value;
					console.log(labelColor.current);
				}}
			></input>
			<input
				onChange={e => (labeldescription.current = e.target.value)}
			></input>
			<button onClick={handleAddLabel}>新增</button>
		</>
	);
}

export default LabelManagement;
