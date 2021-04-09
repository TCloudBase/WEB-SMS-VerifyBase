window.cloud = window.cloudbase.init({ env: "替换自己的环境ID" }) //初始化应用状态
const db = window.cloud.database() //取出数据库操作对象
loginState() //登录初始化校验

/**
 *  登录状态校验，如果当前有手机号登录态，证明已经提交预约了，直接显示，不重复预约
 */
function loginState() {
  if (window.auth == null) {
    window.auth = window.cloud.auth({
      persistence: 'local'
    });
  }
  auth.getLoginState().then(async (res) => {
    if (res && res._loginType == 'PHONE') {
      const phone = res.user.phone.replace('+86', '');
      const regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if (regs.test(phone)) {
        console.log('已经预约：', phone)
        submitinfo(3)
      }
    }
  });
}


/**
 * 提交预约信息，首先进行姓名校验，然后进行验证码校验
 * 校验成功后，用手机号登录，并进行预约信息push
 * 数据库权限为：仅创建者读写，所以需要登录后记录
 */
async function submit() {
  const name = document.getElementById('name').value;
  if (!/[\u4e00-\u9fa5]/.test(name)) {
    window.alert('姓名不符合规范，请重新填写！')
    return;
  }
  const code = document.getElementById('code').value;
  console.log('验证码：', code)
  submitinfo(1, '提交预约中')
  const loginres = await window.SMS.login_sms(code)
  console.log('登录结果：', loginres)
  if (loginres != false) {
    const datares = await db.collection('SIGN').doc(window.SMS.phone).set({ name })
    console.log('记录结果：', datares)
    submitinfo(3)
  } else {
    window.alert('验证码无效，请重新填写！')
    submitinfo()
  }
}

/**
 * 发送短信验证码，首先先验证手机号
 * 发送成功后，进行120秒的等待
 */
async function sendSMS() {
  const phone = document.getElementById('phone').value.replace(/\s/g, "");
  const regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
  if (regs.test(phone)) {
    console.log('手机号：', phone)
    sendinfo(2)
    const result = await window.SMS.send(phone)
    console.log('发送结果：', result)
    if (result != false) {
      sendinfo(1)
    } else {
      window.alert('验证码发送失败，请稍后再试！')
      sendinfo(3)
    }
  } else {
    window.alert('手机号填写格式错误，请重新填写！')
  }
}

/**
 * DOM操作，发送短信相关展示操作
 * flag为1时，执行倒计时
 * flag为2时，发送中
 * flag为3时，重置状态
 * time默认倒计时，只在flag为1有效
 */
function sendinfo(flag = 3, time = 120) {
  const send_btn = document.getElementById('send_btn');
  if (flag == 1) {
    send_btn.setAttribute('disabled', true);
    window.timeout = time;
    window.Interval = setInterval(() => {
      send_btn.innerText = `等待（${--window.timeout}秒）`
    }, 1000);
    setTimeout(function () {
      sendinfo()
      clearInterval(window.Interval);
    }, time * 1000)
  } else if (flag == 2) {
    send_btn.setAttribute('disabled', true);
    send_btn.innerText = `发送中`
  } else if (flag == 3) {
    send_btn.removeAttribute('disabled');
    send_btn.innerText = `发送验证码`
  }
}

/**
 * DOM操作，提交信息相关展示操作
 * flag为1时，按钮不可用
 * flag为2时，按钮重置
 * flag为3时，隐藏表单，显示TIPS
 * text为按钮文案，flag为1、2时有效
 */
function submitinfo(flag = 2, text = '提交预约') {
  const submit_btn = document.getElementById('submit');
  if (flag == 1) {
    submit_btn.setAttribute('disabled', true);
    submit_btn.innerText = text
  } else if (flag == 2) {
    submit_btn.removeAttribute('disabled');
    submit_btn.innerText = text
  } else if (flag == 3) {
    const tips_view = document.getElementById('tips');
    const model_view = document.getElementById('model');
    tips_view.style = "";
    model_view.style = "display:none;"
  }
}