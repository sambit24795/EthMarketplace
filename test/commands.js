const instance = await EthMarket.deployed();

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmTzprvLMPzRR1gwHz6EjXef554QYDqps8eG8gY5Mj8Qm3", "460000000000000000", { value: "25000000000000000", from: accounts[0] });
instance.mintToken("https://gateway.pinata.cloud/ipfs/Qmc9JZvSVtsxjcrxYTes1zwgH4JtJ8hdwxzKcXQvYaavwW", "20000000000000000", { value: "25000000000000000", from: accounts[0] });
instance.mintToken("https://gateway.pinata.cloud/ipfs/QmVUzpiCE17i2FkfS6ymv819i3uqBdmvo9B41cA2FLSwgo", "30000000000000000", { value: "25000000000000000", from: accounts[0] });
