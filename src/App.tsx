import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { ResetStyle, GlobalStyle } from './components/ResetStyle';

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
