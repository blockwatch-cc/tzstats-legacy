import React from "react";
import ReactDOM from "react-dom";
import { getPosition } from "./helpers";

class Popover extends React.Component {
  static defaultProps = {
    content: null,
    trigger: "hover",
    placement: "bottom",
    getContainer: () => document.body
  };

  state = {
    visible: false,
    top: 0,
    left: 0
  };

  setVisibility = visible => this.setState(() => ({ visible }));

  toggleVisibility = () =>
    this.setState(prevState => ({ visible: !prevState.visible }));

  handleContentEnter = e => {
    const { trigger } = this.props;
    if (trigger === "hover") {
      this.setVisibility(true);
    }
  };

  handleContentLeave = e => {
    const { trigger } = this.props;
    if (trigger === "hover") {
      this.setVisibility(false);
    }
  };

  setPositions = target => {
    const contentReact = this.contentEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    this.setState(getPosition(this.props.placement, contentReact, targetRect));
  };

  getChildProps = childProps => {
    const { trigger } = this.props;
    const props = {
      ...childProps
    };

    const handleMouseEnter = e => {
      if (childProps.onMouseEnter) {
        childProps.onMouseEnter(e);
      }
      this.setVisibility(true);
      this.setPositions(e.currentTarget);
    };

    const handleMouseLeave = e => {
      if (childProps.onMouseLeave) {
        childProps.onMouseLeave(e);
      }
      this.setVisibility(false);
    };

    const handleClick = e => {
      if (childProps.onClick) {
        childProps.onClick(e);
      }
      this.toggleVisibility();
      this.setPositions(e.currentTarget);
    };

    if (trigger === "hover") {
      props.onMouseEnter = handleMouseEnter;
      props.onMouseLeave = handleMouseLeave;
    } else if (trigger === "click") {
      props.onClick = handleClick;
    }

    return props;
  };

  getContentStyles = () => {
    const { visible, top, left } = this.state;
    return {
      position: "fixed",
      visibility: visible ? "visible" : "hidden",
      opacity: visible ? 1 : 0,
      top: `${top - 20}px`,
      left: `${left}px`,
      transition: "opacity 0.3s, visibility 0.3s",
      backgroundColor: "#30313b",
      color: "white",
      borderRadius: 3,
      opacity: 1,
      // border: "1px solid lightgray",
      padding: "10px",
      zIndex: 99
    };
  };

  render() {
    return (
      <React.Fragment>
        {React.Children.map(this.props.children, child => {
          if (React.isValidElement(child)) {
            return <child.type {...this.getChildProps(child.props)} />;
          }
          return child;
        })}
        {ReactDOM.createPortal(
          <div
            ref={el => (this.contentEl = el)}
            style={this.getContentStyles()}
            onMouseEnter={this.handleContentEnter}
            onMouseLeave={this.handleContentLeave}
          >
            {this.props.content}
          </div>,
          this.props.getContainer()
        )}
      </React.Fragment>
    );
  }
}

export default Popover;
