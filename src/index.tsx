import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// import { Provider } from 'react-redux';
// import { store } from './app/store';
import App from './App';
import IssueListPage from './pages/IssueListPage';
import IssuePage from './pages/IssuePage';
import NewIssuePage from './pages/NewIssuePage';
import LabelManagement from './pages/LabelManagement';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<IssueListPage />} />
					<Route path="issue/:id" element={<IssuePage />} />
					<Route path="newissue" element={<NewIssuePage />} />
					<Route path="labelmanagement" element={<LabelManagement />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
		</Provider>
	</BrowserRouter>
);

