(function(a){a.fn.tweet=function(b){function d(a){return Date.parse(a.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,"$1,$2$4$3"))}function e(a){var b=arguments.length>1?arguments[1]:new Date,c=parseInt((b.getTime()-a)/1e3,10),d="";return c<60?d=c+" seconds ago":c<120?d="a minute ago":c<2700?d=parseInt(c/60,10).toString()+" minutes ago":c<7200?d="an hour ago":c<86400?d=""+parseInt(c/3600,10).toString()+" hours ago":c<172800?d="a day ago":d=parseInt(c/86400,10).toString()+" days ago","about "+d}function f(){var a="https:"==document.location.protocol?"https:":"http:",b=c.fetch===null?c.count:c.fetch;if(c.list)return a+"//"+c.twitter_api_url+"/1/"+c.username[0]+"/lists/"+c.list+"/statuses.json?per_page="+b+"&callback=?";if(c.favorites)return a+"//"+c.twitter_api_url+"/favorites/"+c.username[0]+".json?count="+c.count+"&callback=?";if(c.query===null&&c.username.length==1)return a+"//"+c.twitter_api_url+"/1/statuses/user_timeline.json?screen_name="+c.username[0]+"&count="+b+(c.retweets?"&include_rts=1":"")+"&callback=?";var d=c.query||"from:"+c.username.join(" OR from:");return a+"//"+c.twitter_search_url+"/search.json?&q="+encodeURIComponent(d)+"&rpp="+b+"&callback=?"}var c=a.extend({username:null,list:null,favorites:!1,query:null,avatar_size:null,count:3,fetch:null,retweets:!0,intro_text:null,outro_text:null,join_text:null,auto_join_text_default:"i said,",auto_join_text_ed:"i",auto_join_text_ing:"i am",auto_join_text_reply:"i replied to",auto_join_text_url:"i was looking at",loading_text:null,refresh_interval:null,twitter_url:"twitter.com",twitter_api_url:"api.twitter.com",twitter_search_url:"search.twitter.com",template:"{avatar}{time}{join}{text}",comparator:function(a,b){return b.tweet_time-a.tweet_time},filter:function(a){return!0}},b);return a.fn.extend({linkUrl:function(){var b=[],c=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?Â«Â»â€œâ€â€˜â€™]))/gi;return this.each(function(){b.push(this.replace(c,function(a){var b=/^[a-z]+:/i.test(a)?a:"http://"+a;return'<a href="'+b+'">'+a+"</a>"}))}),a(b)},linkUser:function(){var b=[],d=/[\@]+(\w+)/gi;return this.each(function(){b.push(this.replace(d,'@<a href="http://'+c.twitter_url+'/$1">$1</a>'))}),a(b)},linkHash:function(){var b=[],d=/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,e=c.username&&c.username.length==1?"&from="+c.username.join("%2BOR%2B"):"";return this.each(function(){b.push(this.replace(d,' <a href="http://'+c.twitter_search_url+"/search?q=&tag=$1&lang=all"+e+'">#$1</a>'))}),a(b)},capAwesome:function(){var b=[];return this.each(function(){b.push(this.replace(/\b(awesome)\b/gi,'<span class="awesome">$1</span>'))}),a(b)},capEpic:function(){var b=[];return this.each(function(){b.push(this.replace(/\b(epic)\b/gi,'<span class="epic">$1</span>'))}),a(b)},makeHeart:function(){var b=[];return this.each(function(){b.push(this.replace(/(&lt;)+[3]/gi,"<tt class='heart'>&#x2665;</tt>"))}),a(b)}}),this.each(function(b,g){var h=a('<ul class="tweet_list">').appendTo(g),i='<p class="tweet_intro">'+c.intro_text+"</p>",j='<p class="tweet_outro">'+c.outro_text+"</p>",k=a('<p class="loading">'+c.loading_text+"</p>");c.username&&typeof c.username=="string"&&(c.username=[c.username]);var l=function(a){if(typeof c.template=="string"){var b=c.template;for(var d in a){var e=a[d];b=b.replace(new RegExp("{"+d+"}","g"),e===null?"":e)}return b}return c.template(a)};c.loading_text&&a(g).append(k),a(g).bind("load",function(){a.getJSON(f(),function(b){c.loading_text&&k.remove(),c.intro_text&&h.before(i),h.empty();var f=a.map(b.results||b,function(b){var f=c.join_text;c.join_text=="auto"&&(b.text.match(/^(@([A-Za-z0-9-_]+)) .*/i)?f=c.auto_join_text_reply:b.text.match(/(^\w+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+) .*/i)?f=c.auto_join_text_url:b.text.match(/^((\w+ed)|just) .*/im)?f=c.auto_join_text_ed:b.text.match(/^(\w*ing) .*/i)?f=c.auto_join_text_ing:f=c.auto_join_text_default);var g=b.from_user||b.user.screen_name,h=b.source,i="http://"+c.twitter_url+"/"+g,j=c.avatar_size,k=b.profile_image_url||b.user.profile_image_url,l="http://"+c.twitter_url+"/"+g+"/status/"+b.id_str,m=typeof b.retweeted_status!="undefined",n=m?b.retweeted_status.user.screen_name:null,o=d(b.created_at),p=e(o),q=m?"RT @"+n+" "+b.retweeted_status.text:b.text,r=a([q]).linkUrl().linkUser().linkHash()[0],t='<a class="tweet_user" href="'+i+'">'+g+"</a>",u=c.join_text?'<span class="tweet_join"> '+f+" </span>":" ",v=j?'<a class="tweet_avatar" href="'+i+'"><img src="'+k+'" height="'+j+'" width="'+j+'" alt="'+g+'\'s avatar" title="'+g+'\'s avatar" border="0"/></a>':"",w='<span class="tweet_time"><a href="'+l+'" title="view tweet on twitter">'+p+"</a></span>",x='<span class="tweet_text"><br />'+a([r]).makeHeart().capAwesome().capEpic()[0]+"</span>";return{item:b,screen_name:g,user_url:i,avatar_size:j,avatar_url:k,source:h,tweet_url:l,tweet_time:o,tweet_relative_time:p,tweet_raw_text:q,tweet_text:r,retweet:m,retweeted_screen_name:n,user:t,join:u,avatar:v,time:w,text:x}});f=a.grep(f,c.filter).sort(c.comparator).slice(0,c.count),h.append(a.map(f,function(a){return"<li>"+l(a)+"</li>"}).join("")).children("li:first").addClass("tweet_first").end().children("li:odd").addClass("tweet_even").end().children("li:even").addClass("tweet_odd"),c.outro_text&&h.after(j),a(g).trigger("loaded").trigger(f.length===0?"empty":"full"),c.refresh_interval&&window.setTimeout(function(){a(g).trigger("load")},1e3*c.refresh_interval)})}).trigger("load")})}})(jQuery)