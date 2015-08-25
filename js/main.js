window.onhashchange = function() {
  render();
}

function render() {
  window.scrollTo(0,0);
  $.getJSON("/config.json" + "#" + Date.now(), function(config) {
    var url = window.location.hash, idx = url.indexOf("#");
    var hash = idx != -1 ? url.substring(idx+1) : "";
    document.title = config.title;
    $(".navbar-brand")
      .html(config.title);
    if (hash === "") {
      // render homepage
      $("#content").html(
        $("<div/>", {
          id: "home",
        })
      );
      $.get(config.index + "#" + Date.now(), function(data) {


        $("#home")
          .append($("<img/>", {
            class: "feature",
            src: "//www.gravatar.com/avatar/" + md5(config.email) + "?s=" + 200 * window.devicePixelRatio
          }))
          .append(marked(data));
      });
    } else {
      $.get(hash, function(data) {
        $("#content").html(marked(data));
      });
    }
  });
}


render();

