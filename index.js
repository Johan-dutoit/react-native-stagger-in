import React from 'react';
import propTypes from 'prop-types';
import { Animated } from 'react-native';

class Staggering extends React.Component {
    state = {
        animations: this.props.children.map(() => new Animated.Value(0))
    }

    componentDidMount = () => {
        let animations = this.state.animations.map((animation) => Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }));

        Animated.stagger(200, animations).start();
    }

    render = () => {
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

Staggering.propTypes = {
    duration: propTypes.number,
    staggerDelay: propTypes.number
};

Staggering.defaultValues = {
    duration: 300,
    staggerDelay: 200
};

export default Staggering;