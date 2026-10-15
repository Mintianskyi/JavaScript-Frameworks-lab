const classNames = {
  TODO_ITEM: 'todo-container list-group-item d-flex align-items-center justify-content-between border-0 px-1 py-3 border-bottom',
  TODO_CHECKBOX: 'todo-checkbox form-check-input me-3 mt-0 cursor-pointer',
  TODO_TEXT: 'todo-text flex-grow-1 text-break me-2',
  TODO_DELETE: 'todo-delete btn btn-sm btn-outline-danger border-0 rounded-2',
};

function updateCounts() {
  const $list =$('#todo-list');
  const $items =$list.children('.todo-container');
  const $uncheckedItems =$items.filter(function () {
    return !$(this).find('.todo-checkbox').is(':checked');
  });

  $('#item-count').text($items.length);
  $('#unchecked-count').text($uncheckedItems.length);

  let totalPrice = 0;
  let remainingPrice = 0;

  $items.each(function () {
    const price = $(this).data('price') || 0;
    totalPrice += price;
    if (!$(this).find('.todo-checkbox').is(':checked')) {
      remainingPrice += price;
    }
  });

  if ($('#total-price').length) {
    $('#total-price').text(totalPrice.toFixed(2));
  }
  if ($('#remaining-price').length) {
    $('#remaining-price').text(remainingPrice.toFixed(2));
  }
}

function addNewTodo() {
  const $todoInput =$('#todo-input');
  const $priceInput =$('#price-input');

  const title = $todoInput.val();
  if (!title || !title.trim()) return;

  const inputPrice = $priceInput.val();
  const numericPrice = parseFloat(inputPrice);
  const price = !isNaN(numericPrice) && numericPrice > 0 ? numericPrice : 0;
  const priceText = price > 0 ? `${price} грн` : 'Ціна не вказана';

  const $li =$('<li>')
    .attr('class', classNames.TODO_ITEM)
    .data('price', price);

  const $checkbox =$('<input type="checkbox">')
    .attr('class', classNames.TODO_CHECKBOX)
    .on('change', function () {
      if (this.checked) {
        $textSpan.addClass('text-decoration-line-through text-muted');$li.css('opacity', '0.6');
      } else {
        $textSpan.removeClass('text-decoration-line-through text-muted');$li.css('opacity', '1');
      }
      updateCounts();
    });

  const $textSpan =$('<span>')
    .attr('class', classNames.TODO_TEXT)
    .html(`<strong class="fw-medium">${title.trim()}</strong> <span class="text-muted small">(${priceText})</span>`);

  const $deleteBtn =$('<button>')
    .attr('class', classNames.TODO_DELETE)
    .html('&times;')
    .attr('title', 'Видалити')
    .on('click', function () {
      $li.slideUp(200, function () {$li.remove();
        updateCounts();
      });
    });

  $li.append($checkbox, $textSpan,$deleteBtn);


  $li.hide();$('#todo-list').append($li);$li.slideDown(1000);

  $todoInput.val('');$priceInput.val('');

  updateCounts();
}
$(document).ready(function () {$('#add-todo-btn').on('click', addNewTodo);
});