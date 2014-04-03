var Stats = function() { };

Stats.prototype.init = function(hands) {
  this.hands = hands;
	this.numAtTable = 0;
	this.numPosition = 0;
};

Stats.prototype.update = function(hand) {
  this.hands.push(hand);
};

Stats.prototype.incrementPosition = function() {
	if (this.numPosition < this.numAtTable) {
		this.numPosition++;
	} else {
		this.numPosition = 1;
	}
}

Stats.prototype.decrementPosition = function() {
	if (this.numPosition > 1) {
		this.numPosition--;
	} else {
		this.numPosition = this.numAtTable;
	}
}

/* General stats function. predicate2 determines whether or not the hand even qualifies, and
 * predicate2 determines whether or not the hand counts towards the stats. */
Stats.statsFunction = function(predicate1, predicate2) {
	return function() {
    var matches = 0;
    var total = 0;

    for (var i = 0; i < this.hands.length; i++) {
      if (predicate1(this.hands[i])) {
        matches += 1;
      }
      if (predicate2(this.hands[i])) {
        total += 1;
      }
    }
    return matches / total;
	};
};

Stats.containsOneAction = function(predicate) {
  return function(hand) {
    for (var i = 0; i < hand.pre_flop_action.length; i++) {
      var action = hand.pre_flop_action[i];
      if (predicate(action)) {
        return true;
      }
    }
    return false;
  };
};

Stats.allHands = function(hand) { return true; }
Stats.isPFR = Stats.containsOneAction(function(action) {
  return action.type == "raise" && action.is_player;
});
Stats.isVpip = Stats.containsOneAction(function(action) {
  return (action.type == "raise" || action.type == "call") && action.is_player;
});
Stats.prototype.vpip = Stats.statsFunction(Stats.isVpip, Stats.allHands);
Stats.prototype.pfr = Stats.statsFunction(Stats.isPFR, Stats.allHands);

