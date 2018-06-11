import React from 'react'
import { Link, withSiteData, withRouteData } from 'react-static'
const path = require('path');

export default withSiteData(withRouteData((props) => (
	<div className={classes.container} >
		<Col images={props.images.filter((image, i) => i % 3 === 0)} />
		<Col images={props.images.filter((image, i) => i % 3 === 1)} />
		<Col images={props.images.filter((image, i) => i % 3 === 2)} />
	</div>
)))

const Col = (props) => (
	<div className={classes.col}>
		{props.images.map((image, i) => <Image key={i} image={image} />)}
	</div>
)

const Image = (props) => (
	<div className={classes.image}>
		<Link to={props.image.href}>
			<img src={props.image.src + '?w=800'} alt="" />
		</Link>
	</div>
)

const classes = {
	container: 'flex flex-wrap mb-4 py-4',
	col: 'sm:w-1/2 md:w-1/3',
	image: 'p-2'
}