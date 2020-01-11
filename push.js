var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BGmohfxjwuPnNI8kxWpiMynSY2IQa4EnxsV1YoX_eDFMeoJVebtYEGpCESuew3vHMGrl7FlWyoKBH2hmw30TC8Y",
   "privateKey": "3VepPnvJeN-0TmZwKiNsczk-ElgDPlPnAvyDWKMR2l4"
};

console.log(vapidKeys + ' work vapid key')
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cn0lrWbhH88:APA91bFk6wpbse7YFazkYctk2kpV9blQgKWlP2_Kwkcx8PUK_XiLYJNaextCYMMxgXGXWpTkyGi8dKGtt0yGUG-beEdi9AOhVQ2P2fmTUtM8wuXYzZXMEUA2Af8mcA4wxgjyLjRQvQOc",
   "keys": {
       "p256dh": "BLY6GCbcaE14DonJDfJEPRHm+23itrI2SLmjGtXpq3ABBLEN7BDACAxMQxfvFflOQBsjydd/unctc5xUgFoafSU=",
       "auth": "4mIgP+AXZg4BU1QsvgjZ/w=="
   }
};

console.log(pushSubscription + " pushsb jalan")
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

console.log(payload + " play load jalan")
 
var options = {
   gcmAPIKey: '857316600947',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
   ).catch(function(err){
   console.log(err);
   });

   