import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { ResetStyle, GlobalStyle } from './components/ResetStyle';
// import { Counter } from './features/counter/Counter';
import { useGetAllLabelsQuery } from './redux/LabelCreateApi';
import { createLabelApi } from './redux/LabelCreateApi';

function App() {
	// const [user, setUser] = useState(null);

	// useEffect(() => {
	// 	checkUser();
	// 	window.addEventListener('hashchange', () => {
	// 		checkUser();
	// 	});
	// }, []);

	// async function checkUser() {
	// 	const user = supabase.auth.user();
	// 	const session = supabase.auth.session();
	// }

	// async function signInWithGitHub() {
	// 	const { user, session, error } = await supabase.auth.signIn(
	// 		{
	// 			provider: 'github'
	// 		},
	// 		{
	// 			scopes: 'repo gist notifications'
	// 		}
	// 	);
	// 	const oAuthToken = session;
	// 	console.log(oAuthToken);
	// }

	// async function signOut() {
	// 	await supabase.auth.signOut();
	// 	setUser(null);
	// }
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
