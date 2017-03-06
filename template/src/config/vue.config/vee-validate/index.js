import VeeValidate from 'vee-validate'
import messages from './zh_CN'
import _extend from './extend'

export default function (vue, _api) {
  const config = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fields',
    locale: 'zh_CN',
    dictionary: {
      'zh_CN': {
        messages
      }
    },
    strict: true
    // ,
    // enableAutoClasses: false,
    // classNames: {
    //   touched: 'touched', // the control has been blurred
    //   untouched: 'untouched', // the control hasn't been blurred
    //   valid: 'valid', // model is valid
    //   invalid: 'invalid', // model is invalid
    //   pristine: 'pristine', // control has not been interacted with
    //   dirty: 'dirty' // control has been interacted with
    // }
  }
  _extend(VeeValidate.Validator)
  vue.use(VeeValidate, config)
}
