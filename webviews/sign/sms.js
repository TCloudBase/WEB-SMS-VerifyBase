/**
 *  封装的短信发送函数对象
 *  使用前请将 cloudbase.auth() 赋值到 window.auth 中
 */
 window.SMS = {
  phone: null,
  async send(phone) {  // 发送短信
    this.phone = phone;
    try {
      return await window.auth.sendPhoneCode(this.phone)
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async register_login(code, pass) { // 使用短信验证码、密码注册并登录
    try {
      return await window.auth.signUpWithPhoneCode(this.phone, code, pass)
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async login_sms(code) { // 使用短信验证码登录
    try {
      return await window.auth.signInWithPhoneCodeOrPassword({
        phoneNumber: this.phone,
        phoneCode: code
      })
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async login_pass(pass) { // 使用密码登录
    try {
      return await window.auth.signInWithPhoneCodeOrPassword({
        phoneNumber: this.phone,
        password: pass
      })
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};