
$(function() {
	var stats = new Stats(),
			$numAtTable = $('#num-at-table'),
			$numPosition = $('#position'),
			$raiseAmount = $('#raise-amount'),
			$actionQueue = $('#action-queue'),
			$vpip = $('#vpip'),
			$pfr = $('#pfr'),
			preFlopAction = [],
			cards = [];

	stats.init([]);

	var fb = new Firebase("https://torid-fire-1414.firebaseio.com/" + name)

	var updateNums = function() {
		$numAtTable.html(stats.numAtTable);
		$numPosition.html(stats.numPosition);
	};

	var updateStats = function() {
		$vpip.html(stats.vpip());
		$pfr.html(stats.pfr());
	};

	//start game
	$('#start').click(function(e) {
		stats.numAtTable = parseInt($('#table-num').val(), 10);
		stats.numPosition = parseInt($('#position-num').val(), 10);

		updateNums();

		$('#start-wrapper').hide();
		$('#game-wrapper').show();
	});

	//increment counters
	$('.counter').click(function(e) {
		var $target = $(e.target);

		if ($target.hasClass('up')) {
			if ($target.hasClass('ppl')) {
				stats.numAtTable++;
			} else {
				stats.incrementPosition();
			}
		} else {
			if ($target.hasClass('ppl')) {
				stats.numAtTable--;
			} else {
				stats.decrementPosition();
			}
		}

		updateNums();
	});

	var addCard = function(n, s) {
		var num,
				suit;

		switch(n) {
			case "J":
				num = 11;
				break;
			case "Q":
				num = 12;
				break;
			case "K":
				num = 13;
				break;
			case "A":
				num = 1;
				break;
			default:
				num = parseInt(n, 10);
		}

		switch(s) {
			case "♠":
				suit = 1;
				break;
			case "♣": 
				suit = 2;
				break;
			case "♦":
				suit = 3;
				break;
			default:
				suit = 4;
		}

		cards.push({
			rank: num,
			suit: suit
		});
	};

	$('#actions button').click(function(e) {
		var action = $(e.target).attr('id');
		if (cards.length === 0) {
			addCard($('input[name="num-1"]:checked').val(), $('input[name="suit-1"]:checked').val());
			addCard($('input[name="num-2"]:checked').val(), $('input[name="suit-2"]:checked').val());
		}

		//TODO: add for other player as well
		if (action === "call" || action === "fold") {
			preFlopAction.push({
				type: action,
				is_player: true
			});
			$actionQueue.html($actionQueue.html()+"<p>" + action + "</p>")
		} else {
			var amount = parseInt($raiseAmount.val(), 10);
			preFlopAction.push({
				type: action,
				amount: amount,
				is_player: true
			});
			$actionQueue.html($actionQueue.html()+"<p>" + action + " " + amount + "</p>")
		}
	});

	$('#end-hand').click(function(e) {
		var hand = {
			hand: cards,
			position: stats.numPosition,
			pre_flop_action: preFlopAction
		};

		fb.push(hand);

		stats.incrementPosition();
		updateNums();

		preFlopAction = [];
		cards = [];

		//TODO: update stats
		$actionQueue.html("");
	});

	
	//happens when something new gets added
	fb.on('child_added', function(snapshot) {
		stats.update(snapshot.val());
		updateStats();
	});
});
