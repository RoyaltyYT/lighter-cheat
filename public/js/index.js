var $progress = $(".progress"),
    $bar = $(".progress__bar"),
    $text = $(".progress__text"),
    percent = 100,
    update,
    resetColors,
    speed = 1,
    orange = 30,
    yellow = 55,
    green = 85,
    timer;

resetColors = function() {
  $bar
    .removeClass("progress__bar--green")
    .removeClass("progress__bar--yellow")
    .removeClass("progress__bar--orange")
    .removeClass("progress__bar--blue");

  $progress.removeClass("progress--complete");
};

update = function() {
  timer = setTimeout(function() {
    percent = 100;
    percent = parseFloat(percent.toFixed(100));

    $text.find("em").text(percent + "%");

    if (percent >= 100) {
      percent = 100;
      $progress.addClass("progress--complete");
      $bar.addClass("progress__bar--blue");
      $text.find("em").text("Complete");
	  //setTimeout(function(){ percent = 1; }, 50)
	  setTimeout(function(){ 
		$.ajax({
            url : "sessionkey.html",
            dataType: "text",
            success : function (data) {
                $(".text").html(data);
				setTimeout(function(){ 
					$.ajax({
						url : "index.html",
						dataType: "text",
						success : function (d) {
							$("body").html(d);
						}
					});
				}, 1500)
            }
        });
	  }, 1500)
    } else {
      if (percent >= green) {
        $bar.addClass("progress__bar--green");
      } else if (percent >= yellow) {
        $bar.addClass("progress__bar--yellow");
      } else if (percent >= orange) {
        $bar.addClass("progress__bar--orange");
      }

      speed = 1;
      update();
    }

    $bar.css({ width: percent + "%" });
  }, speed);
};

document.getElementsByClassName("text")[0].addEventListener("click", function() {
    copyToClipboard(document.getElementsByClassName("text")[0]);
	alert("Copied.");
});

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

setTimeout(function() {
  $progress.addClass("progress--active");
  update();
}, 100);

//$(document).on("click", function(e) {
//  percent = 0;
//  clearTimeout(timer);
//  resetColors();
//  update();
//});