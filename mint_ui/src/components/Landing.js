import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Landing = (props) => {
  const renderConnectWallet = () => (
    <button
      style={{ marginRight: "10px" }}
      onClick={props.connectWallet}
      type="button"
      class="btn btn-warning btn-lg d-inline-flex align-items-center justify-content-center align-self-center"
    >
      Connect Wallet
    </button>
  );

  const renderMintButton = () => {
    if (props.network !== "Polygon Mainnet") {
      return (
        <button
          style={{ marginRight: "10px" }}
          type="button"
          class="btn btn-danger btn-lg"
          onClick={props.switchNetwork}
        >
          Switch to Polygon
        </button>
      );
    } else {
      if (props.minted === true) {
        return (
          <>
            <button
              type="button"
              class="btn btn-secondary btn-lg"
              disabled
              style={{ marginRight: "10px" }}
            >
              Already Minted
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ backgroundColor: "#55acee", textAlign: "center"}}
              onClick={() =>
                window.open(
                  "https://twitter.com/intent/tweet?text=I%20just%20minted%20my%20WeRace%20DAO%20NFT.%20You%20can%20check%20it%20out%20at%20https%3A%2F%2Fopensea.io%2Fassets%2Fmatic%2F0x5db4ef574c8ff09567b69505ff7e096ef73a6ab9%2F1%20&hashtags=web3&hashtags=dao&hashtags=f1&hashtags=werace",
                  "_blank"
                )
              }
            >
              <FontAwesomeIcon icon={faTwitter} />
              &nbsp;Share on Twitter
            </button>
          </>
        );
      } else {
        return (
          <button
            style={{ marginRight: "10px" }}
            type="button"
            class="btn btn-success btn-lg"
            onClick={props.mintNFT}
          >
            {props.loader ? (
              <>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Minting...
              </>
            ) : (
              "Mint NFT"
            )}
          </button>
        );
      }
    }
  };

  return (
    <>
      <section id="hero" className="hero d-flex align-items-center">
        <div className="row">
          <div className="col-lg-12 d-flex flex-column justify-content-center">
            <h1>Claim your airdopped NFT</h1>
            <h2>
              Click on mint now and check whether you are eligible for NFT claim.
            </h2>
            <br />
            <div>
              <div className="text-center text-lg-start">
                {!props.currentAccount && renderConnectWallet()}
                {props.currentAccount && renderMintButton()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
