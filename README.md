# upstox-live-feed
this nodeJS script is written to get the live feed from upstox

Don't forget to install kafka-node, upstox

To install upstox:
  npm install --save upstox

To install kafka-node
  npm install --save kafka-node

index.js needs the api-key, api secret key, redirect uri, and the code 
The api-key, api-secret-key and redirect uri can be picked up from your application info
To fetch the code, you need to go to the folloeing url:
  https://api.upstox.com/index/dialog/authorize?apiKey=*yourapikey*&redirect_uri=*yourredirecturi*&response_type=code
You will get the code in the url itself, copy and paste the same in the script.
