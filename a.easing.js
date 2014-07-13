$.plugins.easing = {
	linear: function(x)
	{
		return x;
	},
	
	inQuad: function(x)
	{
		return x * x;
	},
	
	outQuad: function(x)
	{
		return -x * (x - 2);
	},
	
	inOutQuad: function(x)
	{
		if ((x /= 0.5) < 1) return 0.5 * x * x;
		return -0.5 * ((--x) * (x - 2) - 1);
	},
	
	inCubic: function(x)
	{
		return x * x * x;
	},
	
	outCubic: function(x)
	{
		return (x -= 1) * x * x + 1;
	},
	
	inOutCubic: function(x)
	{
		if ((x /= 0.5) < 1) return 0.5 * x * x * x;
		return 0.5 * ((x -= 2) * x * x + 2);
	},
	
	inQuart: function(x)
	{
		return x * x * x * x;
	},
	
	outQuart: function(x)
	{
		return -((x -= 1) * x * x * x - 1);
	},
	
	inOutQuart: function(x)
	{
		if ((x /= 0.5) < 1) return 0.5 * x * x * x * x;
		return -0.5 * ((x -= 2) * x * x * x - 2);
	},
	
	inQuint: function(x)
	{
		return x * x * x * x * x;
	},
	
	outQuint: function(x)
	{
		return (x -= 1) * x * x * x * x + 1;
	},
	
	inOutQuint: function(x)
	{
		if ((x /= 0.5) < 1) return 0.5 * x * x * x * x * x;
		return 0.5 * ((x -= 2) * x * x * x * x + 2);
	},
	
	inSine: function(x)
	{
		return -Math.cos(x * (Math.PI / 2)) + 1;
	},
	
	outSine: function(x)
	{
		return Math.sin(x * (Math.PI / 2));
	},
	
	inOutSine: function(x)
	{
		return -0.5 * (Math.cos(Math.PI * x) - 1);
	},
	
	inExpo: function(x)
	{
		return (x == 0) ? 0 : Math.pow(2, 10 * (x - 1));
	},
	
	outExpo: function(x)
	{
		return (x == 1) ? 1 : -Math.pow(2, -10 * x) + 1;
	},
	
	inOutExpo: function(x)
	{
		if (x == 0) return 0;
		if (x == 1) return 1;
		if ((x /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (x - 1));
		return 0.5 * (-Math.pow(2, -10 * --x) + 2);
	},
	
	inCircle: function(x)
	{
		return -(Math.sqrt(1 - x * x) - 1);
	},
	
	outCircle: function(x)
	{
		return Math.sqrt(1 - (x -= 1) * x);
	},
	
	inOutCircle: function(x)
	{
		if ((x /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - x * x) - 1);
		return 0.5 * (Math.sqrt(1 - (x -= 2) * x) + 1);
	},
	
	inElastic: function(x)
	{
		var s = 0.075;
		if (x == 0) return 0;
		if (x == 1) return 1;
		return -(Math.pow(2, 10 * (x -= 1)) * Math.sin((x - s) * (2 * Math.PI) / 0.3));
	},
	
	outElastic: function(x)
	{
		var s = 0.075;
		if (x == 0) return 0;
		if (x == 1) return 1;
		return Math.pow(2, -10 * x) * Math.sin((x - s) * (2 * Math.PI) / 0.3) + 1;
	},
	
	inOutElastic: function(x)
	{
		var s = 0.1125;
		if (x == 0) return 0;
		if ((x /= 0.5) == 2) return 1;
		if (x < 1) return -0.5 * (Math.pow(2, 10 * (x -= 1)) * Math.sin((x - s) * (2 * Math.PI) / 0.45));
		return Math.pow(2, -10 * (x -= 1)) * Math.sin((x - s) * (2 * Math.PI) / 0.45) * 0.5 + 1;
	},
	
	inBack: function(x)
	{
		var s = 1.70158;
		return x * x * ((s + 1) * x - s);
	},
	
	outBack: function(x)
	{
		var s = 1.70158;
		return (x -= 1) * x * ((s + 1) * x + s) + 1;
	},
	
	inOutBack: function(x)
	{
		var s = 1.70158;
		if ((x /= 0.5) < 1) return 0.5 * (x * x * (((s *= 1.525) + 1) * x - s));
		return 0.5 * ((x -= 2) * x * (((s *= 1.525) + 1) * x + s) + 2);
	},
	
	inBounce: function(x)
	{
		return 1 - outBounce(1 - x);
	},
	
	outBounce: function(x)
	{
		if (x < (1 / 2.75)) {
			return 7.5625 * x * x;
		} else if (x < (2 / 2.75)) {
			return 7.5625 * (x -= (1.5 / 2.75)) * x + 0.75;
		} else if (x < (2.5 / 2.75)) {
			return 7.5625 * (x -= (2.25 / 2.75)) * x + 0.9375;
		} else {
			return 7.5625 * (x -= (2.625 / 2.75)) * x + 0.984375;
		}
	},
	
	inOutBounce: function(x)
	{
		if (x < 0.5) return inBounce(x * 2) * 0.5;
		return outBounce(x * 2 - 1) * 0.5 + 0.5;
	}
};
