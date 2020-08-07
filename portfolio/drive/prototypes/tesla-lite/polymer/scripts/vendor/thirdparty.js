/**
 * @class Utils
 * Open Source Third Party utilities.
 * @extends GOOQuantum.Utils
 * @singleton
 */
(function(ThirdParty) {

  /**
   * The following code is copied from StackOverflow answer available here: http://stackoverflow.com/a/9242075.
   * 
   */

  var Point = function(x, y) { 
    return { x: x, y: y }; 
  };

  var isLeftOf = function(pt1, pt2) { 
  	return pt1.x < pt2.x;
  };

  var isAbove  = function(pt1, pt2) {
  	return pt1.y < pt2.y;
  };

  var centerOf = function(rect) {
    return Point(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  };

  var gradient = function(pt1, pt2) {
    return (pt2.y - pt1.y) / (pt2.x - pt1.x);
  };    
  
  var aspectRatio = function(rect) {
  	return rect.height / rect.width;
  };

  ThirdParty.pointOnEdge = function(fromRect, toRect) {
    var centerA = centerOf(fromRect),
        centerB = centerOf(toRect),
        // calculate the gradient from rectA to rectB
        gradA2B = gradient(centerA, centerB),
        // grab the aspectRatio of rectA
        // as we want any dimensions to work with the script
        aspectA = aspectRatio(fromRect),

        // grab the half values, as they are used for the additional point
        h05 = fromRect.width / 2,
        w05 = fromRect.height / 2,

        // the norm is the normalized gradient honoring the aspect Ratio of rectA
        normA2B = Math.abs(gradA2B / aspectA),

        // the additional point
        add = Point(
          // when the rectA is left of rectB we move right, else left
          (isLeftOf(centerA, centerB) ? 1 : -1) * h05,
          // when the rectA is below
          (isAbove(centerA, centerB)  ? 1 : -1) * w05
        );

    // norm values are absolute, thus we can compare whether they are
    // greater or less than 1
    if (normA2B < 1) {
      // when they are less then 1 multiply the y component with the norm
      add.y *= normA2B;
    } else {
      // otherwise divide the x component by the norm
      add.x /= normA2B;
    }
    // this way we will stay on the edge with at least one component of the result
    // while the other component is shifted towards the center
    return Point(centerA.x + add.x, centerA.y + add.y);
  };

}(window.ThirdParty = window.ThirdParty || {}));
