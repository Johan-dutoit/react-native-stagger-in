import React from 'react';
import propTypes from 'prop-types';
import { Animated } from 'react-native';

class StaggerIn extends React.Component {
    state = {
        animations: this.props.children.map(() => new Animated.Value(0))
    }

    componentDidMount = () => {
        let animations = this.state.animations.map((animation) => Animated.timing(animation, {
            toValue: 1,
            duration: this.props.duration,
            useNativeDriver: this.props.useNativeDriver
        }));

        Animated.stagger(this.props.staggerDelay, animations).start();
    }

    render = () => {
        if (this.props.children == null) {
            return null;
        }

        return this.props.children.map(this.renderChild);
    }

    renderChild = (child, index) => {
        let style = [child.props.style, {
            opacity: this.state.animations[index],
        }]

        let childToRender = React.cloneElement(child, {
            style
        })

        return childToRender;
    }
}

StaggerIn.propTypes = {
    duration: propTypes.number,
    staggerDelay: propTypes.number,
    useNativeDriver: propTypes.bool
};

StaggerIn.defaultProps = {
    duration: 300,
    staggerDelay: 200,
    useNativeDriver: true
};

export default StaggerIn;