VoiceRecorder = function()
{
	this.recording = false;
	this.stream = undefined;
	this.recorder = undefined;
	this.buffer = [];
	this.callback = undefined;

	this.start = function(callback)
	{
		if(this.recording)
		{
			return this;
		}
		if(callback === undefined)
		{
			callback = function(data)
			{
				console.log(data);
			};
		}
		var obj = this;
		navigator.getUserMedia({audio: true}, function(stream)
		{
			obj.stream = stream;
			obj.recorder = new MediaRecorder(stream, {mimeType:"audio/webm"});
			obj.recorder.ondataavailable = function(e)
			{
				if(e.data.size > 0)
				{
					obj.buffer.push(e.data);
				}
			};
			obj.recorder.start();
			obj.isRecording = true;
			callback("OK");
		}, function(e)
		{
			callback("USER_DENIED");
		});
		return this;
	};

	this.get = function(callback)
	{
		callback(new Blob(this.buffer));
		return this;
	}

	this.clear = function()
	{
		this.buffer = [];
		return this;
	}

	this.stop = function()
	{
		this.isRecording = false;
		this.buffer = [];
		this.stream.getTracks()[0].stop();
		this.recorder = undefined;
		return this;
	}
};

window.URL = (window.URL || window.webkitURL);
navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
