jQuery(document).ready(function ($) {

    /* Use this js doc for all application specific JS */

    /* TABS --------------------------------- */
    /* Remove if you don't need :) */

    function activateTab($tab) {
        var $activeTab = $tab.closest('dl').find('dd.active'),
                contentLocation = $tab.children('a').attr("href") + 'Tab';

        // Strip off the current url that IE adds
        contentLocation = contentLocation.replace(/^.+#/, '#');

        //Make Tab Active
        $activeTab.removeClass('active');
        $tab.addClass('active');

        //Show Tab Content
        $(contentLocation).closest('.tabs-content').children('li').removeClass('active').hide();
        $(contentLocation).css('display', 'block').addClass('active');
    }

    $('dl.tabs dd a').on('click.fndtn', function (event) {
        activateTab($(this).parent('dd'));
    });

    if (window.location.hash) {
        activateTab($('a[href="' + window.location.hash + '"]').parent('dd'));
        $.foundation.customForms.appendCustomMarkup();
    }

    /* ALERT BOXES ------------ */
    $(".alert-box").delegate("a.close", "click", function(event) {
        event.preventDefault();
        $(this).closest(".alert-box").fadeOut(function(event){
            $(this).remove();
        });
    });

    /* PLACEHOLDERS -------- */
    $(this).placeholder();

    /* TOOLTIPS ------------ */
    $(this).tooltips();

    /* DROPDOWN NAV ------------- */

    var lockNavBar = false;
    /* Windows Phone, sadly, does not register touch events :( */
    if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
        $('.nav-bar a.flyout-toggle').on('click.fndtn touchstart.fndtn', function(e) {
            e.preventDefault();
            var flyout = $(this).siblings('.flyout').first();
            if (lockNavBar === false) {
                $('.nav-bar .flyout').not(flyout).slideUp(500);
                flyout.slideToggle(500, function(){
                    lockNavBar = false;
                });
            }
            lockNavBar = true;
        });
        $('.nav-bar>li.has-flyout').addClass('is-touch');
    } else {
        $('.nav-bar>li.has-flyout').hover(function() {
            $(this).children('.flyout').show();
        }, function() {
            $(this).children('.flyout').hide();
        });
    }

    /* DISABLED BUTTONS ------------- */
    /* Gives elements with a class of 'disabled' a return: false; */
    $('.button.disabled').on('click.fndtn', function (event) {
        event.preventDefault();
    });
    

    /* CUSTOM FORMS */
    $.foundation.customForms.appendCustomMarkup();

    /** XPath tester **/

    $("#xpath_form").submit(function(e) {
                
        e.preventDefault();

        var that = this;
                
        $.ajax({
            url: that.action,
            type: "POST",
            data: $(that).serialize(),
            dataType: "json",
            success: function(response) {

                var xml = $("#xml_input").val();
                $("#result").html(xml);

                console.log(response);
            }
        });

    });

});
