function _$(s) {
	var src = document;
	if(this != "[object Window]")
		src = this;
	var ret = false;
	
	switch(typeof(s)) {
		case "string":
			if(s != "") {
				var isID = s[0] == "#";
				var isClass = s[0] == ".";
				var isTag = (!isID && !isClass);
				
				if(isID || isClass)
					s = s.substr(1);
				
				var sIndex = -1;
				var sMatches = s.match(/^(.+)(\[([0-9]+)\])$/);
				if(sMatches) {
					sIndex = parseInt(sMatches[3]);
					s = sMatches[1];
				}
				
				var elms;
				if(isID)
					ret = src.getElementById(s);
				else if(isClass)
					elms = src.getElementsByClassName(s);
				else if(isTag)
					elms = src.getElementsByTagName(s);
				
				if(elms.length == 1)
					ret = elms[0];
				else {
					ret = elms;
					if(sIndex != -1)
						ret = elms[sIndex];
				}
			}
			break;
		case "function":
			document.addEventListener("DOMContentLoaded", s, false);
			break;
		default:
			console.log("Unknown type in a.js: '" + typeof(s) + "'");
			break;
	}
	
	if(ret !== false) {
		ret._$ = _$;
		ret.append = function(c) { ret.innerHTML += c; return this; };
		ret.prepend = function(c) { ret.innerHTML = c + ret.innerHTML;  return this; };
		ret.set = function(c) { ret.innerHTML = c; return this; }
		ret.clear = function() { ret.innerHTML = "";  return this; }
	}
	
	return ret;
}