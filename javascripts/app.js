jQuery(document).ready(function ($) {

    /** XPath tester **/
    $("#xpath_form").submit(function(e) {
                
        e.preventDefault();
                
        var that = this;

        $.ajax({
            url: that.action,
            type: "POST",
            data: $(that).serialize(),
            success: function(response) {
                $("#result").html(response);
            }
        });

    });

});
