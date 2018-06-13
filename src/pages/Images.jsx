import React from 'react'
import { withSiteData, withRouteData } from 'react-static'

const INTERVAL = 3000;

class Images extends React.Component {
    intervalRef = undefined;

    state = {
        visibleIndex: 0,
        imageClassName: '',
        lastChangeTimestamp: 0,
    };

    render() {
        const { images } = this.props;
        const { visibleIndex, imageClassName } = this.state;
        const image = images[visibleIndex];
        const height = window.innerHeight - 200;

        return (
            <div className={classes.container} >
                <div className={classes.imageContainer}>
                    <img className={imageClassName} src={image.src + `?w=800&h=${height}`} alt="" onClick={this.nextImage} />
                    <p>Blah</p>
                </div>
            </div>
        );
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
    }

    nextImage = () => {
        const { images } = this.props;
        const { visibleIndex } = this.state;
        this.setVisibleIndex(visibleIndex < images.length - 1 ? visibleIndex + 1 : 0);
    }

    prevImage = () => {
        const { images } = this.props;
        const { visibleIndex } = this.state;
        this.setVisibleIndex(visibleIndex > 0 ? visibleIndex - 1 : images.length - 1);
    }

    setVisibleIndex = (visibleIndex) => {
        this.setState({ imageClassName: 'fadeOut' });
        setTimeout(() => {
            this.setState({
                visibleIndex,
                imageClassName: 'opacity-0 fadeIn', // opacity will increase to 1
                lastChangeTimestamp: Date.now(),
            });
        }, 1000);
    }
}

export default withSiteData(withRouteData(Images))

const classes = {
    container: 'mb-4 py-4 text-right',
    imageContainer: 'inline-block text-center text-sm font-light',
}