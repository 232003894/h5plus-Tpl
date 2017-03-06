// 账户名
const username = {
  messages: {
    'zh_CN': (field, args) => '账户名必须以字母开头，支持英文、数字、下划线组合，5-25个字'
  },
  validate: (value, args) => {
    if (value === undefined || value === null) {
      return false
    }
    if (String(value).length > 25 || String(value).length < 5) {
      return false
    } else {
      return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)
    }
  }
}
// 手机号码
const phone = {
  messages: {
    'zh_CN': (field, args) => '手机号输入有误'
  },
  validate: (value, args) => {
    return /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/i.test(value)
  }
}
// 固话(7或8位)或手机号(11位)
const mixphone = {
  messages: {
    'zh_CN': (field, args) => '电话格式错误，请输入手机号或者区号-座机号（如：0710-1234567）'
  },
  validate: (value, args) => {
    return /(^0\d{2,3}-\d{7,8}$)|(^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$)/i.test(value)
  }
}
// 身份证号
const identityno = {
  messages: {
    'zh_CN': (field, args) => '身份证号输入不正确'
  },
  validate: (value, args) => {
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(value)
  }
}
// 国内邮编
const zipcode = {
  messages: {
    'zh_CN': (field, args) => '邮编输入不正确,格式为6位数字'
  },
  validate: (value, args) => {
    return /^[0-9]{6}$/i.test(value)
  }
}
// 非中文（中文或双字节字符）
const nochs = {
  messages: {
    'zh_CN': (field, args) => '不能含有中文或双字节字符'
  },
  validate: (value, args) => {
    return /[^\x00-\xff]+/.test(value) === false
  }
}
// 正常字符串类型
const normalstr = {
  messages: {
    'zh_CN': (field, args) => '不能输入特殊字符！'
  },
  validate: (value, args) => {
    return /^[\u4E00-\u9FA5\uf900-\ufa2d\w.\s]+$/.test(value)
  }
}
// 密码强度
const strong = {
  messages: {
    'zh_CN': (field, [level]) => {
      var num = parseInt(level, 10)
      if (num <= 2) {
        return '密码太简单，字母、数字、符号至少两种组合'
      } else if (num > 2) {
        return '密码太简单，必须包含字母、数字和符号'
      }
      return '密码太简单'
    }
  },
  validate: (value, [level]) => {
    var num = parseInt(level, 10)
    var ls = 0
    // 字母
    if (value.match(/([a-zA-Z])+/)) {
      ls++
    }
    // 数字
    if (value.match(/([0-9])+/)) {
      ls++
    }
    // 符号
    if (value.match(/[^a-zA-Z0-9]+/)) {
      ls++
    }
    return ls >= num
  }
}

export default function (Validator) {
  // 账户名
  Validator.extend('username', username)
  // 手机号码
  Validator.extend('phone', phone)
  // 固话(7或8位)或手机号(11位)
  Validator.extend('mixphone', mixphone)
  // 身份证号
  Validator.extend('identityno', identityno)
  // 国内邮编
  Validator.extend('zipcode', zipcode)
  // 非中文（中文或双字节字符）
  Validator.extend('nochs', nochs)
  // 正常字符串类型
  Validator.extend('normalstr', normalstr)
  // 密码强度
  Validator.extend('strong', strong)
}
