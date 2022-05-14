import React from "react";
import styles from "./LeftSidebar.module.css";

export class LeftSidebar extends React.Component {
  state = {  };

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  render() {
    return (
      <div
        className={styles.container}
        ref={this.wrapperRef}
        style={{ width: this.state.width + "px" }}
      >
        <div className={styles.innerContainer}></div>
      </div>
    );
  }
}
