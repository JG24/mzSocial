(function ($) {
	$.mzsocial = function(options) {
		
		var defaults = { 
			modules: "facebook,twitter",
			modules_spacing: 10,
			
			facebook_logo_path: "images/mzsocial/facebook.jpg",
			facebook_logo_width: 30,
			facebook_logo_height: 80,
			facebook_box_width: 150,
			facebook_box_height: 80,
			facebook_hover_speed: 300,
			facebook_url: 'https://developers.facebook.com/docs/plugins/',
			facebook_code: '<div class="fb-like" data-href="" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>',
			facebook_js: '<div id="fb-root"></div><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&appId=218996558156253&version=v2.0"; fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>',
			
			twitter_logo_path: "images/mzsocial/twitter.jpg",
			twitter_logo_width: 30,
			twitter_logo_height: 80,
			twitter_box_width: 130,
			twitter_box_height: 80,
			twitter_hover_speed: 300,
			twitter_url: "https://dev.twitter.com/pages/tweet_button",
			twitter_code: '<a href="https://twitter.com/share" class="twitter-share-button" data-url="" data-lang="en" data-count="vertical">Tweet</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>',
			
			gplus_logo_path: "images/mzsocial/gplus.jpg",
			gplus_logo_width: 30,
			gplus_logo_height: 80,
			gplus_box_width: 130,
			gplus_box_height: 80,
			gplus_hover_speed: 300,
			gplus_code: '<div class="g-plusone" data-size="tall"></div><script type="text/javascript">window.___gcfg = {lang: "pl"}; (function() { var po = document.createElement("script"); po.type = "text/javascript"; po.async = true; po.src = "https://apis.google.com/js/platform.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s); })(); </script>'
		};
		
		var options = $.extend({}, defaults, options);
		
		var elements = {
			facebook: {
				container: $("<div>", {
					class: "mzsocial mzsocial_facebook"
				}),
				code: $("<div>" + options.facebook_code.replace('data-href=""', 'data-href="'+ options.facebook_url +'"') + "</div>"),
				js: $(options.facebook_js)
			},
			twitter: {
				container : $("<div>", {
					class: "mzsocial mzsocial_twitter"
				}),
				code : $("<div>" + options.twitter_code.replace('data-url=""', 'data-url="'+ options.twitter_url +'"') + "</div>")
			},
			gplus: {
				container : $("<div>", {
					class: "mzsocial mzsocial_gplus",
					title: options.position
				}),
				code : $("<div>" + options.gplus_code + "</div>")
			}
		};
		
		/* modules */
		var modules = options.modules.split(",");
		var modules_size = 0;
		var offset = 0;
		
		/* count size of all modules */
		$.each(modules, function(i, mod){
			modules_size += options[mod + "_logo_height"];
		});
		
		/* configure each element */
		$.each(modules, function(i, mod){
			
			offset += i != 0 ? options[mod + "_logo_height"] + options.modules_spacing : ((($(window).height() - options.modules_spacing) / 2) - (modules_size / 2));
			
			elements[mod].container.css({
				"top": offset + "px",
				"left": "0",
				"height": options[mod + "_box_height"] + "px",
				"width": options[mod + "_box_width"] + "px",
				"margin-left": "-" + (options[mod + "_box_width"] - options[mod + "_logo_width"]) + "px",
				"background-image": "url('"+ options[mod + "_logo_path"] +"')"
			});
			
			if (elements[mod].js)
			{
				elements[mod].js.prependTo("body");
			}
			elements[mod].container.appendTo("body");
			elements[mod].code.appendTo("div.mzsocial_" + mod);
			
			$("div.mzsocial_" + mod).hover(function() {
				$("div.mzsocial_" + mod).stop(true, false).animate({
					marginLeft: "0px"
				}, options[mod + "_hover_speed"]);
			}, function() {
				$("div.mzsocial_" + mod).animate({
					marginLeft: "-" + (options[mod + "_box_width"] - options[mod + "_logo_width"]) + "px"
				}, options[mod + "_hover_speed"]);
			});
			
		});
		
	};
}(jQuery));