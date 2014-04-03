//happens when something new gets added
fb.on('child_added', function(snapshot) {
	console.log(snapshot.val());
});

//happens when page loads. populate stats data 
fb.on('value', function(snapshot) {
	console.log(snapshot);
});
