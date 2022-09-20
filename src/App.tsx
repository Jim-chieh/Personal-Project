import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
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
			<Footer />
		</>
	);
}

export default App;
