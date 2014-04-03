var fb = new Firebase("https://torid-fire-1414.firebaseio.com/" + name);

$(function() {
	var numAtTable = 0,
			numPosition = 0,
			$numAtTable = $('#num-at-table'),
			$numPosition = $('#position');

	var updateNums = function() {
		$numAtTable.html(numAtTable);
		$numPosition.html(numPosition);
		console.log(numAtTable);
		console.log(numPosition);
	};

	$('#start').click(function(e) {
		numAtTable = $('#table-num').val();
		numPosition = $('#position-num').val();

		updateNums();

		$('#start-wrapper').hide();
		$('#game-wrapper').show();
	});

	$('.counter').click(function(e) {
		var $target = $(e.target);

		if ($target.hasClass('up')) {
			if ($target.hasClass('ppl')) {
				numAtTable++;
			} else {
				numPosition++;
			}
		} else {
			if ($target.hasClass('ppl')) {
				numAtTable--;
			} else {
				numPosition--;
			}
		}

		updateNums();
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
