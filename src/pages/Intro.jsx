import React from 'react'
import { withSiteData, withRouteData } from 'react-static'
const md = require('markdown-it')('commonmark');

export default withSiteData(withRouteData((props) => (
	<div
		className={classes.containter}
		dangerouslySetInnerHTML={{ __html: md.render(props.text) }}
	/>
)))

const classes = {
	containter: "py-2 text-justify font-thin",
}
