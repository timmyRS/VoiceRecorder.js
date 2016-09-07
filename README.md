# VoiceRecorder.js

A simple javascript, that allows you to record the user's microphone. I made this because I found no javascript that did it quite as good and easy as this one and it was hard for me to even find documentations, so I hope I made your job a bit easier.

## Usage

Note that there is [an example](https://github.com/timmyrs/projects/blob/master/VoiceRecorder/example.html) that you can even [try live](https://playground.netdex.co/test/VoiceRecorder/) if you don't like reading documentations.

### **Creating** An Instance

You can create a new instance of the voice recorder using this line:

    recorder = new VoiceRecorder();

### **Start**ing The Recording

Starting to record will request permissions, if we don't already have them.
You may want to know if the user gave you the permission, so you can just define a callback-function:

    recorder.start(function(status)
    {
        if(status == "OK")
        {
            // Everything is awesome
        } else
        {
            // No permission for us :(
        }
    });

If you got `OK` the VoiceRecorder has already started to record the user's audio.

### **Get**ting The Recording

At some point of time you probably want to get a nice `Blob` of the recorded audio, so you can do that using the get-function:

    recorder.get(function(blob)
    {
        // Object URL
        console.log(window.URL.createObjectURL(blob));
        // Data URL
        reader = new FileReader();
		reader.onload = function()
		{
			window.open(this.result.replace("data:;", "data:audio/wav;"));
		}
		reader.readAsDataURL(blob);
    });
    
 Here are two ways to use the blob.
The first method (Object URL) looks simpler but is virtually useless since you can only use it as `src` of an audio-elemement. The second method (Data URL) however, gets a data URL and opens it in a new tab.
 
### **Clear**ing The Recording
 
If you used get, you probably don't want to get the same data again when using get again, so by simply using clear, you will clear the current recording, but the recording will continue on as normal, so when you use get again, you will not get any repeating data.
 
    recorder.get(function(blob)
    {
        // ...
    }).clear();
    
### **Stop**ping the recoring

But if you are done recording you can just call the stop-function:

    recorder.stop();
    
This will **not**

- eat up user's RAM when not needed
- show the red recording circle on the tab

which are both crucial things if you want to be trusted by the user, in my opinion.

### You're done.

These are all the functions you need to know when using the **VoiceRecorder.js**.

**Pro-Tip**: All functions return `this`, which allows for jQuery-like return-based coding.