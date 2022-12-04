import React from "react";
import polygonLogo from "../assets/polygonlogo.png";
import ethLogo from "../assets/ethlogo.png";

const NavHeader = (props) => {
  return (
    <>
      <header id="header" className="header">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <span>Royalty Program</span>
          </a>

          <nav id="navbar" className="navbar">
            <ul>
              <li className="d-flex">
                {props.currentAccount ? (
                  <button type="button" className="btn btn-light d-flex" style={{top:"50%"}}>
                <img
                  alt="Network logo"
                  className="logo"
                  style = {{width: "30px", height: "30px"}}
                  src={
                    props.network.includes("Polygon") ? polygonLogo : ethLogo
                  }
                />
                &nbsp;
                  <p>
                    {" "}
                    Wallet: {props.currentAccount.slice(0, 6)}...
                    {props.currentAccount.slice(-4)}{" "}
                  </p>
                  </button>
                ) : (
                  <button type="button" class="btn btn-danger">Wallet Not Connected</button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavHeader;
