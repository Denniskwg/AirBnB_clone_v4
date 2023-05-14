const $ = window.$;
$(document).ready(function () {
  const checkboxes = $('input[type="checkbox"]');
  const list = {};
  const h4 = $('.amenities h4');
  let id = "";
  checkboxes.change(function () {
    if ($(this).is(':checked')) {
      id = $(this).data('id');
      list[id] = $(this).data('name');
    } else {
      delete list[id];
    }
    let length = Object.keys(list).length;
    if (length === 0) {
      h4.text('\u00A0');
    }
    let count = 0;
    h4.text('\u00A0');
    for (let key in list) {
      h4.append(list[key]);
      if (count != length - 1) {
        h4.append(' ,');
      }
      count++;
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    headers: {"Content-Type": "application/json"},
    data: JSON.stringify({}),
    success: function (response) {
      const placesDiv = $('.places');
      $.each(response, function(index, item) {
	const article = $('<article>');
	const titleBox = $('<div>').addClass('title_box');
	titleBox.append($('<h2>').text(item.name));
	titleBox.append($('<div>').addClass('price_by_night').text('$' + item.price_by_night));
	const information = $('<div>').addClass('information');
	information.append($('<div>').addClass('max_guest').text(item.max_guest + ' Guest' + (item.max_guest != 1 ? 's' : '')));
	information.append($('<div>').addClass('number_rooms').text(item.number_rooms + ' Bedroom' + (item.number_rooms != 1 ? 's' : '')));
	information.append($('<div>').addClass('number_bathrooms').text(item.number_bathrooms + ' Bathroom' + (item.number_bathrooms != 1 ? 's' : '')));
	const description = $('<div>').addClass('description').html(item.description);
	article.append(titleBox);
	article.append(information);
	article.append(description);
	placesDiv.append(article);
      });
    },
    error: function (error) {
      console.log(error);
    }
  });

  $('button').on('click', function () {
    const placesDiv = $('.places');
    const arr = [];
    console.log(list);
    for (let key in list) {
      arr.push(list[key]);
    }
    console.log(arr);
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      headers: {"Content-Type": "application/json"},
      data: JSON.stringify({amenities: arr}),
      success: function (response) {
	console.log(response);
        const placesDiv = $('.places');
	placesDiv.html('');
	$.each(response, function(index, item) {
          console.log(item);
	  const article = $('<article>');
	  const titleBox = $('<div>').addClass('title_box');
          titleBox.append($('<h2>').text(item.name));
	  titleBox.append($('<div>').addClass('price_by_night').text('$' + item.price_by_night));
	  const information = $('<div>').addClass('information');
	  information.append($('<div>').addClass('max_guest').text(item.max_guest + ' Guest' + (item.max_guest != 1 ? 's' : '')));
	  information.append($('<div>').addClass('number_rooms').text(item.number_rooms + ' Bedroom' + (item.number_rooms != 1 ? 's' : '')));
          information.append($('<div>').addClass('number_bathrooms').text(item.number_bathrooms + ' Bathroom' + (item.number_bathrooms != 1 ? 's' : '')));
	  const description = $('<div>').addClass('description').html(item.description);
	  article.append(titleBox);
	  article.append(information);
          article.append(description);
	  placesDiv.append(article);
	  });
        },
	error: function (error) {
	  console.log(error);
	}
    });
  });
});
