/**
* nama Plugin : jquery.inputCode.js
* Author : Huiralb
* github : github.com/huiralb/validate-code
*/

(function($){

  $.fn.inputCode = function(options){

    var settings = $.extend({
      required  : true,
      animation : 'Loading...',
      pathAnimation : '',
      ajax : ''
    }, options)

    var target = $(this),
        parent = target.parent()
    // setting required attribute
    if (settings.required == true) {
      $(this).attr('required', 'required')
    }
    else{
      $(this).removeAttr('required')
    }

    // animation
    var animation = ''
    if (settings.pathAnimation == ''){
      animation = settings.animation
    }
    else{
      animation = '<img src="'+settings.pathAnimation+'"/>'
    } 

    this.blur(function(){
        target.parent().find('span').remove()
        target.parent().append('<span class="loader">'+animation+'</span>')
      $.getJSON(settings.ajax, {code : target.val()}, function(data){
        target.next('.loader').remove()
        text(data, target)
      })
    })
  }

  function text(data, target){
    var success = {
      title : 'Available!',
      class : 'text-success' 
    }
    var danger = {
      title : 'Not Available!',
      class : 'text-danger' 
    }
    if (data) {
      target.closest('form').find('button[type="submit"]').attr('disabled', 'disabled')
      target.parent().find('span.check').remove()
      target.parent().append('<span class="check '+danger.class+'">'+danger.title+'</span>')
    }else{
      target.closest('form').find('button[type="submit"]').removeAttr('disabled')
      target.parent().find('span.check').remove()
      target.parent().append('<span class="check '+success.class+'">'+success.title+'</span>')
    }
  }


})(jQuery)
