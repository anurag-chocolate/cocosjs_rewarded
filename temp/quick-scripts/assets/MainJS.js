(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/MainJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe9fbahV3BOZK0SLvS9+Ch5', 'MainJS', __filename);
// MainJS.js

"use strict";

var VDOPIA_API_KEY = "EnP5f4";
var isUpdateUiNeeded = false;
var isRewardAdLoaded = false;
var isRewardAdCompleted = false;

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        show_ad: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        //this.loadad();
        console.log("onload");
        /*var hideAction1 = cc.hide();        //Hiding reward dialog initially
             this.show_ad.node.runAction(hideAction1);*/

        this.hookInput();
        this.setupVdopiaAd();
        isUpdateUiNeeded = true; //Update UI using update method
        isRewardAdLoaded = false;
        isRewardAdCompleted = false;
    },

    update: function update(dt) {
        if (isUpdateUiNeeded) {
            isUpdateUiNeeded = false;
            this.updateUIFun();
        }
    },

    hookInput: function hookInput() {
        if (cc.sys.platform == cc.sys.ANDROID) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function onKeyPressed(kcode, e) {
                    console.log("KEY : " + kcode + " == " + cc.KEY.back);
                    if (kcode == cc.KEY.back) {
                        cc.director.end();
                    }
                }
            }, this.node);
        }
    },

    setupVdopiaAd: function setupVdopiaAd() {
        if (this.VdopiaAd) {
            console.log("Vdopia Plugin Already Initialized...");
        } else {
            console.log("Vdopia Plugin Not Initialized...");

            this.VdopiaAd = require('VdopiaPlugin'); //Init VdopiaPlugin

            //Set Ad Event Receiver function for listening Vdopia SDK Ad Event
            this.VdopiaAd.prototype.callbackFunction = this.vdopiaCallback;

            //Set USER parameter used for better Ad targeting and higher yield (Not Complsory)
            //Developer can pass empty string for any Param like ""
            //Param 1 : Age
            //Param 2 : BirthDate (dd/MM/yyyy)
            //Param 3 : Gender (m/f/u)
            //Param 4 : Marital Status (single/married/unknown)
            //Param 5 : Ethinicty (example : Africans/Asian/Russians)
            //Param 6 : DMA Code (in String format)
            //Param 7 : Postal Code (in String format)
            //Param 8 : Current Postal Code (in String format)
            //Param 9 : Location latitude in string format
            //Param 10 : Location longitude in string format
            this.VdopiaAd.prototype.setAdRequestUserData("23", "23/11/1990", "m", "single", "Asian", "999", "123123", "321321", "28.70", "77.10");

            //Set APP parameter used better Ad targeting and higher yield (Not Complsory)
            //Developer can pass empty string for any Param like ""
            //Param 1 : App Name
            //Param 2 : Publisher Name
            //Param 3 : App Domain
            //Param 4 : Publisher Domain
            //Param 5 : PlayStore URL of the App
            //Param 6 : Ad Category
            this.VdopiaAd.prototype.setAdRequestAppData("CocosDemo", "Vdopia", "cocos-demo.com", "vdopia.com", "", "IAB1");

            //Set Test Mode parameter used for Getting Test AD (Not Complsory)
            //Param 1 : boolean : true if test mode enabled else false
            //Param 2 : Hash ID (If you are testing Facebook/Google Partner Test Ad you can get from ADB Logcat)
            //this.VdopiaAd.prototype.setAdRequestTestMode(true, "XXXXXXXXXXXXXXXX");
            this.VdopiaAd.prototype.prefetchRewardAd(VDOPIA_API_KEY);
        }
    },

    onclick: function onclick() {

        console.log("uttonClicked");

        if (this.VdopiaAd) {
            this.VdopiaAd.prototype.loadRewardAd(VDOPIA_API_KEY);
        }
    },

    vdopiaCallback: function vdopiaCallback(adType, adEvent) {
        console.log("Publisher Event : Ad Type : " + adType + " Ad Event : " + adEvent);

        /*if (adEvent === VdopiaGlobal.INTERSTITIAL_AD_LOADED) {
            isInterstitialAdLoaded = true;
            console.log("Is Interstitial Ad Loaded..." + isInterstitialAdLoaded);
        }*/

        if (adEvent === VdopiaGlobal.REWARD_AD_LOADED) {
            isRewardAdLoaded = true;
            console.log("Is Reward Ad Loaded..." + isRewardAdLoaded);
            this.VdopiaAd = require('VdopiaPlugin');
            if (this.VdopiaAd) {
                this.VdopiaAd.prototype.showRewardAd("qj5ebyZ0F0vzW6yg", "Chocolate1", "coin", "30");
                this.VdopiaAd.prototype.prefetchRewardAd(VDOPIA_API_KEY); //prefetch next rewarded ad
            }
        }
        if (adEvent === "REWARD_AD_FAILED") {
            isRewardAdLoaded = true;
            console.log("Is Reward Ad Failed..." + isRewardAdLoaded);
        }

        if (adEvent === "REWARD_AD_SHOWN") {
            isRewardAdLoaded = true;
            console.log("Is Reward Ad Shown..." + isRewardAdLoaded);
        }

        if (adEvent === "REWARD_AD_SHOWN_ERROR") {
            isRewardAdLoaded = true;
            console.log("Is Reward Ad Loaded..." + isRewardAdLoaded);
        }

        if (adEvent === "REWARD_AD_DISMISSED") {
            isRewardAdLoaded = true;
            console.log("Is Reward Ad Dismissed..." + isRewardAdLoaded);
        }
        if (adEvent === VdopiaGlobal.REWARD_AD_COMPLETED) {
            isRewardAdCompleted = true;
            console.log("Is Reward Ad Completed..." + isRewardAdCompleted);
        }

        isUpdateUiNeeded = true; //Updating UI based on Ad callback
    },
    //Updating the UI as per callback status
    updateUIFun: function updateUIFun() {
        console.log("updateUIFun Called...");

        //Enable disable Interstitial Ad related buttons as per Interstitial callback
        /* if (isInterstitialAdLoaded) {
             this.loadInterstitialAd.interactable = false;
             this.showInterstitialAd.interactable = true;
         } else {
             this.loadInterstitialAd.interactable = true;
             this.showInterstitialAd.interactable = false;
         }*/
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MainJS.js.map
        