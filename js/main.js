setTimeout(function () {
  window.scrollTo(0, 1);
}, 1000);

function CounterView(element) {
    this.element = element;
    this.counter = element.find('input');
    this.setValue(20);

    var that = this;
    element.find('.plus, .minus').hammer().bind('tap doubletap hold', function(){
        if ($(this).is('.plus')) {
            that.setValue(that.getValue() + 1);
        } else {
            that.setValue(that.getValue() - 1);
        }
    });
    this.counter.bind('click', function(){
        $(this).select();
    });
}

CounterView.prototype.setValue = function(newValue) {
    this.counter.val(newValue);
};

CounterView.prototype.getValue = function() {
    return parseInt(this.counter.val());
}

CounterView.prototype.removeFlip = function() {
    this.counter.removeClass('flip');
}

CounterView.prototype.addFlip = function() {
    this.counter.addClass('flip');
}

CounterView.prototype.toggleFlip = function () {
    this.counter.toggleClass('flip');
}

CounterView.prototype.blink = function(time) {
    if (time <= 0) {
        this.removeFlip();
        return;
    }
    this.toggleFlip();
    var that = this;
    setTimeout(function(){ that.blink(time - 150)}, 150);
}

function switchFlip(time, element, element2) {
    if (time >= 800) {
        var winner = element2;
        if (Math.random(1) > 0.5) {
            element2.removeFlip();
            element.addFlip();
            winner = element;
        }
        setTimeout(function(){winner.blink(1000)}, 500);
        return;
    }
    element.addFlip();
    element2.removeFlip();
    setTimeout(switchFlip, time, time * 0.2 + time, element2, element);
}


$(function(){
    var counters = $('.counter');
    var topCounterView = new CounterView($(counters[0]));
    var bottomCounterView = new CounterView($(counters[1]));

    $('#reset').hammer().bind('doubletap', function() {
        topCounterView.setValue(20);
        bottomCounterView.setValue(20);
    });

    $('#flip').hammer().bind('doubletap', function() {
        switchFlip(100, topCounterView, bottomCounterView);
    });
});
