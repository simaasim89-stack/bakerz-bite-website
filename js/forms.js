/* Contact + Feedback: regex validation + localStorage saving */
$(function () {

  /* ---------- Regex rules ---------- */
  var RX = {
    name:  /^[A-Za-z][A-Za-z .'-]{1,39}$/,                        // letters, spaces . ' - (2-40)
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
    phone: /^(?:\+92|0092|0)?[\s-]?3\d{2}[\s-]?\d{7}$/,            // Pakistani mobile: 0300 1234567 / +92 300 1234567
    tried: /^[A-Za-z0-9 ,.&'()-]{2,80}$/,                          // food items list
    text:  /^[\s\S]{10,500}$/                                       // 10-500 characters
  };

  /* ---------- localStorage helpers ---------- */
  function load(key) {
    try { var a = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function store(key, arr) {
    try { localStorage.setItem(key, JSON.stringify(arr)); return true; }
    catch (e) { return false; }
  }

  /* ---------- UI helpers ---------- */
  function setError($field, msg) {
    var $err = $field.nextAll('.field-error').first();
    $err.text(msg || '');
    $field.toggleClass('is-invalid', !!msg).toggleClass('is-valid', !msg && $.trim($field.val()) !== '');
    return !msg;
  }
  function check($field, rx, required, msgEmpty, msgBad) {
    var v = $.trim($field.val());
    if (!v) return setError($field, required ? msgEmpty : '');
    return setError($field, rx.test(v) ? '' : msgBad);
  }

  /* ---------- Validators per form ---------- */
  var V = {
    contactForm: function ($f) {
      var ok = true;
      ok = check($f.find('[name=name]'),  RX.name,  true, 'Please enter your name.', 'Name must be 2–40 letters (no numbers or symbols).') && ok;
      ok = check($f.find('[name=email]'), RX.email, true, 'Please enter your email.', 'Enter a valid email like you@example.com.') && ok;
      ok = check($f.find('[name=phone]'), RX.phone, true, 'Please enter your phone number.', 'Enter a valid Pakistani mobile, e.g. 0300 1234567 or +92 300 1234567.') && ok;
      ok = check($f.find('[name=message]'), RX.text, true, 'Please write a message.', 'Message must be 10–500 characters.') && ok;
      return ok;
    },
    feedbackForm: function ($f) {
      var ok = true;
      var hasRating = $f.find('[name=rating]:checked').length > 0;
      $f.find('[data-for-rating]').text(hasRating ? '' : 'Please choose a rating.');
      ok = hasRating && ok;
      ok = check($f.find('[name=tried]'),    RX.tried, false, '', 'Use letters/numbers and commas only (2–80 characters).') && ok;
      ok = check($f.find('[name=feedback]'), RX.text,  true, 'Please write your feedback.', 'Feedback must be 10–500 characters.') && ok;
      ok = check($f.find('[name=name]'),     RX.name,  false, '', 'Name must be 2–40 letters (no numbers or symbols).') && ok;
      return ok;
    }
  };

  var CFG = {
    contactForm:  { key: 'bb_contacts',  box: '#savedContacts',  ok: 'Thanks! Your message has been saved. We will reply within a day.' },
    feedbackForm: { key: 'bb_feedbacks', box: '#savedFeedback',  ok: 'Thank you for your feedback!' }
  };

  /* ---------- Render saved entries (textContent => safe from HTML injection) ---------- */
  function renderSaved(id) {
    var cfg = CFG[id], $box = $(cfg.box), items = load(cfg.key);
    if (!$box.length) return;
    var $list = $box.find('.saved-list').empty();
    items.slice().reverse().forEach(function (it) {
      var $row = $('<div class="saved-item"></div>');
      if (id === 'contactForm') {
        $row.append($('<div></div>').append($('<strong></strong>').text(it.topic)).append(document.createTextNode(' — ' + it.name)));
        $row.append($('<div></div>').text(it.message));
      } else {
        $row.append($('<div></div>').append($('<strong></strong>').text('★'.repeat(+it.rating) + ' (' + it.rating + '/5)')).append(document.createTextNode(it.name ? ' — ' + it.name : '')));
        if (it.tried) $row.append($('<div></div>').text('Tried: ' + it.tried));
        $row.append($('<div></div>').text(it.feedback));
      }
      $row.append($('<div class="meta"></div>').text(it.date));
      $list.append($row);
    });
    $box.prop('hidden', items.length === 0);
  }

  /* ---------- Wire up each form ---------- */
  $('#contactForm, #feedbackForm').each(function () {
    var $f = $(this), id = this.id, cfg = CFG[id];

    // live validation after the user leaves a field
    $f.on('blur', 'input[type=text], input:not([type]), textarea', function () { V[id]($f); });
    $f.on('change', '[name=rating]', function () { $f.find('[data-for-rating]').text(''); });

    // character counter
    $f.find('textarea').on('input', function () {
      $f.find('.char-count[data-for="' + this.id + '"]').text(this.value.length + ' / 500');
    });

    // prefill remembered name/email on contact form
    if (id === 'contactForm') {
      try {
        var last = load(cfg.key).slice(-1)[0];
        if (last) { $f.find('[name=name]').val(last.name); $f.find('[name=email]').val(last.email); $f.find('[name=phone]').val(last.phone); }
      } catch (e) {}
    }

    $f.on('submit', function (ev) {
      ev.preventDefault();
      var $msg = $f.find('.form-feedback').removeClass('ok err');
      if (!V[id]($f)) { $msg.addClass('err').text('Please fix the highlighted fields.'); return; }

      var data = { date: new Date().toLocaleString() };
      $.each($f.serializeArray(), function (_, p) { data[p.name] = $.trim(p.value); });

      var all = load(cfg.key);
      all.push(data);
      if (!store(cfg.key, all)) { $msg.addClass('err').text('Could not save (browser storage is blocked).'); return; }

      $msg.addClass('ok').text(cfg.ok);
      var keepName = data.name, keepEmail = data.email, keepPhone = data.phone;
      $f[0].reset();
      $f.find('.is-valid,.is-invalid').removeClass('is-valid is-invalid');
      $f.find('.field-error').text('');
      $f.find('.char-count').text('0 / 500');
      if (id === 'contactForm') { $f.find('[name=name]').val(keepName); $f.find('[name=email]').val(keepEmail); $f.find('[name=phone]').val(keepPhone); }
      renderSaved(id);
    });

    renderSaved(id);
  });

  // clear-all buttons
  $(document).on('click', '[data-clear]', function () {
    var key = $(this).data('clear');
    if (!confirm('Delete all saved entries from this browser?')) return;
    try { localStorage.removeItem(key); } catch (e) {}
    $.each(CFG, function (id, c) { if (c.key === key) renderSaved(id); });
  });
});
