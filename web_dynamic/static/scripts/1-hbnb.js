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
});
