import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { logoutUser } from "../../store/actions"
import {clearStorage} from "../../helpers/StorageManager";

const Logout = ({history}) => {
  useEffect(() => {
    clearStorage();
    history.push("/login")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
  logoutUser: PropTypes.func
}

export default withRouter(connect(null, { logoutUser })(Logout))
