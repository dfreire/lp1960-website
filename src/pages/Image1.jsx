import React from 'react'
import { withSiteData, withRouteData } from 'react-static'

export default withSiteData(withRouteData((props) => (
	<div className={classes.container}>
		<img className={classes.img} src={props.src + '?w=800'} alt="" />
	</div>
)))

const classes = {
	container: "px-2 py-8 text-center",
	img: "",
};