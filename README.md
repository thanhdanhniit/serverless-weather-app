# serverless-weather-app
The weather app, we will build as a static website with serverless architect using AWS S3, API Gateway, Lambda (Nodejs).

![alt text](https://s3.us-east-2.amazonaws.com/hienkdweb/picture/architect.png)

# Step 1: Create lambda function.
In this tutorial, we use Node.js for lambda function with S3 object read-only permissions to access data.

![alt text](https://s3.us-east-2.amazonaws.com/hienkdweb/picture/create-function.PNG)

The lambda function will be created with example "hello world" template code. We replace it by own business code; This block code will access data in S3 then return to client. (Note: replace your S3 bucket)

```
var aws = require('aws-sdk');
var s3 = new aws.S3({apiVersion: '2006-03-01'});
exports.handler = (event, context, callback) => {
	s3.getObject({Bucket: 'your-bucket', Key: 'data.json'}, function(err, data) {
		if (err) {
			console.log("Error getting file: " + err);            
		} else {			
			callback(null, data.Body.toString('ascii'));
		}			
	});    
};
```

# Step 2: Create API Gateway
API Gateway is used as public API service for your lambda function. This API will be consumed by your static website.

![alt text](https://s3.us-east-2.amazonaws.com/hienkdweb/picture/create+api.PNG)

Next, we create new method (GET) for new API. Action -> Create Method -> GET

Integration Type: Choose Lambda Function

Lambda: Choose region and lambda function name that was created in Step 1.

![alt text](https://s3.us-east-2.amazonaws.com/hienkdweb/picture/create+method.PNG)

# Step 3: Host a Static Website
In this step, we will host a static website with S3; This web will use API in Step 2 so you must replace API url in index.html. Open index.html and replace var API_URL
```
var API_URL = 'https://h1nd9s7ebd.execute-api.us-east-2.amazonaws.com/prod/nodeDemo';
```
Next, upload file index.html to S3 bucket with public access permission.
![alt text](https://s3.us-east-2.amazonaws.com/hienkdweb/picture/upload+s3.PNG)

Next, configure your bucket as a static website. S3 > your-bucket > Properties > Static Website Hosting.
![alt text](https://s3.us-east-2.amazonaws.com/hienkdweb/picture/host+static+website.PNG)

Finnaly, Open endpoint and say hello to your website. Good luck!



