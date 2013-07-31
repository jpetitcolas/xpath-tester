jQuery(document).ready(function($)
{
	$("#xpath_form").submit(function(e)
	{
		e.preventDefault();
		var that = this;
		$("#result, #result-count, #raw-result").empty().css(
		{
			backgroundColor: '#FFFF99'
		});
		var request = $.ajax(
		{
			url: that.action,
			type: "POST",
			data: $(that).serialize(),
			dataType: "json",
		});
		request.done(function(data)
		{
			$("#result").html(data.output).animate(
			{
				backgroundColor: '#FFFFFF'
			}, 2000);
			$('#result-count').text(data.numberResults).css('background-color', '#FFFF99').animate(
			{
				backgroundColor: '#FFFFFF'
			}, 2000);
			$('#raw-result').text(data.rawResults).css('background-color', '#FFFF99').animate(
			{
				backgroundColor: '#FFFFFF'
			}, 2000);
		});
		request.fail(function(jqXHR, textStatus)
		{
			alert("Request failed: " + textStatus);
		});
	});
});
