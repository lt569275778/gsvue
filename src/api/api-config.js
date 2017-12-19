const HOST = serviceHost;

const API = {
  // 查询产品信息
  getProducts: HOST + '/certification/getProductInfo',
  //查询成都认证页面信息
  getLoginPage: HOST + '/crawl/getCrawlLoginPage',
  //查询产品图片
  getImage: HOST + '/certification/showImage?imagePath=',
  //保存浏览记录
  saveBrowseLogs: HOST + '/crawl/saveUsetBrowseLogsInfo',
  //保存用户认证
  saveUserApply: HOST + '/crawl/saveUserApplyInfo',
  //检查token
  checkToken: HOST + '/auth/checkToken'
}

export default API