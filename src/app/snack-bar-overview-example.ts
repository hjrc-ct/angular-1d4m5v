import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import {SwPush} from '@angular/service-worker';

import { enableProdMode } from "@angular/core";

enableProdMode();

/**
 * @title Basic snack-bar
 */
@Component({
  selector: "snack-bar-overview-example",
  templateUrl: "snack-bar-overview-example.html",
  styleUrls: ["snack-bar-overview-example.css"]
})
export class SnackBarOverviewExample implements OnInit {
  title: "snack bar overview example - title goes here";

  constructor(private _snackBar: MatSnackBar,
              private swPush: SwPush ) {
    console.log("in constructor - SnackBarOverviewExample ");
  }

  ngOnInit() {
    console.log("on init method - SnackBarOverviewExample ");

    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log("Service Worker and Push is supported");
      console.log("try to register sw ");
      let sw = navigator.serviceWorker.register("app/sw.js").then(
        function(registration) {
          console.log("Service worker registration succeeded:", registration);
        },
        /*catch*/ function(error) {
          console.log("Service worker registration failed:", error);
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  async subscribeBPA() {
    console.log("in subscribeBPA function async ... ");
    let sw = await navigator.serviceWorker.ready;

    this.swPush.requestSubscription({
       serverPublicKey: "BBlw0TujfU6PVbweYIULgv5nLRcwOhvgM5fjdzeLWEXqjHsKvshTk10Q7VFsS9G29y-dovhm5bwz3Vwh5k0tRNI"
    }).then( sub => {
      console.log("SW subscription object available -> ", sub);
    }).catch( err => console.error("SW subscription failed with error -> ", err));

    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      // TODO - put publich key for BPA app here
      applicationServerKey: this.urlBase64ToUint8Array(
        "BBlw0TujfU6PVbweYIULgv5nLRcwOhvgM5fjdzeLWEXqjHsKvshTk10Q7VFsS9G29y-dovhm5bwz3Vwh5k0tRNI"
      )
    });

    console.log("outcome of device subscribe -> ", JSON.stringify(push));
  }

  urlBase64ToUint8Array(base64String: string) {
    console.log("in base64 convert method...");
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
