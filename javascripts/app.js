$(document).ready(function($) {

	"use strict";

	var errorContainer = $('#error');

	$("#xpath_form").submit(function(e) {
		e.preventDefault();
		var that = this;

		errorContainer.hide();

		var request = $.ajax({
			url: that.action,
			type: "POST",
			data: $(that).serialize(),
			dataType: "json",
		}).done(function(data) {
			$("#result").html(data.output);
			$('#result-count').text(data.numberResults + " result(s) found");
		}).fail(function(jqXHR, textStatus)	{
			var message = "<strong>Oh snap!</strong> ";

			switch(textStatus) {
				case "parsererror":
					message += "We were unable to parse your XML. Are you sure of its syntax?";
					break;

				default:
					message += "An error occured, and the only clue is: " + textStatus + ".";
			}

			errorContainer.html(message).show();
		});
	});
});
