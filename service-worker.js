// Part 2 -- below code represents simple notification method - top right corner message pop-up

console.log("in service-worker.js -> print value of self -> ", self);

self.addEventListener("install", function(e) {
  self.skipWaiting();
  console.log("Installed -> ", e);
});

self.addEventListener("activate", function(e) {
  console.log("Activated -> ", e);
});

self.addEventListener("push", function(e) {
  console.log("service worker registration ...");

  var options = {
    body: "This notification was generated from a BPA push!",
    icon: "images/example.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2"
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new BPA world",
        icon: "images/checkmark.png"
      },
      { action: "close", title: "Close", icon: "images/xmark.png" }
    ]
  };

  var mPayload;
  if (e.data) {
    mPayload = e.data.text();
  } else {
    mPayload = "Push message default payload - Hello BPA!";
  }

  e.waitUntil(self.registration.showNotification(mPayload, options));
});
