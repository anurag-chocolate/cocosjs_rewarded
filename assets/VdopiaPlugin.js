/**
 * This is the Cocos2dx JavaScript of Vdopia Plugin
 * This JavaScript provide bridge to communicate with Vdopia Core SDK
 * This JavaScript Should not be changed by publisher
 * This JavaScript is tested and compitible with CocosCreater_v1.6.1 Project
 */

//Vdopia Ad Event global message
window.VdopiaGlobal = {
    JAVA_CLASS_NAME: "com/vdopia/cocos2dx/plugin/VdopiaPlugin",
    LOG_TAG: "VdopiaCocosPlugin0 : ",
    //Type of Ad
    INTERSTITIAL_AD_TYPE: "INTERSTITIAL",
    REWARD_AD_TYPE: "REWARD",
    //Event of Ad
    INTERSTITIAL_AD_LOADED: "INTERSTITIAL_LOADED",
    INTERSTITIAL_AD_FAILED: "INTERSTITIAL_FAILED",
    INTERSTITIAL_AD_SHOWN: "INTERSTITIAL_SHOWN",
    INTERSTITIAL_AD_CLICKED: "INTERSTITIAL_CLICKED",
    INTERSTITIAL_AD_DISMISSED: "INTERSTITIAL_DISMISSED",
    REWARD_AD_LOADED: "REWARD_AD_LOADED",
    REWARD_AD_FAILED: "REWARD_AD_FAILED",
    REWARD_AD_SHOWN: "REWARD_AD_SHOWN",
    REWARD_AD_SHOWN_ERROR: "REWARD_AD_SHOWN_ERROR",
    REWARD_AD_DISMISSED: "REWARD_AD_DISMISSED",
    REWARD_AD_COMPLETED: "REWARD_AD_COMPLETED"
};

