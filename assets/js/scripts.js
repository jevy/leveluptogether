
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});	
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch("assets/img/backgrounds/1.jpg");
    $('.how-it-works-container').backstretch("assets/img/backgrounds/1.jpg");
    $('.call-to-action-container').backstretch("assets/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    
    /*
        Wow
    */
    new WOW().init();
    
	/*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});
	
	/*
	    Contact form (original)
	*/
	/*$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	});
	$('.contact-form form').submit(function(e) {
		e.preventDefault();
	    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	    var postdata = $('.contact-form form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.emailMessage != '') {
	                $('.contact-form form .contact-email').addClass('contact-error');
	            }
	            if(json.subjectMessage != '') {
	                $('.contact-form form .contact-subject').addClass('contact-error');
	            }
	            if(json.messageMessage != '') {
	                $('.contact-form form textarea').addClass('contact-error');
	            }
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
	                $('.contact-form form').fadeOut('fast', function() {
	                    $('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	                    // reload background
	    				$('.top-content').backstretch("resize");
	                });
	            }
	        }
	    });
	});*/

	/*
        Subscription form (Mailchimp)
    */  
    $('.subscribe form').submit(function(e) {
        e.preventDefault();
        var postdata = $('.subscribe form').serialize();
        $.ajax({
            type: 'POST',
            url: '//quickjack.us2.list-manage.com/subscribe/post-json?u=5a9c805af5eb623a67d39e8dd&amp;id=8e0fb2ee17&c=?',
            data: postdata,
            dataType: 'jsonp',
            success: function(data) {
                if(data['result'] != "success") {
                    var index = -1;
                    var msg;

                    try {
                        var parts = data['msg'].split(' - ', 2);
                        if (parts[1]==undefined){
                            msg = data['msg'];
                        } else {
                            i = parseInt(parts[0]);
                            if (i.toString() == parts[0]){
                                index = parts[0];
                                msg = parts[1];
                            } else {
                                index = -1;
                                msg = data['msg'];
                            }
                        }
                    } catch(e) {
                        index = -1;
                        msg = data['msg'];
                    }

                    try {
                    		console.debug('ERROR:' + index);
                    		console.debug(data);
                        switch(parseInt(index)) {
                            case 0:
                                if (msg == "Please enter a value") msg = "Please enter your email address";
                                break;
                            case 1:
                                if (msg == "Please enter a value") msg = "Please enter your first name";
                                break;
                            case 2:
                            		if (msg == "Please enter a value") msg = 'You must choose a value from the "What do you do" dropdown.';
                            		break;
                            case 2:
                            		if (msg == "Please enter a value") msg = 'You must choose a value from the "Average monthly take home revenue" dropdown.';
                            		break;
                            default:
                               	break;
                        }
                    } catch (e) {
                        msg = data['msg'];
                    }

                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(msg);
                    $('.error-message').fadeIn('fast', function(){
                        $('.subscribe-shake').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).removeClass('animated shake');
                        });
                    });
                }
                else {
                    $('.error-message').hide();
                    $('.success-message').hide();
                    $('.subscribe form').hide();
                    $('.success-message').html(data['msg']);
                    $('.success-message').fadeIn('fast', function(){
                        $('.top-content').backstretch("resize");
                    });
                }
            }
        });
    });
	
});


jQuery(window).load(function() {
	
	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");
	
	/*
		Hidden images
	*/
	$(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");
	
	/*
		Tooltipster
	*/
	$('#revenue-tooltip').tooltipster({
		content: $('<span>It\'s important to be put into a team who are at your same level of business growth. This is a very rough indicator. </span>'),
		trigger: 'click',
		maxWidth: '300',
		timer: 5000,
		theme: 'tooltipster-shadow'
	});


});

