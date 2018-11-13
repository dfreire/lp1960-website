import React from 'react';
import { withSiteData, withRouteData } from 'react-static';
const md = require('markdown-it')('commonmark');

export default withSiteData(
	withRouteData(props => (
		<div className={classes.container}>
			<div className={classes.content} style={{ hyphens: 'auto', width: 460 }} dangerouslySetInnerHTML={{ __html: md.render(props.text) }} />
		</div>
	))
);

const classes = {
	container: 'max-w-sm mx-2 py-8 float-right',
	content: 'text-justify font-thin leading-normal',
};
