import React from 'react'
import { withSiteData, withRouteData } from 'react-static'
const md = require('markdown-it')('commonmark');

export default withSiteData(withRouteData((props) => (
	<div className={classes.containter}>
		<h3 className={classes.h}>Morada</h3>
		<P text={props.address_line1} />
		<P text={props.address_line2} />
		<P text={props.address_line3} />
		<P text={props.address_line4} />
		<h3 className={classes.h}>Telefone</h3>
		<P text={props.phone1} />
		<P text={props.phone2} />
		<P text={props.phone3} />
		<h3 className={classes.h}>Email</h3>
		<Email email={props.email1} />
		<Email email={props.email2} />
	</div>
)))

const P = (props) => {
	return props.text != null && props.text.length > 0 &&
		<p className={classes.p}>{props.text}</p>;
}

const Email = (props) => {
	return props.email != null && props.email.length > 0 &&
		<p className={classes.p}>
			<a href={`mailto:${props.email}`}>{props.email}</a>
		</p>;
}

const classes = {
	containter: "__max-w-xs mx-auto py-8 font-thin border-3",
	h: 'pt-8 pb-2',
	p: 'py-1',
}
