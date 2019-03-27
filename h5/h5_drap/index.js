document.body.onload = function(){
    //Apply some basic styles 
    var css = ".draggable{cursor: move;display: inline-block;} .text{display: inline-block; cursor: move;} .text:focus{cursor: auto;} .text-wrapper{width: 100%;position: relative;} .wrap{position: absolute;margin: auto;top: 0;bottom: 0;left: 0;right: 0;}';";
    var style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    // Select all elements with the 'draggable' class and stores them in the 'elements' variable
    var elements = document.querySelectorAll(".draggable");

    // Variable to store z index of last moved element
    z = 1;

    // Stores the last edited element
    var tgt;

    var clickTimer = null;

    // Adds event listeners to every element that has the draggable class
    for(var i = 0; i < elements.length; i++){
      elements[i].addEventListener('mousedown', drag);
        elements[i].addEventListener('touchstart', handleTouch);
        b = elements[i].getBoundingClientRect();
        // Calculate the initial offset of the element from the top left of the page and stores it as a property of the element
        elements[i].initialOffsetX = b.left + window.scrollX;
        elements[i].initialOffsetY = b.top + window.scrollY;
        elements[i].x = b.left;
        elements[i].y = b.top;
        elements[i].style.cursor = "move";
      document.addEventListener('mouseup', end);
        document.addEventListener('touchend', end);
    };

    function handleTouch(evt){
        evt.preventDefault();
        drag(evt);
        if (clickTimer == null) {
            clickTimer = setTimeout(function () {
                clickTimer = null;
            }, 500)
        } else {
            clearTimeout(clickTimer);
            clickTimer = null;
            editText(evt);
        }
    }

    // Main logic, called when the mouse is clicked
    function drag(event) {
          // Prevent default behavior and increase z index to bring the new element to the front
          event.preventDefault();
          moving = true;
          z = z+1; 

          // Identify which element was clicked and store in the 'tgt' element, then get position properties of it
          tgt = event.target;
          b = tgt.getBoundingClientRect();
          var x = b.left + window.scrollX;
          var y = b.top + window.scrollY;
          offsetX = event.pageX || event.changedTouches[0].pageX;
          offsetY = event.pageY || event.changedTouches[0].pageY;

          document.addEventListener('mousemove',function(e) {
            // If the page has been clicked and an element is being dragged
            if(moving === true){
              // Calculate the new position of the element, relative to the top left of the page
              var dx = e.pageX - offsetX + x - tgt.initialOffsetX;
              var dy = e.pageY - offsetY + y - tgt.initialOffsetY;
              // Apply the styles to the element
              var position = 'transform: translate('+dx+'px, '+dy+'px);z-index:'+z+';';
              tgt.setAttribute('style', position);
            };  
          });
          document.addEventListener('touchmove',function(e) {
              var touches = e.changedTouches;
            // If the page has been clicked and an element is being dragged
            if(moving === true){
              for(let i = 0; i < touches.length; i++){
                  // Calculate the new position of the element, relative to the top left of the page
                  var dx = touches[i].pageX - offsetX + x - tgt.initialOffsetX;
                  var dy = touches[i].pageY - offsetY + y - tgt.initialOffsetY;
                  // Apply the styles to the element
                  var position = 'transform: translate('+dx+'px, '+dy+'px);z-index:'+z+';';
                  tgt.setAttribute('style', position);
              }
            };  
          });
      
    };

    function end(evt) {
      // When the mouse is lifted up, set moving to false
      moving = false;
    };

    function outerHeight(el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);

      height += parseInt(style.marginTop) + parseInt(style.marginBottom);
      return height;
    }
}