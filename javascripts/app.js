jQuery(document).ready(function ($) {

    function htmlentities(input) {
        
        input = input.replace(/</g, '&lt;');
        input = input.replace(/>/g, '&gt;');

        return input;

    }

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

                // Copy XML input into result div
                var xml = htmlentities($("#xml_input").val());

                // Highlight query results
                for(var i = 0 ; i < response.length ; i++) {

                    var regex = new RegExp('(' + htmlentities(response[i]) + ')', 'g');
                    xml = xml.replace(regex, '<span class="highlight">$1</span>', xml);
                }
                
                $("#result").html(xml);
            }
        });

    });

});
