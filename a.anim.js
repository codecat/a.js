$.plugins.anim = {
	addFuncs: function(ret)
	{
		ret.anim = this.anim;
		
		return ret;
	},
	
	lerp: function(a, b, x)
	{
		return a + x * (b - a);
	},
	
	lerprgba: function(a, b, x)
	{
		return {
			r: $.plugins.anim.lerp(a.r, b.r, x),
			g: $.plugins.anim.lerp(a.g, b.g, x),
			b: $.plugins.anim.lerp(a.b, b.b, x),
			a: $.plugins.anim.lerp(a.a, b.a, x)
		};
	},
	
	hex2rgba: function(col)
	{
		if(col[0] == '#') {
			col = col.substring(1);
		}
		var val = parseInt(col, 16);
		return {
			r: (val & 0xFF0000) >> 16,
			g: (val & 0x00FF00) >> 8,
			b: (val & 0x0000FF),
			a: 1
		};
	},
	
	rgba2str: function(col)
	{
		return "rgba(" + Math.round(col.r) + "," + Math.round(col.g) + "," + Math.round(col.b) + "," + col.a + ")";
	},
	
	animStop: function(id)
	{
		clearInterval(id);
	},
	
	anim: function(a, b, c)
	{
		var opt = {
			style: "",
			seconds: 1,
			interpolate: undefined,
			callback: undefined
		};
		
		if(typeof(a) == "object") {
			opt = a;
		} else {
			opt.style = a;
			opt.seconds = b;
			opt.interpolate = c;
		}
		
		var elm = this;
		var tmStart = new Date();
		
		var ended = function()
		{
			return new Date() - tmStart >= opt.seconds * 1000;
		};
		
		var ratio = function() {
			var ret = ((new Date() - tmStart) / 1000) / opt.seconds;
			if(opt.interpolate != undefined) {
				if(typeof(opt.interpolate) == "string" && $.plugins.easing != undefined) {
					opt.interpolate = $.plugins.easing[opt.interpolate];
				}
				ret = opt.interpolate(ret);
			}
			return ret;
		};
		
		var setInv = function(cbTick, cbEnd)
		{
			var id = setInterval(function() {
				if(ended()) {
					clearInterval(id);
					cbEnd();
					if(opt.callback != undefined) {
						opt.callback();
					}
					return;
				}
				cbTick();
			}, 17);
			return id;
		};
		
		var lerp = $.plugins.anim.lerp;
		var lerprgba = $.plugins.anim.lerprgba;
		var hex2rgba = $.plugins.anim.hex2rgba;
		var rgba2str = $.plugins.anim.rgba2str;
		
		return {
			num: function(start, end)
			{
				if(start == "") start = 0;
				if(end == "") end = 0;
				start = parseInt(start);
				end = parseInt(end);
				elm.style[opt.style] = start;
				return setInv(function() {
					elm.style[opt.style] = lerp(start, end, ratio());
				}, function() {
					elm.style[opt.style] = end;
				});
			},
			
			px: function(start, end)
			{
				if(start == "") start = 0;
				if(end == "") end = 0;
				start = parseInt(start);
				end = parseInt(end);
				elm.style[opt.style] = start + "px";
				return setInv(function() {
					elm.style[opt.style] = lerp(start, end, ratio()) + "px";
				}, function() {
					elm.style[opt.style] = end + "px";
				});
			},
			
			perc: function(start, end)
			{
				if(start == "") start = 0;
				if(end == "") end = 0;
				start = parseInt(start);
				end = parseInt(end);
				elm.style[opt.style] = start + "%";
				return setInv(function() {
					elm.style[opt.style] = lerp(start, end, ratio()) + "%";
				}, function() {
					elm.style[opt.style] = end + "%";
				});
			},
			
			color: function(start, end)
			{
				return this.colrgba(hex2rgba(start), hex2rgba(end));
			},
			
			colrgba: function(start, end)
			{
				elm.style[opt.style] = rgba2str(start);
				return setInv(function() {
					elm.style[opt.style] = rgba2str(lerprgba(start, end, ratio()));
				}, function() {
					elm.style[opt.style] = rgba2str(end);
				});
			},
		};
	}
};
