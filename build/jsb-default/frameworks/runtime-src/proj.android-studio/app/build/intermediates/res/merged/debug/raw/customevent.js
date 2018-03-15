(function () {
    window.addEventListener("ivdoAdLoaded", function (e) {
        console.log("Vdopia: VDOMraidView : ivdoAdLoaded");
        mraidAndroid.adImpressionFire();
        mraidAndroid.adIsStarted();
    });

	window.fireVolumeChangeEvent = function (newVolume) {
		console.log("Vdopia: VDOMraidView : Volume Custom Event : " + newVolume);
		var event = new CustomEvent("vdo_sdkAdVolume", { "detail": newVolume });
		window.dispatchEvent(event);
	}

    document.addEventListener("VdoAdEvent", function (e) {
        if (e.eventStatus.search(/[^a-zA-Z]+/) === -1) {
            console.log("Vdopia: VDOMraidView : " + e.eventStatus.toUpperCase());
        }

        if (e.eventStatus.toUpperCase() == "CLOSE") {
            console.log("Vdopia: VDOMraidView : CLOSE");
            mraidAndroid.close();
        } else if (e.eventStatus.toUpperCase() == "MUTE") {
            console.log("Vdopia: VDOMraidView : MUTE");
            mraidAndroid.callMute();
        } else if (e.eventStatus.toUpperCase() == "UNMUTE") {
            console.log("Vdopia: VDOMraidView : UNMUTE");
            mraidAndroid.callUnMute();
        }
    });

	console.log("Vdopia: VDOMraidView Custom Event Listener Added");
})();