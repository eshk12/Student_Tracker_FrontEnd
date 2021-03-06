import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter , Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import logoSm from "../../assets/images/logo-sm.png"
import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-light.png"

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box" style={{paddingTop: '20px'}}>
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="50" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="70" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="50" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="70" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))