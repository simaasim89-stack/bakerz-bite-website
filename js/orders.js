/* Checkout: place order from cart -> regex validation -> saved in localStorage */
$(function () {
  var RX = {
    name:    /^[A-Za-z][A-Za-z .'-]{1,39}$/,
    phone:   /^(?:\+92|0092|0)?[\s-]?3\d{2}[\s-]?\d{7}$/,
    address: /^[A-Za-z0-9 ,.#\/'()-]{10,150}$/,
    note:    /^[\s\S]{0,200}$/
  };
  var KEY = 'bb_orders';

  function load() { try { var a = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function store(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); return true; } catch (e) { return false; } }
  function cartTotal() { return Object.values(cart).reduce(function (a, i) { return a + i.p * i.q; }, 0); }

  /* ---- inject checkout modal + order history box ---- */
  $('#checkoutModal').remove();
  $('body').append(
    '<div class="modal fade" id="checkoutModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content product-modal">' +
    '<div class="modal-header border-0"><h2 class="modal-title h4" id="coTitle">Place your order</h2><button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
    '<div class="modal-body" id="coBody"></div></div></div></div>');

  $('#cartPanel').append('<div class="orders-box" id="ordersBox" hidden></div>');

  function renderHistory() {
    var items = load(), $b = $('#ordersBox').empty();
    if (!items.length) { $b.prop('hidden', true); return; }
    $b.prop('hidden', false);
    $b.append('<div class="d-flex justify-content-between align-items-center mb-2"><strong>My orders</strong><button type="button" class="btn btn-sm btn-cream" id="clearOrders">Clear</button></div>');
    items.slice(-5).reverse().forEach(function (o) {
      var $r = $('<div class="saved-item"></div>');
      $r.append($('<div></div>').append($('<strong></strong>').text(o.id)).append(document.createTextNode(' · Rs. ' + o.total.toLocaleString('en-US') + ' · ' + o.status)));
      $r.append($('<div class="meta"></div>').text(o.date));
      $b.append($r);
    });
  }

  /* ---- build checkout form ---- */
  function showForm() {
    var lines = Object.entries(cart);
    if (!lines.length) return;
    var $body = $('#coBody').empty();
    $('#coTitle').text('Place your order');

    var $sum = $('<div class="co-summary mb-3"></div>');
    lines.forEach(function (e) {
      $sum.append($('<div class="d-flex justify-content-between"></div>')
        .append($('<span></span>').text(e[1].q + ' × ' + e[0]))
        .append($('<span></span>').text('Rs. ' + (e[1].p * e[1].q).toLocaleString('en-US'))));
    });
    $sum.append($('<div class="d-flex justify-content-between fw-bold border-top mt-2 pt-2"></div>')
      .append('<span>Total</span>').append($('<span></span>').text('Rs. ' + cartTotal().toLocaleString('en-US'))));
    $body.append($sum);

    var last = load().slice(-1)[0] || {};
    var $f = $(
      '<form id="orderForm" novalidate>' +
      '<label class="form-label" for="oName">Your name</label><input class="form-control mb-1" id="oName" name="name" maxlength="40" autocomplete="name"><div class="field-error mb-2"></div>' +
      '<label class="form-label" for="oPhone">Phone number</label><input class="form-control mb-1" id="oPhone" name="phone" placeholder="0300 1234567" autocomplete="tel"><div class="field-error mb-2"></div>' +
      '<label class="form-label d-block">Order type</label>' +
      '<div class="mb-2"><label class="me-3"><input type="radio" name="type" value="Delivery" checked> Delivery</label><label><input type="radio" name="type" value="Pickup"> Pickup from store</label></div>' +
      '<div id="addrWrap"><label class="form-label" for="oAddress">Delivery address</label><textarea class="form-control mb-1" id="oAddress" name="address" rows="2" maxlength="150" placeholder="House #, street, area, Karachi" autocomplete="street-address"></textarea><div class="field-error mb-2"></div></div>' +
      '<label class="form-label" for="oNote">Note (optional)</label><input class="form-control mb-1" id="oNote" name="note" maxlength="200" placeholder="e.g. Write Happy Birthday on cake"><div class="field-error mb-2"></div>' +
      '<p class="muted small mb-3">Payment: Cash on delivery / pay at store.</p>' +
      '<button class="btn btn-brown w-100" type="submit">Confirm order</button>' +
      '<p class="form-feedback mt-2" aria-live="polite"></p></form>');
    $f.find('[name=name]').val(last.name || '');
    $f.find('[name=phone]').val(last.phone || '');
    $f.find('[name=address]').val(last.address || '');
    $body.append($f);
    bootstrap.Modal.getOrCreateInstance($('#checkoutModal')[0]).show();
  }

  function fieldCheck($el, rx, required, msgEmpty, msgBad) {
    var v = $.trim($el.val()), msg = '';
    if (!v) msg = required ? msgEmpty : ''; else if (!rx.test(v)) msg = msgBad;
    $el.nextAll('.field-error').first().text(msg);
    $el.toggleClass('is-invalid', !!msg);
    return !msg;
  }
  function validate($f) {
    var ok = true, delivery = $f.find('[name=type]:checked').val() === 'Delivery';
    ok = fieldCheck($f.find('[name=name]'), RX.name, true, 'Please enter your name.', 'Name must be 2–40 letters (no numbers or symbols).') && ok;
    ok = fieldCheck($f.find('[name=phone]'), RX.phone, true, 'Please enter your phone number.', 'Enter a valid mobile, e.g. 0300 1234567 or +92 300 1234567.') && ok;
    if (delivery) ok = fieldCheck($f.find('[name=address]'), RX.address, true, 'Please enter your delivery address.', 'Address must be 10–150 characters (letters, numbers, , . # / - only).') && ok;
    ok = fieldCheck($f.find('[name=note]'), RX.note, false, '', 'Note can be at most 200 characters.') && ok;
    return ok;
  }

  /* ---- events ---- */
  $(document).on('click', '[data-checkout]', function () {
    var $oc = $('#cartPanel');
    try { bootstrap.Offcanvas.getOrCreateInstance($oc[0]).hide(); } catch (e) {}
    setTimeout(showForm, 300);
  });

  $(document).on('change', '#orderForm [name=type]', function () {
    $('#addrWrap').toggle(this.value === 'Delivery');
  });
  $(document).on('blur', '#orderForm input[type=text], #orderForm input:not([type]), #orderForm textarea', function () { validate($('#orderForm')); });

  $(document).on('submit', '#orderForm', function (ev) {
    ev.preventDefault();
    var $f = $(this), $msg = $f.find('.form-feedback').removeClass('ok err');
    if (!Object.keys(cart).length) { $msg.addClass('err').text('Your cart is empty.'); return; }
    if (!validate($f)) { $msg.addClass('err').text('Please fix the highlighted fields.'); return; }

    var type = $f.find('[name=type]:checked').val();
    var order = {
      id: 'BB-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleString(),
      name: $.trim($f.find('[name=name]').val()),
      phone: $.trim($f.find('[name=phone]').val()),
      type: type,
      address: type === 'Delivery' ? $.trim($f.find('[name=address]').val()) : '',
      note: $.trim($f.find('[name=note]').val()),
      items: Object.entries(cart).map(function (e) { return { name: e[0], price: e[1].p, qty: e[1].q }; }),
      total: cartTotal(),
      status: 'Received'
    };
    var all = load(); all.push(order);
    if (!store(all)) { $msg.addClass('err').text('Could not save the order (browser storage is blocked).'); return; }

    cart = {}; save(); render(); renderHistory();

    $('#coTitle').text('Order placed 🎉');
    var $b = $('#coBody').empty();
    $b.append($('<p class="fs-5 mb-1"></p>').text('Thank you, ' + order.name + '!'));
    $b.append($('<p></p>').append('Your order number is <strong></strong>.').find('strong').text(order.id).end());
    $b.append($('<p class="mb-1"></p>').text(order.type === 'Delivery' ? 'We will deliver to: ' + order.address : 'Pickup from our North Nazimabad store.'));
    $b.append($('<p></p>').text('Total to pay: Rs. ' + order.total.toLocaleString('en-US') + ' (cash). We will call you on ' + order.phone + ' to confirm.'));
    $b.append('<button class="btn btn-brown w-100" data-bs-dismiss="modal">Done</button>');
  });

  $(document).on('click', '#clearOrders', function () {
    if (!confirm('Delete your saved order history from this browser?')) return;
    try { localStorage.removeItem(KEY); } catch (e) {}
    renderHistory();
  });

  renderHistory();
});
