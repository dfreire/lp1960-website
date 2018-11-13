import React from 'react';
import { withSiteData, withRouteData } from 'react-static';

// const INTERVAL = 5000;
const INTERVAL = 2500;
const MARGIN_Y = 70;

class Images extends React.Component {
	intervalRef = undefined;

	state = {
		marginTop: 0,
		imgWidth: 0,
		imgHeight: 0,
		visibleIndex: 0,
		fadeClassName: '',
		lastChangeTimestamp: 0,
	};

	render() {
		const { images } = this.props;
		const { marginTop, imgHeight, imgWidth, visibleIndex, fadeClassName } = this.state;
		const imageClassName = images.length > 1 ? 'cursor-pointer' : 'cursor-auto';
		const image = images[visibleIndex];
		const nextImage = images[this.nextIndex()];
		const prevImage = images[this.prevIndex()];

		return (
			<div className={classes.container} style={{ marginTop, height: imgHeight + MARGIN_Y }}>
				<div className={fadeClassName}>
					<div className={classes.imageContainer}>
						<img
							className={imageClassName}
							style={{ maxWidth: imgWidth, maxHeight: imgHeight }}
							src={image.src + `?w=${800}&h=${800}`}
							alt={image.legend}
							onClick={this.nextImage}
						/>
						<p>{image.legend}</p>
					</div>
				</div>
				<img style={{ display: 'none' }} src={nextImage.src + `?w=${800}&h=${800}`} alt="" />
				<img style={{ display: 'none' }} src={prevImage.src + `?w=${800}&h=${800}`} alt="" />
			</div>
		);
	}

	componentDidMount() {
		if (typeof document !== 'undefined') {
			const maxHeight = window.innerHeight - MARGIN_Y - MARGIN_Y;
			const imgHeight = Math.min(maxHeight, 800);
			const marginTop = Math.floor((maxHeight - imgHeight) / 2);
			const maxWidth = window.innerWidth;
			const imgWidth = Math.min(maxWidth, 800);
			// console.log('winHeight', window.innerHeight);
			// console.log('maxHeight', maxHeight);
			// console.log('marginTop', marginTop);
			// console.log('imgHeight', imgHeight);
			// console.log('imgWidth', imgWidth);
			this.setState({ marginTop, imgHeight, imgWidth });
		}

		clearInterval(this.intervalRef);
		this.autoNextImage();
	}

	componentWillUnmount() {
		clearInterval(this.intervalRef);
	}

	autoNextImage = () => {
		this.intervalRef = setInterval(() => {
			const sinceLastChange = Date.now() - this.state.lastChangeTimestamp;
			if (sinceLastChange >= INTERVAL) {
				this.nextImage();
			}
		}, INTERVAL);
	};

	nextIndex = () => {
		const { images } = this.props;
		const { visibleIndex } = this.state;
		return visibleIndex < images.length - 1 ? visibleIndex + 1 : 0;
	};

	nextImage = () => {
		const { images } = this.props;
		if (images.length > 1) {
			this.setVisibleIndex(this.nextIndex());
		}
	};

	prevIndex = () => {
		const { images } = this.props;
		const { visibleIndex } = this.state;
		return visibleIndex > 0 ? visibleIndex - 1 : images.length - 1;
	};

	prevImage = () => {
		const { images } = this.props;
		if (images.length > 1) {
			this.setVisibleIndex(this.prevIndex());
		}
	};

	setVisibleIndex = visibleIndex => {
		this.setState({ fadeClassName: 'fadeOut' });
		setTimeout(() => {
			this.setState({
				visibleIndex,
				fadeClassName: 'opacity-0 fadeIn', // opacity will increase to 1
				lastChangeTimestamp: Date.now(),
			});
		}, 1000);
	};
}

export default withSiteData(withRouteData(Images));

const classes = {
	container: 'mx-2 flex justify-end items-center',
	imageContainer: 'text-center text-sm font-light',
};
