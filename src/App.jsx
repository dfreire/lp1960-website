import React from 'react'
import { Router, Link, withRouter, withSiteData } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

const App = () => (
	<Router>
		<AppContent />
	</Router>
);

const AppContent = withRouter(withSiteData((props) => {
	const links = props.links;
	links.forEach(link => link.className = props.location.pathname.startsWith(link.to) ? classes.navLinkActive : classes.navLink);

	return (
		<div className={classes.page}>
			<div className={classes.headerBlock1}>
				<div className={classes.headerBlock2}>
					<div className={classes.header}>
						{/*
						<div className={classes.brandContainer}>
							<Link className={classes.brand} to="/">{props.title}</Link>
						</div>
						*/}
						<ul className={classes.nav}>
							{links.map(link => (
								<li key={link.name} className={classes.navItem}>
									<Link className={link.className} to={link.to}>{link.name}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className={classes.contentBlock}>
				<div className={classes.content}>
					<Routes />
				</div>
			</div>
		</div>
	);
}));

const classes = {
	page: "w-full h-full",

	headerBlock1: "bg-grey-lightest pb-2",
	headerBlock2: "bg-white shadow-md p-2",
	header: "container mx-auto max-w-lg sm:flex",

	brandContainer: "sm:flex-1 text-center sm:text-left",
	brand: "text-black no-underline text-4xl font-black",

	nav: "sm:flex-1 list-reset flex justify-center sm:justify-end mt-1 mb-1",
	navItem: "inline-block text-center ml-8",

	navLink: "no-underline py-2 lowercase font text-grey",
	navLinkActive: "no-underline py-2 lowercase font text-black",

	contentBlock: "contentBlock py-2",
	content: "container mx-auto max-w-lg",
};

export default hot(module)(App)
