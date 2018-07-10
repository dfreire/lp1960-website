import React from 'react';
import { withSiteData, withRouteData } from 'react-static';

const INTERVAL = 5000;

class Images extends React.Component {
	intervalRef = undefined;

	state = {
		imgHeight: 700,
		visibleIndex: 0,
		fadeClassName: '',
		lastChangeTimestamp: 0,
	};

	render() {
		const { images } = this.props;
		const { imgHeight, visibleIndex, fadeClassName } = this.state;
		const image = images[visibleIndex];
		const imageCursor = images.length > 1 ? 'cursor-pointer' : 'cursor-auto';

		return (
			<div className={classes.container}>
				<div className={fadeClassName}>
					<div className={classes.imageContainer}>
						<img className={imageCursor} src={image.src + `?w=800&h=${imgHeight}`} alt="" onClick={this.nextImage} />
						<p>{image.legend}</p>
					</div>
				</div>
			</div>
		);
	}

	componentWillMount() {
		const imgHeight = typeof document !== 'undefined' ? window.innerHeight - 200 : 700;
		this.setState({ imgHeight });
	}

	componentDidMount() {
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

	nextImage = () => {
		const { images } = this.props;
		if (images.length > 1) {
			const { visibleIndex } = this.state;
			this.setVisibleIndex(visibleIndex < images.length - 1 ? visibleIndex + 1 : 0);
		}
	};

	prevImage = () => {
		const { images } = this.props;
		if (images.length > 1) {
			const { visibleIndex } = this.state;
			this.setVisibleIndex(visibleIndex > 0 ? visibleIndex - 1 : images.length - 1);
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
	container: 'mb-4 py-4 text-right',
	imageContainer: 'inline-block text-center text-sm font-light',
};