cc.Class({
    properties: {
        callbackFunction: null      //Ad evet Callback Function
    },
    //This method is called from Vdopia SDK Cocos2dx JS plugin
    //This is callback related to Vdopia Ad
    //Param 1 : adType : Type of Ad as mentioned above
    //Param 2 : adEvent : Event of Ad as mentioned above 
    vdopiaAdEvent: function (adType, adEvent) {
        console.log(VdopiaGlobal.LOG_TAG + "Ad Type : " + adType + " Ad Event : " + adEvent);

        //Passing the callback to the publisher JavaScript with same parameter
        if (this.callbackFunction) {
            this.callbackFunction(adType, adEvent);
        }
    },
    //This method sends AdRequestUserData to the Vdopia SDK Cocos2dx JS plugin and plugin will set this details to Vdopia core SDK
    setAdRequestUserData: function (age, birthDate, gender, maritalStatus, ethnicity, dmaCode, postal, curPostal, latitude, longitude) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "setAdRequestUserParams Android");
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME, "SetAdRequestUserParams",
                    ("(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;"
                            + "Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"),
                    age, birthDate, gender, maritalStatus, ethnicity, dmaCode, postal, curPostal, latitude, longitude);
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "setAdRequestUserParams iPhone");
        } else {
            console.log(VdopiaGlobal.LOG_TAG + "setAdRequestUserParams Web Ignored");
        }
    },
    //This method sends AdRequestAppData to the Vdopia SDK Cocos2dx JS plugin and plugin will set this details to Vdopia core SDK
    setAdRequestAppData: function (appName, pubName, appDomain, pubDomain, storeUrl, iabCategory) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "setAdRequestAppParams Android");
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME, "SetAdRequestAppParams",
                    "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                    appName, pubName, appDomain, pubDomain, storeUrl, iabCategory);
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "setAdRequestAppParams iPhone");
        } else {
            console.log(VdopiaGlobal.LOG_TAG + "setAdRequestAppParams Web Ignored");
        }
    },
    //This method sends AdRequestTestMode to the Vdopia SDK Cocos2dx JS plugin and plugin will set this details to Vdopia core SDK
    setAdRequestTestMode: function (isEnabled, hashID) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "setTestModeEnabled Android");
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "SetTestModeEnabled", "(ZLjava/lang/String;)V", isEnabled, hashID);
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "setTestModeEnabled iPhone");
        } else {
            console.log(VdopiaGlobal.LOG_TAG + "setTestModeEnabled Web Ignored");
        }
    },
    //This method will call PrefetchInterstitialAd of Vdopia SDK Cocos2dx JS plugin and plugin will call respective Vdopia core SDK method
    prefetchInterstitialAd: function (apikey) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "prefetchInterstitialAd Android");

            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "SelectPluginType", "(Ljava/lang/String;)V", "js");

            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "PrefetchInterstitialAd", "(Ljava/lang/String;)V", apikey);
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "prefetchInterstitialAd iPhone");
        }
    },
    //This method will call LoadInterstitialAd of Vdopia SDK Cocos2dx JS plugin and plugin will call respective Vdopia core SDK method
    loadInterstitialAd: function (apikey) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "loadInterstitialAd Android");
            
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "SelectPluginType", "(Ljava/lang/String;)V", "js");
                    
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "LoadInterstitialAd", "(Ljava/lang/String;)V", apikey);
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "loadInterstitialAd iPhone");
        } else {
            console.log(VdopiaGlobal.LOG_TAG + "loadInterstitialAd Web Ignored");
            if (this.callbackFunction) {
                this.callbackFunction(VdopiaGlobal.INTERSTITIAL_AD_TYPE, VdopiaGlobal.INTERSTITIAL_AD_LOADED);
            }
        }
    },
    //This method will call ShowInterstitialAd of Vdopia SDK Cocos2dx JS plugin and plugin will call respective Vdopia core SDK method
    showInterstitialAd: function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "showInterstitialAd Android");
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME, "ShowInterstitialAd", "()V");
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "showInterstitialAd iPhone");
        } else {
            console.log(VdopiaGlobal.LOG_TAG + "showInterstitialAd Web Ignored");
            if (this.callbackFunction) {
                this.callbackFunction(VdopiaGlobal.INTERSTITIAL_AD_TYPE, VdopiaGlobal.INTERSTITIAL_AD_SHOWN);
                this.callbackFunction(VdopiaGlobal.INTERSTITIAL_AD_TYPE, VdopiaGlobal.INTERSTITIAL_AD_DISMISSED);
            }
        }
    },
    //This method will call PrefetchRewardAd of Vdopia SDK Cocos2dx JS plugin and plugin will call respective Vdopia core SDK method
    prefetchRewardAd: function (apikey) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "prefetchRewardAd Android");

            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "SelectPluginType", "(Ljava/lang/String;)V", "js");

            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "PrefetchRewardAd", "(Ljava/lang/String;)V", apikey);
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "prefetchRewardAd iPhone");
        }
    },
    //This method will call LoadRewardAd of Vdopia SDK Cocos2dx JS plugin and plugin will call respective Vdopia core SDK method
    loadRewardAd: function (apikey) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "loadRewardAd Android");
            
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "SelectPluginType", "(Ljava/lang/String;)V", "js");
                    
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME,
                    "LoadRewardAd", "(Ljava/lang/String;)V", apikey);
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "loadRewardAd iPhone");
        } else {
            console.log(VdopiaGlobal.LOG_TAG + "loadRewardAd Web Ignored");
            if (this.callbackFunction) {
                this.callbackFunction(VdopiaGlobal.REWARD_AD_TYPE, VdopiaGlobal.REWARD_AD_LOADED);
            }
        }
    },
    //This method will call ShowRewardAd of Vdopia SDK Cocos2dx JS plugin and plugin will call respective Vdopia core SDK method
    showRewardAd: function (secret, userid, rewardName, rewardAmount) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "showRewardAd Android");
            jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME, "ShowRewardAd",
                    "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", secret, userid, rewardName, rewardAmount);
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "showRewardAd iPhone");
        } else {
            console.log(VdopiaGlobal.LOG_TAG + "showRewardAd Web Ignored");
            if (this.callbackFunction) {
                this.callbackFunction(VdopiaGlobal.REWARD_AD_TYPE, VdopiaGlobal.REWARD_AD_SHOWN);
                this.callbackFunction(VdopiaGlobal.REWARD_AD_TYPE, VdopiaGlobal.REWARD_AD_LOADED);
                this.callbackFunction(VdopiaGlobal.REWARD_AD_TYPE, VdopiaGlobal.REWARD_AD_COMPLETED);
                this.callbackFunction(VdopiaGlobal.REWARD_AD_TYPE, VdopiaGlobal.REWARD_AD_DISMISSED);
            }
        }
    },
    //This method will call IsRewardAdAvailableToShow of Vdopia SDK Cocos2dx JS plugin and plugin will call respective Vdopia core SDK method
    isRewardAdAvailable: function () {
        if (cc.sys.platform == cc.sys.ANDROID) {
            console.log(VdopiaGlobal.LOG_TAG + "isRewardAdAvailable Android");
            return jsb.reflection.callStaticMethod(VdopiaGlobal.JAVA_CLASS_NAME, "IsRewardAdAvailableToShow", "()Z");
        } else if (cc.sys.platform == cc.sys.IPHONE) {
            console.log(VdopiaGlobal.LOG_TAG + "isRewardAdAvailable iPhone");
            return true;
        } else {
            console.log(VdopiaGlobal.LOG_TAG + "isRewardAdAvailable Web Ignored");
            return true;
        }
    }
});
