import React from 'react'
import { accountSelector } from '../store/selectors';
import { connect, useDispatch } from 'react-redux';
const Navbar = (props) => {
    const {account} = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/#">Chera Exchange</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className="collapse navbar-collapse ml-auto" id="navbarNavDropdown"> */}
            <ul className="navbar-nav ms-auto">     
                <li className="nav-item">
                        <a
                            className="nav-link small"
                            href={`https://etherscan.io/address/${account}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {account}
                        </a>
                </li>
            </ul>
          {/* </div> */}
        </nav>

    )
}

function mapStateToProps(state) {
    return {
      account: accountSelector(state)
    }
  }
  
  // export default App;
  export default connect(mapStateToProps) (Navbar)
