import React from 'react';
import { withSiteData, withRouteData } from 'react-static';
const md = require('markdown-it')('commonmark');

export default withSiteData(
	withRouteData(props => (
		<div className={classes.container}>
			<div className={classes.content}>
				<h3 className={classes.h}>Morada</h3>
				<P text={props.address_line1} />
				<P text={props.address_line2} />
				<P text={props.address_line3} />
				<P text={props.address_line4} />
				<br />

				<h3 className={classes.h}>Telefone</h3>
				<P text={props.phone1} />
				<P text={props.phone2} />
				<P text={props.phone3} />
				<br />

				<h3 className={classes.h}>Email</h3>
				<Email email={props.email1} />
				<Email email={props.email2} />
				<br />
			</div>
		</div>
	))
);

const P = props => {
	return props.text != null && props.text.length > 0 && <p className={classes.p}>{props.text}</p>;
};

const Email = props => {
	return (
		props.email != null &&
		props.email.length > 0 && (
			<p className={classes.p}>
				<a href={`mailto:${props.email}`}>{props.email}</a>
			</p>
		)
	);
};

const classes = {
	container: 'w_400 mx-2 py-8 float-right',
	content: 'font-thin',
	h: 'pt-2 pb-1',
	p: 'py-1',
};
