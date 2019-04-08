/**
 * 判断是否是微信环境
 * */ 

const isWx = () => {
    if (!window.navigator || !window.navigator.userAgent) {
      return false
    }
    return !!/micromessenger/i.test(navigator.userAgent);
  }
  
export default isWx()