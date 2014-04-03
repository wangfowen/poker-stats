var fb = new Firebase("https://torid-fire-1414.firebaseio.com/" + name);

$(function() {
	var numAtTable = 0,
			numPosition = 0,
			$numAtTable = $('#num-at-table'),
			$numPosition = $('#position');

	$('#start').click(function(e) {
		numAtTable = $('#table-num').val();
		numPosition = $('#position-num').val();

		$numAtTable.html(numAtTable);
		$numPosition.html(numPosition);

		$('#start-wrapper').hide();
		$('#game-wrapper').show();
	});

	$('.counter').click(function(e) {
	});

	//fb.push({action: "derp"});
//happens when something new gets added
fb.on('child_added', function(snapshot) {
	console.log(snapshot.val());
});

//happens when page loads. populate stats data 
fb.on('value', function(snapshot) {
	console.log(snapshot);
});
});
