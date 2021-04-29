import moment from 'moment'
import 'moment/locale/zh-cn'
import * as Cookies from 'js-cookie'

moment.locale('zh-cn');

// Time format
export const formatTime = (unixTime) => {
    if (!unixTime) {
        return ''
    }
    return moment.unix(unixTime).format("YYYY年 MMMM Do, hh:mm A");
}

export const isTokenExpired = (token, ahead) => {
    if (!ahead) {
        ahead = 1800
    }
    var base64 = token.split('.')[1];
    var b = window.atob(base64)
    var json = JSON.parse(b)
    if (Date.now()/1000 < json.exp - ahead) {
        return false
    } 
    return true
}

export const jwtTokenValue = (token) => {
    try {
        var base64 = token.split('.')[1];
        var b = window.atob(base64)
        var json = JSON.parse(b)
        return json
    } catch(err) {}
    return {}
}

const domain = ""

// cookie store for crossing subdomain 
export const cookieStore = {
    setItem: (key, value) => {
        return Cookies.set(key, value, { expires: 7 , domain: domain });
    },
    
    getItem: (key) => {
        return Cookies.get(key)
    },
    
    removeItem: (key) => {
        return Cookies.remove(key, { domain: domain });
    }
}

export const formatSize = (bytes, si=true, dp=1) => {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    const units = si 
      ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
  }