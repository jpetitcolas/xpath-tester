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
			$('#raw-result').text(data.rawResults);
		}).fail(function(jqXHR, textStatus)	{
			alert("Request failed: " + textStatus);
		});
	});
});
