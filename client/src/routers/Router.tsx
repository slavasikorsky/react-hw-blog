import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "../features/Home";
import PostPage from "../features/PostPage";
import NotFound from "../features/NotFound";
import Blog from "../features/Blog";
import About from "../features/About";
import Contact from "../features/Contact";
import Login from "../features/Login";
import Dashboard from "../features/Dashboard";
import Registration from "../features/Registration";

import PrivateLayout from "../layout/PrivateLayout";
import PublicLayout from "../layout/PublicLayout";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { RootState } from "../store/store";
import Posts from "../features/Posts";
import Users from "../features/Users";
import Profile from "../features/Profile";

const GlobalStyle = createGlobalStyle`
  body {
	color: ${(props) => props.theme.value.PRIMARY_TEXT_COLOR};
	background-color: ${(props) => props.theme.value.PRIMARY_BG_COLOR};
  }
`;

function Router() {
	const theme = useSelector((state: RootState) => state.theme);
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Routes>
				<Route
					element={
						<PublicRouter>
							<PublicLayout />
						</PublicRouter>
					}
				>
					<Route path="/" index element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="*" element={<NotFound />} />
				</Route>
				<Route
					element={
						<PrivateRouter>
							<PrivateLayout />
						</PrivateRouter>
					}
				>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/posts" element={<Posts />} />
					<Route path="/users" element={<Users />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}
export default Router;
