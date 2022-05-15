import React from "react";
import styles from "./AccordionTable.module.css";
import { debounce } from "../../libs/utilities";

export class AccordionTable extends React.Component {
  state = { maxElementCount: 99, accordionOpen: false, accordionIndex: 0 };

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.updateLayoutDebounce = debounce(this.updateLayout, 500);
  }

  resize = () => {
    this.updateLayoutDebounce();
  };

  updateLayout = () => {
    console.log("called");
    let oldCount = this.state.maxElementCount;
    this.setState({
      maxElementCount: Math.floor(this.wrapperRef.current.clientWidth / 155),
    });
    if (this.state.maxElementCount < 3) this.setState({ maxElementCount: 3 });
    if (this.state.maxElementCount != oldCount) this.render();
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  switchAccordion = (index) => {
    this.setState({
      accordionOpen: !this.state.accordionOpen,
      accordionIndex: index,
    });
  };

  addSettings = () => {
    if (
      this.props.object?.headers &&
      !this.props.object.headers.includes("Settings")
    ) {
      this.props.object.headers.push("Settings");
      !this.props.object?.rows ||
        this.props.object.rows.forEach((element) => {
          element.push("Open");
        });
    }
  };

  render() {
    this.addSettings();
    return (
      <div className={styles.container} ref={this.wrapperRef}>
        <table className={styles.table}>
          <thead>
            <tr>
              {this.props.object?.headers.map((header, index) => {
                if (
                  index + 2 > this.state.maxElementCount &&
                  index != this.props.object.headers.length - 1
                )
                  return;
                return <th key={"th" + index}>{header}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {this.props.object?.rows.map((row, indexR) => {
              return (
                <React.Fragment key={"rf" + indexR}>
                  <tr key={"tr" + indexR} className={styles.dataRows}>
                    {row.map((el, index) => {
                      if (
                        index + 2 > this.state.maxElementCount &&
                        index != this.props.object.headers.length - 1
                      )
                        return;
                      return index !== this.props.object.headers.length - 1 ? (
                        <td key={"td" + index}>{el}</td>
                      ) : this.state.accordionOpen &&
                        this.state.accordionIndex === indexR ? (
                        <td
                          key={"td" + index}
                          onClick={() => this.switchAccordion(indexR)}
                        >
                          {`${el}`}&nbsp; &#x2c4;
                        </td>
                      ) : (
                        <td
                          key={"td" + index}
                          onClick={() => this.switchAccordion(indexR)}
                        >
                          {`${el}`}&nbsp; &#x2c5;
                        </td>
                      );
                    })}
                  </tr>
                  <tr
                    key={"accordion" + indexR}
                    className={
                      this.state.accordionOpen &&
                      this.state.accordionIndex === indexR
                        ? styles.accordionOpen
                        : styles.accordionClose
                    }
                  >
                    <td
                      colSpan={
                        this.props.object.rows.length <=
                        this.state.maxElementCount
                          ? this.state.maxElementCount
                          : this.state.maxElementCount + 1
                      }
                    >
                      <div className={styles.accordionContainer}>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
