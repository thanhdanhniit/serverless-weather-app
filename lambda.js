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