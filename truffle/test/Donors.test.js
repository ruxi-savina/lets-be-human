//used Mocha and Chai
const Donors = artifacts.require('./Donors.sol')

contract('Donor', (accounts) => {

  currentAccount = accounts[0]

  before(async () => {
    this.donor = await Donors.deployed()
  })

  it('should deploy successfully', async () => {
    const address = await this.donor.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('should get name', async () => {
    const result = (await this.donor.getDonorUsername(currentAccount));
    assert.equal(result, "");
  })

  it('should set name', async () => {
    await this.donor.setDonorUsername(currentAccount, "New Name");
    const result = await this.donor.getDonorUsername(currentAccount)
    assert.equal(result, "New Name");
  })
})