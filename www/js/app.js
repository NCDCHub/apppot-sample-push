/** 全体の設定 **/
var AppPot = AppPotSDK.getService({
  url: 'http://trial.apppot.net/apppot/',
  appId: 'xxxx',
  appVersion: '1.0.0',
  appKey: 'xxxx',
  companyId: 0
});

ons.ready(() => {
  console.log("ons.ready");
});

document.addEventListener("deviceready", () => {
  console.log(JSON.stringify(window.device));

  const push = PushNotification.init({
    android: {
      senderID: "xxxx"
    }
  });

  push.on('registration', (data)=>{
    var device = new AppPot.Device({
      udid: window.device.uuid,
      token: data.registrationId,
      name: window.device.model,
      osType: window.device.platform
    });

    AppPot.LocalAuthenticator.login("xxxx", "xxxx", true, device)
      .then(()=>{
        console.log("Logined");
      }).catch((e)=>{
        alert("Login Error");
      });
  });

  push.on('notification', (data) => {
    console.log(JSON.stringify(data));
  });

  push.on('error', (e) => {
    console.log(e.message);
  });
}, false);

function pushSend() {
  AppPot.sendPushNotification("Push Message", {"all":true}, "Push Title");
}
