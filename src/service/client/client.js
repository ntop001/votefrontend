// API 接口
export default class KawaClient {
    constructor(server, token, csrf) {
        this.server = server
        this.token  = token
        this.csrf   = csrf
    }

    static fromWindow() {
        return new KawaClient(
            window && window.KAWA_SERVER,
            window && window.KAWA_TOKEN,
        )
	}
	
	static newClient(server, token) {
		return new KawaClient(server, token)
	}

	// 设置 token 
	setToken(token) {
        console.log("set client token:", token)
		this.token = token
	}

	setAppkey(appkey) {
		this.appkey = appkey
	}

	setServer(host) {
		this.server = host
    }

    // login/register api
    login(phone, pw) {
        return this._post(`/admin/api/login?`, {username: phone, password: pw})
    }
    getSelf() {
        return this._get(`/admin/api/users/self`)
    }

    dangerToken(data) {
        return this._post(`/admin/api/danger/token`, data)
    }

    // tenants
    getTenantList(params) {
        const q = this.encodeQueryString(params)
        return this._get(`/admin/api/tenants?${q}`)
    }

    updateTenant(id, params) {
        return this._put(`/admin/api/tenants/${id}`, params)
    }

    // users
    getUserList(params) {
        const q = this.encodeQueryString(params)
        return this._get(`/admin/api/users?${q}`)
    }

    getUserTenant(uid) {
        return this._get(`/admin/api/users/${uid}/tenants`)
    }

    // helper function
	jsonQueryString(params) {
		if (!params) {
			return ""
        }
		return Object.keys(params).map(key => key + '=' + (params[key]!==undefined? params[key]: '')).join('&');
    }
    
    encodeQueryString = (params = {}) => {
        return params
            ? Object.keys(params)
                    .sort()
                    .map(key => {
                        const val = params[key] !== undefined ? encodeURIComponent(params[key]): '';
                        return key + "=" + val;
                    })
                    .join("&")
            : "";
    };

    // GET/POST/PATH/DELETE API
    _get(path) {
		return this._request("GET", path, null);
	}

	_post(path, data) {
		return this._request("POST", path, data);
	}

	_patch(path, data) {
		return this._request("PATCH", path, data);
    }

    _put(path, data) {
		return this._request("PUT", path, data);
	}

	_delete(path) {
		return this._request("DELETE", path, null);
    }
    
    // subcribe
    _subscribe(path, callback, opts) {
		const query = encodeQueryString({
			access_token: this.token,
		});
		path = this.server ? this.server + path : path;
		path = this.token ? path + "?" + query : path;

		let events = new EventSource(path);
		events.onmessage = function(event) {
			var data = JSON.parse(event.data);
			callback(data);
		};
		if (!opts.reconnect) {
			events.onerror = function(err) {
				if (err.data === "eof") {
					events.close();
				}
			};
		}
		return events;
	}

	// 封装点：
	// 
    // request
    _request(method, path, data) {
		var endpoint = [this.server, path].join("");
		var xhr = new XMLHttpRequest();
		xhr.open(method, endpoint, true);
		if (this.token) {
			xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
		}
		if (this.appkey) {
			xhr.setRequestHeader("AppKey", this.appkey);
		}
		if (method !== "GET" && this.csrf) {
			xhr.setRequestHeader("X-CSRF-TOKEN", this.csrf);
		}
		return new Promise(
			function(resolve, reject) {
				xhr.onload = function() {
					if (xhr.readyState === 4) {
						if (xhr.status >= 300) {
							const error = {
								status: xhr.status,
								message: xhr.response,
							};
							if (this.onerror) {
								this.onerror(error);
							}
							reject(error);
							return;
						}
						const contentType = xhr.getResponseHeader("Content-Type");
						if (contentType && contentType.startsWith("application/json")) {
							resolve(JSON.parse(xhr.response));
						} else {
							resolve(xhr.response);
						}
					}
				}.bind(this);
				xhr.onerror = e => {
					reject(e);
				};
				if (data) {
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.send(JSON.stringify(data));
				} else {
					xhr.send();
				}
			}.bind(this),
		);
	}

}

/**
 * Encodes the values into url encoded form sorted by key.
 *
 * @param {object} query parameters in key value object.
 * @return {string} query parameter string
 */
export const encodeQueryString = (params = {}) => {
	return params
		? Object.keys(params)
				.sort()
				.map(key => {
					const val = params[key];
					return encodeURIComponent(key) + "=" + encodeURIComponent(val);
				})
				.join("&")
		: "";
};