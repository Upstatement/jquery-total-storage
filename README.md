![image](http://upstatement.com/wp-content/uploads/2012/01/jquery-total-storage1.png)
Dead-Simple local storage for every browser and device

## What makes it TOTAL Storage?
 
 * The browser doesn't support local storage it will fall-back to cookies! (Using the
   wonderful $.cookie plugin).
 * Send it strings, numbers even complex object arrays! TotalStorage does not care. Your efforts to defeat it will prove futile. 
 * Simple as shit. jStorage and some other very well-written plugins provide a bevy of options for expiration, security and so forth. Frequently this is more power than you need and vulnerable to confusion if you just want it to work (JWITW)
 
## Some examples  
 * Set the value of a key to a string
 
		$.totalStorage('the_key', 'the_value');
		
 * Set the value of a key to a number
 
		$.totalStorage('the_key', 800.2);
		
 * Set the value of a key to a complex Array
 
 		var myArray = new Array();
 		myArray.push({name:'Jared', company:'Upstatement', zip:63124});
		myArray.push({name:'McGruff', company:'Police', zip:60652};
		$.totalStorage('people', myArray);
		
		//to return:
		$.totalStorage('people');

## The stats:
 * @name $.totalStorage
 * @cat Plugins/Cookie
 * @author Jared Novack/jared@upstatement.com
 * @version 1.1.2
 * @url http://upstatement.com/blog/2012/01/jquery-local-storage-done-right-and-easy/
 
## Some background:
### Why?
Last year my firm worked on a project to help seniors calculate their savings, social security, mortgate, etc. so they could better plan for retirement. This involved the users entering a lot of data (and because of privacy risks we didn't want to store all that personal financial data). Using the browser's local storage was perfect ... except for Internet Explorer. So I wrote this as a way to integrate localStorage or cookies depending on what the browser could handle AND let me access it in a super-simple way all across the application.

### Many thanks to:
Andris Reinman and Klaus Hartl. Their plugins (jStorage and Cookie, respectively) provided the roadmap to make this. Also feedback and comments from users have been most helpful in making this more efficient and killing some bugs.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jarednova/jquery-total-storage/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
