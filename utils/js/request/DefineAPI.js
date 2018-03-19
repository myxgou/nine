const RequestDomain = 'https://wxns.lockerin.com/';
const Api = {
  doMain: RequestDomain,

  wareHouse: 'api/storagepoint/recommend',
  wareHouseDetail: 'api/storagepoint/detail',
  generateIdentifier: 'api/cangwei/getbookID',
  spaceEstimate: 'api/cangwei/estimationspace',
  spaceImage: 'api/cangwei/poststuffimg',
  wareHouseBook: 'api/cangwei/book',
  joinHand: 'api/users/join',
  memberInfo: 'api/users/getjoininfo',
  login: 'api/users/loginwx',
  sendVerify: 'api/sms/getyzm',
  openId: 'api/wx/getopenid',
  postOrder: 'api/orders/postpointorder',

  /**************物品管理******************/
  getstorageplaceID: 'api/storageplace/getstorageplaceID',
  getSpaces: 'api/storageplace/getplaces',
  addSpace: 'api/storageplace/addplace',
  spaceEdit: 'api/storageplace/editplace',
  spaceImageUpload: 'api/storageplace/placeimg',

  getSecondSpaces: 'api/storageplace/getdetailplaces',
  addSecondSpace: 'api/storageplace/adddetailplace',
  secondSpaceEdit: 'api/storageplace/editdetailplace',
  secondSpaceImageUpload: 'api/storageplace/placedetailimg',

  familyMemberList: 'api/storagestuff/getbelongs',
  familyMemberAdd: 'api/storagestuff/addbelongs',
  familyMemberEdit: 'api/storagestuff/editbelongs',
  familyMemberImageUpload: 'api/storagestuff/belongimg',

  goodsList: 'api/storagestuff/getstuffs',
  goodAdd: 'api/storagestuff/addstuff',
  goodEdit: 'api/storagestuff/editstuff',
  goodImageUpload: 'api/storagestuff/stuffimg'
}

module.exports = Api;