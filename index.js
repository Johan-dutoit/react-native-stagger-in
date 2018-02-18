import React from 'react';
import propTypes from 'prop-types';
import { Animated } from 'react-native';

class StaggerIn extends React.Component {
  state = {
    animations: null,
  };

  constructor(props) {
    super(props);

    if (this.props.children == null) {
      return;
    }

    this.state = {
      animations: this.props.children.map(() => new Animated.Value(0)),
    };
  }

  componentDidMount = () => {
    if (this.state.animations == null) {
      return;
    }

    let animations = this.state.animations.map(animation =>
      Animated.timing(animation, {
        toValue: 1,
        duration: this.props.duration,
        useNativeDriver: this.props.useNativeDriver,
      })
    );

    Animated.stagger(this.props.staggerDelay, animations).start();
  };

  render = () => {
    if (this.props.children == null) {
      return null;
    }

    return this.props.children.map(this.renderChild);
  };

  renderChild = (child, index) => {
    console.log(child.type);
    if (child == null) {
      return null;
    }

    let style = {
      opacity: this.state.animations[index]
    };

    return (
      <Animated.View style={style}>
        {child}
      </Animated.View>
    );
  };
}

StaggerIn.propTypes = {
  duration: propTypes.number,
  staggerDelay: propTypes.number,
  useNativeDriver: propTypes.bool,
};

StaggerIn.defaultProps = {
  duration: 300,
  staggerDelay: 200,
  useNativeDriver: true,
};

export default StaggerIn;
