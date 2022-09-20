import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ResetStyle, GlobalStyle } from './components/ResetStyle';
// import { Counter } from './features/counter/Counter';

function App() {
	return (
		<>
			<ResetStyle />
			<GlobalStyle />
			<Header />
			<Outlet />
		</>
	);
}

export default App;
