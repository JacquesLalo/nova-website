import React, { Component } from 'react'
import { connect }from 'react-redux'
import { styles } from '../../constants.js'

const constants = { styles }

const mapStateToProps = function(state) {
	return {
      linePosition: state.appReducer.linePosition,
      appTheme: state.appReducer.appTheme,
      windowWidth: state.appReducer.windowWidth,
      isSidebarOpened: state.sidebarReducer.isSidebarOpened,
  }
}

const mapDispatchToProps = function() {
	return {
  }
}


const LineDumb = props => {
    const theme = constants.styles.themes[props.appTheme]

    const styles = {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            marginTop: 'calc(' + (9 + 2 * props.linePosition) + ' * ' + constants.styles.unitHeight + ')',
            transition: 'margin-top, opacity ' + constants.styles.sidebar.transition.length + constants.styles.sidebar.transition.type,
            opacity: props.windowWidth < constants.styles.mediaQueries.phone && props.isSidebarOpened ? 0 : 1,
        },
        line: {
            wrapper: {
                minHeight: 'calc(2 * ' + 100/24 + 'vh)',
                display: 'flex',
                width: '100vw',
                backgroundColor: theme.lineBgColor,
                transition: 'background-color ' + constants.styles.slideTransitionTime / 1000 + 's ' + constants.styles.slideTransitionFunc,
            },
            wrapper2: {
                height: 0,
                display: 'flex',
                flex: 1,
                paddingLeft: 'calc(' + constants.styles.sidebar.widthFactor + ' * ' + constants.styles.unitWidth + ')',
                opacity: 0,
                transition: 'opacity ' + constants.styles.sidebar.transition.length + constants.styles.sidebar.transition.type,
            },
            wrapper2Opened: {
                height: constants.styles.lineDimensions.height,
                opacity: 1,
            },
        },
    }

    return (
        <div style={ styles.wrapper }>
            <div style={ styles.line.wrapper }>
                <div style={ { ...styles.line.wrapper2, ...styles.line.wrapper2Opened } }>
                    { props.comp }
                </div>
            </div>
        </div>
    )
}

LineDumb.propTypes = {
}

LineDumb.defaultProps = {
}

class Line extends Component {
  componentDidMount() {

  }

  render() {
      return (
        <LineDumb
            { ...this.props }
            comp={ this.props.comp }
            linePosition={ this.props.linePosition } >
          </LineDumb>
      )
  }
}

Line.propTypes = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Line)
