/**
 * TotalStorage
 *
 * Copyright (c) 2012 Jared Novack & Upstatement (upstatement.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Total Storage is the conceptual the love child of jStorage by Andris Reinman, 
 * and Cookie by Klaus Hartl -- though this is not connected to either project.
 */

/**
 * Create a local storage parameter
 *
 == What makes it TOTAL Storage? ==
 
 * The browser doesn't support local storage it will fall-back to cookies! (Using the
   wonderful $.cookie plugin).
 * Send it strings, numbers even complex object arrays! TotalStorage does not care.
   Your efforts to defeat it will prove futile. 
 * Simple as shit. jStorage and some other very well-written plugins provide a bevy of
   options for expiration, security and so forth. Frequently this is more power than you
   need and vulnerable to confusion if you're just want it to work (JWITW)
   
 * @desc Set the value of a key to a string
 * @example $.totalStorage('the_key', 'the_value');
 * @desc Set the value of a key to a number
 * @example $.totalStorage('the_key', 800.2);
 * @desc Set the value of a key to a complex Array
 * @example	var myArray = new Array();
 *			myArray.push({name:'Jared', company:'Upstatement', zip:63124});
			myArray.push({name:'McGruff', company:'Police', zip:60652};
			$.totalStorage('people', myArray);
			//to return:
			$.totalStorage('people');
 *
 * @name $.totalStorage
 * @cat Plugins/Cookie
 * @author Jared Novack/jared@upstatement.com
 * @version 1.1.2
 * @url http://upstatement.com/blog/2012/01/jquery-local-storage-done-right-and-easy/
 */

;(function($, undefined){

	/* Variables I'll need throghout */

	var supported, ls;
	if ('localStorage' in window){
		try {
			ls = (typeof window.localStorage === 'undefined') ? undefined : window.localStorage;
			if (typeof ls == 'undefined' || typeof window.JSON == 'undefined'){
				supported = false;
			} else {
				supported = true;
			}
		}
		catch (err){
			supported = false;
		}
	}

	/* Make the methods public */

	$.totalStorage = function(key, value, options){
		return $.totalStorage.impl.init(key, value);
	};

	$.totalStorage.setItem = function(key, value){
		return $.totalStorage.impl.setItem(key, value);
	};

	$.totalStorage.getItem = function(key){
		return $.totalStorage.impl.getItem(key);
	};

	$.totalStorage.getAll = function(){
		return $.totalStorage.impl.getAll();
	};

	$.totalStorage.deleteItem = function(key){
		return $.totalStorage.impl.deleteItem(key);
	};

	/* Object to hold all methods: public and private */

	$.totalStorage.impl = {

		init: function(key, value){
			if (typeof value != 'undefined') {
				return this.setItem(key, value);
			} else {
				return this.getItem(key);
			}
		},

		setItem: function(key, value){
			if (!supported){
				try {
					$.cookie(key, value);
					return value;
				} catch(e){
					console.log('Local Storage not supported by this browser. Install the cookie plugin on your site to take advantage of the same functionality. You can get it at https://github.com/carhartl/jquery-cookie');
				}
			}
			var saver = JSON.stringify(value);
			ls.setItem(key, saver);
			return this.parseResult(saver);
		},
		getItem: function(key){
			if (!supported){
				try {
					return this.parseResult($.cookie(key));
				} catch(e){
					return null;
				}
			}
			var item = ls.getItem(key);
			return this.parseResult(item);
		},
		deleteItem: function(key){
			if (!supported){
				try {
					$.cookie(key, null);
					return true;
				} catch(e){
					return false;
				}
			}
			ls.removeItem(key);
			return true;
		},
		getAll: function(){
			var items = [];
			if (!supported){
				try {
					var pairs = document.cookie.split(";");
					for (var i = 0; i<pairs.length; i++){
						var pair = pairs[i].split('=');
						var key = pair[0];
						items.push({key:key, value:this.parseResult($.cookie(key))});
					}
				} catch(e){
					return null;
				}
			} else {
				for (var j in ls){
					if (j.length){
						items.push({key:j, value:this.parseResult(ls.getItem(j))});
					}
				}
			}
			return items;
		},
		parseResult: function(res){
			var ret;
			try {
				ret = JSON.parse(res);
				if (typeof ret == 'undefined'){
					ret = res;
				}
				if (ret == 'true'){
					ret = true;
				}
				if (ret == 'false'){
					ret = false;
				}
				if (parseFloat(ret) == ret && typeof ret != "object"){
					ret = parseFloat(ret);
				}
			} catch(e){
				ret = res;
			}
			return ret;
		}
	};
})(jQuery);
