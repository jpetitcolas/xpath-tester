jQuery(document).ready(function ($) {

    function prepareOutput(input) {
        
        // Replace all special characters to their HTML equivalent
        input = input.replace(/</g, '&lt;');
        input = input.replace(/>/g, '&gt;');

        // Restablish highlighted span one
        input = input.replace(/&lt;span class="highlight"&gt;(.+)&lt;\/span&gt;/g, "<span class=\"highlight\">$1</span>");

        return input;

    }

    /** XPath tester **/

    $("#xpath_form").submit(function(e) {
                
        e.preventDefault();
                
        $.ajax({
            url: that.action,
            type: "POST",
            data: $(that).serialize(),
            success: function(response) {
                $("#result").html(prepareOutput(response));
            }
        });

    });

});
