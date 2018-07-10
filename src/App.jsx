import React from 'react';
import { Router, Link, withRouter, withSiteData } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';

const App = () => (
	<Router>
		<AppContent />
	</Router>
);

const AppContent = withRouter(
	withSiteData(props => {
		const links = props.links;
		links.forEach(link => (link.className = props.location.pathname.startsWith(link.to) ? classes.navLinkActive : classes.navLink));

		return (
			<div className={classes.page}>
				<div className={classes.headerBlock1}>
					<div className={classes.headerBlock2}>
						<div className={classes.header}>
							<ul className={classes.nav}>
								{links.map(link => (
									<li key={link.name} className={classes.navItem}>
										<Link className={link.className} to={link.to}>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
							<div className="clearfix" />
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
	})
);

const classes = {
	page: 'w-full h-full',

	headerBlock1: 'bg-grey-lightest pb-2',
	headerBlock2: 'bg-white shadow-md py-2',
	header: 'container mx-auto max-w-lg text-right',

	nav: 'mt-1 mb-1 mx-2 p-0 flex justify-between w_400 float-right',
	navItem: 'inline-block',

	navLink: 'no-underline py-2 lowercase font text-grey',
	navLinkActive: 'no-underline py-2 lowercase font text-black',

	contentBlock: 'contentBlock py-2',
	content: 'container mx-auto max-w-lg',
};

export default hot(module)(App);
