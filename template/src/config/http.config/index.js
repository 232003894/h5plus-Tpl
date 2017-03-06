// http 请求
import _axios from 'axios'

if (!window.axios) {
  window.axios = _axios
}
// 由于ESLint会检测没有定义的变量，因此需要这一个`global`注释声明IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning
/* global IS_PRODUCTION:true */
if (IS_PRODUCTION) {
  // 生产环境之用
  axios.defaults.baseURL = 'https://app.xxx.com'
} else {
  // 开发环境之用
  axios.defaults.baseURL = 'http://192.168.2.241:8004'
  // axios.defaults.baseURL = 'http://api.yipifa.test'
}

export default function (vue, _api) {
  const errorweb = '无网络连接'
  const error404 = '服务无法访问'
  const error408 = '超时了'
  const error503 = '操作失败'
  const apiVersion = '1.00'

  axios.defaults.headers.common['v'] = apiVersion
  axios.defaults.headers.common['d'] = 'web'
  axios.defaults.headers.common['w'] = window.innerWidth + ''

  _api.mounted(() => {
    if (window.plus) {
      axios.defaults.headers.common['d'] = plus.device.uuid + ''
      axios.defaults.headers.common['w'] = plus.screen.resolutionWidth + ''
    }
  })

  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.common['t'] = _api.getState('t') + ''
    config.headers.common['s'] = _api.getState('s') + ''
    // 超时
    if (config.timeout === 0) {
      config.timeout = 30000
    }
    config.app = initApp(config.app)

    /**
     * 暂定：这是旧的还未调整
     * 是否加载用途的请求
     * true:加载请求,用于页面加载或列表加载的类型( 默认值 )
     * false:操作请求
     * 影响范围
     * 1.请求失败的提示(在goError方法中实现)
     *   true:加载失败层,显示刷新按钮( 默认值 )
     *   false:操作失败的提示,toast
     * 2.登录完成的处理:是否需要重新加载页面(在login.vue的success方法中实现)
     *   true:加载请求需要重新加载页面( 默认值 )
     *   false:操作请求不需要重新加载页面
     * 3.取消登录的处理(后退关闭来源页面)(在msg-login-index.js的cancle方法中实现)
     *   true:后退或关闭来源(plus并且无history),关闭登录层( 默认值 )
     *   false:关闭登录层
     */
    config.app.load = (config.app.load !== false)
    // 在发送请求之前调用
    config.beforeSend && config.beforeSend()
    if (_api.noNetwork()) {
      var error = {
        config: config,
        response: {
          data: null,
          status: 999
        }
      }
      // 当请求完成之后调用这个函数，无论成功或失败。
      config.complete && config.complete()
      // 直接到进入response的catch
      return Promise.reject(error)
    } else {
      return config
    }
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  /*
    response：服务端格式化过的标准json格式
    {
        'version': '1.0.0',
        'sys': {
            'code': 0,
            'msg': null,
            'data': null,
            'acts': []
        },
        'biz': {
            'code': 0,
            'msg': null,
            'data': null,
            'acts': [
                {
                    'code': '00',
                    'name': '登录'
                }
            ],
            pager:{}
        }
    }
    格式化过后输出的
    {
        'version': '1.0.0',
        'type': 'biz',
        'ok': true，
        'code': 0,
        'msg': null,
        'data': null,
        'acts': []
    }
  */

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 当请求完成之后调用这个函数，无论成功或失败。
    response.config.complete && response.config.complete()
    var json = {
      version: apiVersion,
      type: 'biz',
      ok: false,
      code: 0,
      msg: null,
      data: null,
      acts: [],
      config: response.config
    }
    if (response.data && response.data.version && (response.data.sys || response.data.biz)) { // 自定义的：服务端格式化过的标准json格式(自定格式，参考上面注释)，请求成功
      if (response.data.biz && (!response.data.sys || response.data.sys.code <= 0)) { // 无系统级错误
        json.type = 'biz'
        json = _api.mix(true, json, response.data.biz)
        if (!json.acts) {
          json.acts = []
        }
        json.pager = json.pager || {}

        // json.code = 401 // 模拟登录
        if (json.code === 401) {
          // 权限不足
          // 根据data来判断是登录权限不足还是其他的权限不足(如:卖家权限,是否开店)
          if (json.data) {
            if (json.data.state === 0) {
              // 需要登录
              $api.login(response.config.app.load, response.config.app.loginCallback)
            } else if (json.data.state === 1) {
              // 店铺权限
              _api.log('需要打开店铺权限提示popup')
            } else {
              // todo:其他权限
              _api.log('其他权限')
            }
          }
          return Promise.reject(json)
        } else if (json.code === 200) {
          // 业务完全成功
          json.ok = true
          // 关闭网络错误层
          // response.config.app.webError(false)
        } else if (json.code >= 201 && json.code <= 299) {
          // 业务成功,但是有部分业务问题
          json.ok = true
          // 关闭网络错误层
          // response.config.app.webError(false)
        } else if (json.code === 500) {
          // 业务失败
          // load时:加载失败层,显示刷新按钮( 默认值 )
          // 非load时:关闭加载失败层,没有提示,请求失败回调自行处理错误业务
          // showError(response.config.app)
          return Promise.reject(json)
        }
        return json
      } else { // 有系统级错误：服务端对未知的错误或异常进行统一的处理，抛出的
        json.type = 'sys'
        json = _api.mix(true, json, response.data.sys)
        if (!json.acts) {
          json.acts = []
        }
        if (json.code === 404) {
          // 服务找不到
          showError(response.config.app, error404)
        } else if (json.code === 503) {
          // 服务端错误(黄页等)
          showError(response.config.app, error503)
        }
        return Promise.reject(json)
      }
    } else { // 第三方的或未格式化的请求响应，请求成功
      json.data = response.data
      json.code = response.status
      if (_api.isString(json.data)) {
        // 字符串尝试转换为 json对象
        try {
          json.data = JSON.parse(json.data)
        } catch (error) {}
      }
      // 关闭网络错误层
      // response.config.app.webError(false)
      return json
    }
  }, function (error) {
    // 对响应错误做点什么
    // 请求失败或超时
    return Promise.reject(makeSysErrorJson(error.config, error.response))
  })

  /**
   * 请求失败或超时
   * @param {any} config
   * @param {any} response
   * @returns
   */
  function makeSysErrorJson(config, response) {
    var json = {
      version: apiVersion,
      type: 'sys',
      ok: false,
      code: 408,
      msg: error408,
      data: null,
      acts: [],
      config: config
    }
    // 默认为超时
    var tip = error408
    // http://blog.csdn.net/xinxin19881112/article/details/6565823
    json.type = 'sys'
    if (response) {
      json.data = response.data
      if (response.status === 404) {
        // 服务找不到
        // 404
        json.code = 404
        json.msg = tip = error404
      } else if (response.status === 408 || response.status === 504) {
        // 408：408 504
        // 请求超时 网关超时
      } else if (response.status === 999) {
        // 设备的无网络
        json.code = 503
        json.msg = tip = errorweb
      } else {
        // 503：500 501 503 505 4xx(除了404 408)
        json.code = 503
        json.msg = tip = error503
      }
    } else {
      // 无 response 请求超时
    }
    config.app = initApp(config.app)
    showError(config.app, tip)
    return json
  }

  /**
   * 初始化请求配置中的app对象
   * @param {any} app
   * @returns
   */
  function initApp(app) {
    if (_api.isObject(app)) {
      app = _api.mix(true, {
        load: true,
        webError: () => {},
        loginCallback: () => {}
      }, app)
    } else {
      app = {
        load: true,
        webError: () => {},
        loginCallback: () => {}
      }
    }
    return app
  }

  function showError(_app, _msg) {
    if (_app.load) {
      // 加载
      setTimeout(() => {
        _app.webError(true, _msg)
      }, 100)
    } else {
      // 请求
      // _app.webError(false)
      if (_msg) {
        setTimeout(() => {
          _api.toast(_msg, {
            time: 2000
          })
        }, 150)
      }
    }
  }
}
