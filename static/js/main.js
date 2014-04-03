var fb = new Firebase("https://torid-fire-1414.firebaseio.com/" + name);

$(function() {
	var stats = new Stats(),
			$numAtTable = $('#num-at-table'),
			$numPosition = $('#position');

	stats.init([]);

	var updateNums = function() {
		$numAtTable.html(stats.numAtTable);
		$numPosition.html(stats.numPosition);
	};

	$('#start').click(function(e) {
		stats.numAtTable = $('#table-num').val();
		stats.numPosition = $('#position-num').val();

		updateNums();

		$('#start-wrapper').hide();
		$('#game-wrapper').show();
	});

	$('.counter').click(function(e) {
		var $target = $(e.target);

		if ($target.hasClass('up')) {
			if ($target.hasClass('ppl')) {
				stats.numAtTable++;
			} else {
				stats.numPosition++;
			}
		} else {
			if ($target.hasClass('ppl')) {
				stats.numAtTable--;
			} else {
				stats.numPosition--;
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
