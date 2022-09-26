import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';

import App from './App';
import IssueListPage from './pages/IssueListPage';
import IssuePage from './pages/IssuePage';
import NewIssuePage from './pages/NewIssuePage';
import LabelManagement from './pages/Label/LabelManagement';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="issuelist" element={<IssueListPage />} />
					<Route path="issue/:id" element={<IssuePage />} />
					<Route path="newissue" element={<NewIssuePage />} />
					<Route index element={<LabelManagement />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
		</Provider>
	</BrowserRouter>
);
