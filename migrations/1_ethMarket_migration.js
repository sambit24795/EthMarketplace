const EthMarket = artifacts.require("EthMarket");

module.exports = function (deployer) {
  deployer.deploy(EthMarket);
};
