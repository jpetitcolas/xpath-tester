$(document).ready(function($) {
	$("#xpath_form").submit(function(e) {
		e.preventDefault();
		var that = this;

		var request = $.ajax({
			url: that.action,
			type: "POST",
			data: $(that).serialize(),
			dataType: "json",
		}).done(function(data) {
			$("#result").html(data.output);
			$('#result-count').text(data.numberResults + " result(s) found");
		}).fail(function(jqXHR, textStatus)	{
			alert("Request failed: " + textStatus);
		});
	});
});
