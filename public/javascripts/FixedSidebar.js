/*
 * @class   FixedSidebar
 * @author  EtienneLem
 */

var FixedSidebar = function() { this.initialize.apply(this, arguments) };
FixedSidebar.prototype = (function() { var pro = {};

  //  Contants
  var MARGIN_TOP = 25;
  
  //  Variables
  var $window = $(window), sidebar, sidebarTop, sidebarFixed, sidebarAbs, sidebarHeight, parentOffset, content, contentTop, contentHeight, min, max;
      
  //  public
  pro.initialize = function(opts) {
      initialize(); 
  };
  
  //  private
  var initialize = function()
  {
      sidebar = $('.sidebar_content');
      if ( sidebar.size() <= 0 ) return;
      
      setVariables();
      initScroll();
  }
  
  var setVariables = function()
  {
      sidebarTop    = sidebar.offset().top;
      sidebarFixed  = false;
      sidebarAbs    = false;
      sidebarHeight = sidebar.height();
      parentOffset  = sidebar.parent().offset().top;
      content       = $('.grid_12 .content');
      contentTop    = content.offset().top;
      contentHeight = content.height();
      min           = sidebarTop - MARGIN_TOP;
      max           = contentTop + contentHeight;
  };
  
  var initScroll = function()
  {
      $(window).bind('scroll', function(e){
        var scrollTop = $window.scrollTop();

        if ( scrollTop > min && scrollTop + sidebarHeight + MARGIN_TOP < max ) {
          if ( sidebarFixed ) return;
          sidebarFixed  = true;
          sidebarAbs    = false;

          sidebar.css({
            position  : 'fixed',
            top       : '25px'
          });
        } else if ( scrollTop + sidebarHeight + MARGIN_TOP >= max ) {
          if ( sidebarAbs ) return;
          sidebarAbs    = true;
          sidebarFixed  = false;

          sidebar.css({
            position  : 'absolute',
            top       : max - parentOffset - sidebarHeight + 'px'
          });
        } else {
          if ( ! sidebarFixed ) return;
          sidebarFixed  = false;
          sidebarAbs    = false;

          sidebar.css({
            position  : 'static',
            top       : '0'
          });
        }
      });
  };
  
return pro })();