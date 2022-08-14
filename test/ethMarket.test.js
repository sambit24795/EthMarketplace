const EthMarket = artifacts.require("EthMarket");
const ethers = require("ethers");

contract("EthMarket", (accounts) => {
  let _contract = null;
  let _price = ethers.utils.parseEther("0.3").toString();
  let _listingPrice = ethers.utils.parseEther("0.025").toString();

  before(async () => {
    _contract = await EthMarket.deployed();
  });

  describe("Mint token", () => {
    const tokenURI = "https://test.com";
    before(async () => {
      await _contract.mintToken(tokenURI, _price, {
        from: accounts[0],
        value: _listingPrice,
      });
    });

    it("should be same as the first address", async () => {
      const owner = await _contract.ownerOf(1);
      assert.equal(
        owner,
        accounts[0],
        "Owner of token is not matching address[0]"
      );
    });

    it("should get the duplicate token error", async () => {
      try {
        await _contract.mintToken(tokenURI, {
          from: accounts[0],
        });
      } catch (error) {
        assert(error, "tokenURL already exists");
      }
    });

    it("should have one listed item", async () => {
      const count = await _contract.getListenItemCount();
      assert.equal(count, 1, "itms did not get created");
    });

    it("should craeate Item", async () => {
      const item = await _contract.getItem(1);
      assert.equal(item.tokenId, "1", "could not get the item");
    });
  });

  describe("Buy Item", async () => {
    before(async () => {
      await _contract.buyItem(1, {
        from: accounts[1],
        value: _price,
      });
    });

    it("should unlist the item", async () => {
      const listedItem = await _contract.getItem(1);
      assert.equal(listedItem.isListed, false, "Item is still listed");
    });

    it("should decrease the listed item count", async () => {
      const count = await _contract.getListenItemCount();
      assert.equal(count, 0, "Item is still listed");
    });

    it("should change the owner", async () => {
      const owner = await _contract.ownerOf(1);
      assert.equal(owner, accounts[1], "Item is still listed");
    });
  });

  describe("Token transfers", async () => {
    const tokenURI = "https://test2.com";

    before(async () => {
      await _contract.mintToken(tokenURI, _price, {
        from: accounts[0],
        value: _listingPrice,
      });
    });

    it("should have two items created", async () => {
      const totalSupply = await _contract.totalSupply();
      assert.equal(totalSupply.toNumber(), 2, "total items not correct");
    });

    it("should retrieve items by index", async () => {
      const token1 = await _contract.tokenByIndex(0);
      const token2 = await _contract.tokenByIndex(1);

      assert.equal(token1.toNumber(), 1, "item id not correct");
      assert.equal(token2.toNumber(), 2, "item id not correct");
    });

    it("should get all the items on sale", async () => {
      const items = await _contract.getAllItemsOnSale();
      assert.equal(items[0].tokenId, 2, "Token not correct");
    });

    it("should have one owned item", async () => {
      const ownedItems = await _contract.getOwnedItems({
        from: accounts[1],
      });
      assert.equal(ownedItems[0].tokenId, 1, "Token not correct");
    });
  });

  describe("Token transfer to new owner", async () => {
    before(async () => {
      await _contract.transferFrom(accounts[0], accounts[1], 2);
    });

    it("accounts[0] should own 0 tokens", async () => {
      const owneditems = await _contract.getOwnedItems({ from: accounts[0] });
      assert.equal(owneditems.length, 0, "invalid lenght of tokens");
    });

    it("accounts[1] should own 2 tokens", async () => {
      const owneditems = await _contract.getOwnedItems({ from: accounts[1] });
      assert.equal(owneditems.length, 2, "invalid lenght of tokens");
    });
  });
});
