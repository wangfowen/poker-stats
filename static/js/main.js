$(function() {
	var fb = new Firebase("https://torid-fire-1414.firebaseio.com/" + name);

	$('#test').click(function(e) {
		fb.push({action: "derp"});
	});

	//happens when something new gets added
	fb.on('child_added', function(snapshot) {
		console.log(snapshot.val());
	});

	//happens when page loads. populate page
	fb.on('value', function(snapshot) {
		console.log(snapshot);
	});

});
