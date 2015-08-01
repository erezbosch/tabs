$.Tabs = function (el) {
  this.$el = $(el); //li
  this.$contentTabs = $(this.$el.attr("data-content-tabs")); //parent div
  this.$activeTab = $('div.active'); //div
  this.$el.on("click", "a", this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (e) {
  if($('.transitioning').length > 0) {return};
  var $target = $(e.currentTarget);
  $('.active').removeClass('active')
              .addClass("transitioning")
              .one("transitionend", function (e) {
                $(e.currentTarget).removeClass("transitioning");
                var $div = $($target.attr("for")).addClass("active");
                $div.addClass("transitioning");
                setTimeout(function () {
                  $('.transitioning').removeClass("transitioning");
                }, 0);
                $target.addClass("active");
                this.$activeTab = $div;
              });
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  })
}
