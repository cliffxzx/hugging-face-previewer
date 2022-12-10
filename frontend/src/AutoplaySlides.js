import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import Pagination from 'docs/src/modules/components/Pagination';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const styles = {
    slide: {
        padding: 15,
        minHeight: 500,
        color: '#fff',
    },
    slide1: {
        background: '#FEA900',
    },
    slide2: {
        background: '#B3DC4A',
    },
    slide3: {
        background: '#6AC0FF',
    },
};

class AutoPlaySlide extends React.Component {
    state = {
        index: 0,
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    render() {
        const { index } = this.state;

        return (
            <div style={styles.root}>
                <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    <div style={Object.assign({}, styles.slide, styles.slide1)}>About US</div>
                    <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
                    <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
                </AutoPlaySwipeableViews>
            </div>
        );
    }
}

export default AutoPlaySlide;