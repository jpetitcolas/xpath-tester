(function() {

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

})();
