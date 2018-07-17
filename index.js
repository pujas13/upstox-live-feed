var kafka = require('kafka-node'),
	Producer = kafka.Producer,
	KeyedMessage = kafka.KeyedMessage,
	client = new kafka.Client(),
	producer = new Producer(client);
	
 
 var Upstox = require("upstox");
 var upstox = new Upstox("//your api key", "//api-secret-key");

 var loginUrl = upstox.getLoginUri("http://upstox.com:3000");
 
 var params = {
   "apiSecret" : "//api secret key",
    "code" : "//code",
    "redirect_uri" : "//your redirect uri",
	"grant_type" : "authorization_code"
 };
 
 producer.on('ready', function(){
	 
upstox.getAccessToken(params)
 .then(function(response) {
	  	accessToken = response.access_token;
		upstox.setToken(accessToken);
        start();
    })
 .catch(function(err) {
        console.log(err);
    });

 function start() {
    // Fetch holdings.
    // You can have other api calls here.
	// var loginUrl = upstox.getLoginUri("http://upstox.com:3000");
    //console.log("**************** loginUri ***********" + loginUrl);
	
	 upstox.getMasterContract({exchange: "nse_eq", symbol: "reliance"})
      .then(function(response) {
          console.log(response);
      })
      .catch(function(err) {
          console.log(err);
      });
	  
	  upstox.subscribeFeed({
		"exchange": "nse_eq",
		"symbol": "reliance",
		"type": "full"
})
.then(function (response) {
	console.log(response);
})
.catch(function(error){
    console.log(error);
});
	  
	 // Web socket
        upstox.connectSocket()
        .then(() => {
            upstox.on("liveFeed", function(message) {
                //message for live feed	var 
				var data = JSON.stringify(message);
				var km = new KeyedMessage(Math.floor(Math.random() * 10000), data);
				var payload = [{
					topic : 'live-feed',
					messages: km
				}];
				
				producer.send(payload, function(error, result) {
					console.info('Sent payload to Kafka: ', payload);
						if (error) {
							console.error(error);
						} else {
							console.log('result: ', result)
						}
				});
            });
            
            upstox.on("error", function(error) {
                //error listener
                console.log("error", message);
            });
        }).catch(function(error) {
        console.log( "******** " , error);
    });
}})