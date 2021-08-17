const Attack = artifacts.require("Attack");

module.exports = function (deployer) {
  console.log('deploying!!!');
  deployer.deploy(Attack);
};
