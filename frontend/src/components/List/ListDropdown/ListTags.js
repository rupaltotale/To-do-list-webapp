import React from "react";
import PropTypes from "prop-types";
import CustomButton from "../../CustomComponents/Button/CustomButton";

class ListTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listStyle: this.props.style,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.style !== prevState.listStyle) {
      var newStyle = {
        listStyle: nextProps.style,
      };
    }
    return newStyle ? { ...newStyle } : null;
  }

  renderListTags = () => {
    return (
      <>
        <div style={this.state.listStyle.listTagsTitle}>Add Tag</div>
        <div style={this.state.listStyle.listTagSearchDiv}>
          <input style={this.state.listStyle.listTagSearch}></input>
        </div>
      </>
    );
  };

  render() {
    return this.renderListTags();
  }
}

export default ListTags;

ListTags.propTypes = {
  style: PropTypes.object.isRequired,
};
