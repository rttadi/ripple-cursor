import React from 'react';

export default class Ripple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      drag: false,
      x: 0,
      y: 0
    };
    this.showRipple = this.showRipple.bind(this);
    this.hideRipple = this.hideRipple.bind(this);
    this.showEvents = ['mousedown', 'mousemove', 'touchstart', 'touchmove'];
    this.hideEvents = ['mouseup', 'touchend'];
  }

  getPointer() {
    let {scope, children} = this.props;
    return children ? this.pointer : scope;
  }

  injectKeyFrames() {
    let newStyleSheet = document.createElement('style');
    const animationName = this.animationName = `rippleFadeIn`;

    const keyframes = `@keyframes ${animationName} {
      from {
        transform: scale(0.2);
        opacity: 0;
      }

      to {
        transform: scale(1);
        opacity: 0.8;
      }
    }`;

    newStyleSheet.innerHTML = keyframes;
    document.body.prepend(newStyleSheet);
  }

  componentDidMount() {
    this.injectKeyFrames();
    this.addEventListener();
  }

  componentWillUnmount() {
    console.log('Component will unmount')
    this.removeEventListener();
  }

  addEventListener() {
    const pointer = this.getPointer();
    let drag = {isDrag: false};

    this.showEvents.map(event => {
      pointer.addEventListener(event, this.showRipple);
    });

    this.hideEvents.map(event => {
      pointer.addEventListener(event, this.hideRipple);
    });
  }

  removeEventListener() {
    const pointer = this.getPointer();
    this.showEvents.map(event => {
      pointer.removeEventListener(event, this.showRipple);
    });

    this.hideEvents.map(event => {
      pointer.removeEventListener(event, this.hideRipple);
    });
  }

  showRipple(e) {
    let {pageX, pageY} = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e;

    if (e.type === 'mousemove' || e.type === 'touchmove') {
      this.setState((prevState, props) => {
        prevState.drag && this.setState({x:pageX, y:pageY});
      })
      return;
    }
      this.setState({drag: true, hidden: false, x:pageX, y:pageY});
  }

  hideRipple(e) {
    this.setState({hidden: true, drag: false});
  }

  render() {
    const {hidden, x, y} = this.state;
    const {children, size, color} = this.props;
    const style = {
                  display: hidden ? 'none' : 'block',
                  top: y,
                  left: x,
                  position: 'absolute',
                  width: size,
                  height: size,
                  background: color,
                  textAlign: 'center',
                  marginTop: -18,
                  marginLeft: -24,
                  zIndex: 999,
                  borderRadius: '100%',
                  border: `1.5px solid rgba(135,206,250,0.8)`,
                  animationName: this.animationName,
                  animationTimingFunction: 'ease-in-out',
                  animationDuration: '0.2s',
                  animationDelay: '0.0s',
                  animationIterationCount: 1,
                  animationDirection: 'normal',
                  animationFillMode: 'forwards',
                  pointerEvents: 'none'
    };

    return (
      <div ref={elem => this.pointer = elem}>
          <span style={style} />
          {children}
      </div>
    )
  }
}

Ripple.defaultProps = {
  size: 50,
  color: 'rgba(135,206,250,0.3)',
  scope: window
}
