const P = [
  ["Chocolate Cake", "Cakes", 1800, "chocalatecake.png", "#efe0d6", "Bestseller", "Deep, velvety chocolate sponge finished with silky fudge frosting.", "Chocolate sponge, cocoa, flour, eggs, milk, sugar, butter, chocolate ganache"],
  ["Strawberry Dream Cake", "Cakes", 2000, "strawcake.png", "#f8e1e0", "Bestseller", "Light vanilla layers, fresh strawberries and cloud-soft cream.", "Vanilla sponge, strawberries, flour, eggs, milk, sugar, whipped cream"],
  ["Red Velvet Slice", "Cakes", 460, "redvelvet.png", "#f7e0df", "", "Tender cocoa-red layers with tangy cream-cheese frosting.", "Flour, cocoa, buttermilk, eggs, vanilla, cream cheese"],
  ["Vanilla Bliss Cake", "Cakes", 600, "vanillabliss.png", "#f6ecd2", "", "Warm vanilla sponge, buttery and lightly sweet, topped with almond flakes.", "Flour, buttermilk, eggs, butter, vanilla, almonds"],
  ["Blueberry Cheesecake", "Cakes", 1250, "blueberrycake.png", "#e6e3f0", "New", "Creamy baked cheesecake with a bright blueberry compote.", "Cream cheese, blueberries, biscuit crumb, eggs, sugar"],
  ["Red Velvet Cupcake", "Cakes", 600, "cupcake2.png", "#f9e2e4", "", "A cherry-topped cupcake with cream-cheese swirl.", "Flour, cocoa, buttermilk, eggs, vanilla, cream cheese, cherry"],
  ["Butter Croissant", "Pastries", 350, "croissant.png", "#f5e0c4", "Bestseller", "Golden, flaky and buttery with delicate crisp layers.", "Flour, butter, milk, yeast, sugar, salt"],
  ["Cinnamon Swirl Roll", "Pastries", 420, "swirlRoll.png", "#f1dcc9", "", "Soft roll with a warm cinnamon centre and vanilla glaze.", "Flour, cinnamon, butter, brown sugar, milk, yeast"],
  ["Puff Pastry Slice", "Pastries", 200, "puffpastry.png", "#efe2cf", "", "Light, golden layers of butter pastry with a fruity centre.", "Wheat flour, butter, water, salt, fruit filling"],
  ["Pastry", "Pastries", 170, "pastry.png", "#eadbd3", "", "Layered chocolate sponge with whipped cream and a cherry.", "Flour, cocoa, buttermilk, eggs, vanilla, cream"],
  ["Chocolate Donut", "Cookies & donuts", 290, "donuts.png", "#ecd9cc", "", "Soft donut dipped in rich dark chocolate glaze.", "Flour, cocoa, buttermilk, eggs, dark chocolate, chocolate chips"],
  ["Chocolate Chip Cookie", "Cookies & donuts", 250, "cookie.png", "#f3e3cf", "", "Chewy centre, crisp edge and plenty of chocolate chips.", "Butter, plain flour, chocolate chips, eggs, sugar"],
  ["Soft Bread", "Breads & savoury", 150, "bread.png", "#f4e6d1", "", "Fluffy sandwich loaf, baked fresh every morning.", "Flour, butter, yeast, sugar, milk, salt, water"],
  ["French Bread", "Breads & savoury", 230, "frenchbread.png", "#efe2cf", "", "Crisp, chewy crust with a light and airy inside.", "Flour, yeast, water, salt"],
  ["Club Sandwich", "Breads & savoury", 170, "sandwich.png", "#e9e3d6", "", "Toasted bread layered with fresh veggies, cheese and protein.", "Bread, chicken, cheese, vegetables, sauce"],
  ["Chocolate Fudge Layer Cake", "Cakes", 2200, "fudge cake1.png", "#efe0d6", "New", "Tall layers of dark sponge wrapped in swirls of glossy fudge frosting.", "Chocolate sponge, cocoa, butter, flour, eggs, sugar, fudge frosting"],
  ["Strawberry Cream Cake", "Cakes", 1900, "strawberrycake.png", "#f8e1e0", "", "Vanilla sponge with strawberry cream and a crown of fresh berries.", "Vanilla sponge, strawberries, whipped cream, flour, eggs, sugar"],
  ["Vanilla Strawberry Bliss", "Cakes", 650, "vanilla strawberry bliss cake.png", "#f6ecd2", "", "A soft vanilla slice layered with strawberry cream, light and fruity.", "Flour, eggs, butter, vanilla, strawberries, cream"],
  ["Chocolate Cupcake", "Cakes", 550, "chocolate cupcake.png", "#f9e2e4", "", "Moist chocolate cupcake with a swirl of creamy frosting on top.", "Flour, cocoa, eggs, butter, sugar, milk, cream frosting"],
  ["Almond Croissant", "Pastries", 450, "almond croissant.png", "#f5e0c4", "New", "Flaky croissant filled with sweet almond cream and topped with flakes.", "Flour, butter, almonds, yeast, sugar, milk, salt"],
  ["Fruit Danish", "Pastries", 320, "fruit danish.png", "#efe2cf", "", "Crisp buttery pastry with a sweet fruit centre and a light glaze.", "Flour, butter, fruit filling, sugar, yeast, water"],
  ["Double Chocolate Cookie", "Cookies & donuts", 280, "double chocolate cookie.png", "#f3e3cf", "", "Rich cocoa cookie loaded with chocolate chunks, soft in the middle.", "Butter, flour, cocoa, chocolate chunks, eggs, sugar"],
  ["Glazed Donut", "Cookies & donuts", 240, "glazed donuts.png", "#ecd9cc", "", "Light, fluffy ring donut finished with a sweet shiny glaze.", "Flour, yeast, milk, eggs, sugar, vanilla glaze"],
  ["Garlic Bread", "Breads & savoury", 260, "garlic bread.png", "#efe2cf", "", "Crusty bread baked with garlic butter and herbs until golden.", "Flour, yeast, butter, garlic, parsley, salt"],
  ["Veggie Sandwich", "Breads & savoury", 190, "veg sandwich.png", "#e9e3d6", "", "Fresh vegetables, cheese and a creamy spread between soft toasted bread.", "Bread, cheese, tomato, cucumber, lettuce, sauce"],
  ["Brownie", "Cookies & donuts", 280, "brownie.png", "#ecd9cc", "New", "Fudgy chocolate brownie with a crackly top and a rich, gooey centre.", "Butter, dark chocolate, cocoa, flour, eggs, sugar, vanilla"],
  ["Irani Bun", "Breads & savoury", 120, "irani bun.png", "#f4e6d1", "New", "Soft, lightly sweet bun baked golden, best dunked in a hot cup of chai.", "Flour, milk, butter, sugar, yeast, eggs, salt"]
].map((a, i) => ({ id: i, name: a[0], cat: a[1], price: a[2], img: 'images/' + a[3], tint: a[4], tag: a[5], desc: a[6], ing: a[7] }));
const FALLBACK = "this.onerror=null;this.src='data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext x=%2250%22 y=%2268%22 font-size=%2260%22 text-anchor=%22middle%22%3E%F0%9F%8D%B0%3C/text%3E%3C/svg%3E'";
const TINT = { 'Cakes': '#ffd9e2', 'Pastries': '#fff0bf', 'Cookies & donuts': '#e3f1cc', 'Breads & savoury': '#fff0bf' };
P.forEach(p => p.tint = TINT[p.cat]);
const L = [
  "A tall chocolate sponge soaked lightly in syrup and layered with glossy fudge ganache. It is rich without being heavy, which is why it is our most-ordered birthday cake.",
  "Soft vanilla layers sandwiched with whipped cream and crowned with fresh strawberries. Light, fruity and pretty enough to be the centrepiece of any celebration.",
  "A single generous slice of cocoa-red sponge with tangy cream-cheese frosting. Perfect with tea when you want a little treat without a whole cake.",
  "A buttery vanilla cake with a tender crumb and toasted almond flakes on top. Gently sweet and great for family gatherings.",
  "A baked cheesecake on a crisp biscuit base, finished with a bright, slightly tart blueberry compote. Creamy, cool and best served chilled.",
  "A fluffy red velvet cupcake with a swirl of cream-cheese frosting and a cherry on top. Sized for one, easy to share, hard to stop at one.",
  "Laminated by hand with real butter so it bakes into crisp, golden layers and a soft honeycomb inside. Best eaten warm on the day it is baked.",
  "A soft, pillowy roll rolled with cinnamon and brown sugar, then glazed with vanilla icing. The smell alone will pull people into the kitchen.",
  "Crisp, flaky butter pastry layered around a sweet fruity centre. A light snack that goes well with morning chai.",
  "Layers of chocolate sponge and whipped cream topped with a cherry. A classic bakery pastry at an everyday price.",
  "A soft, yeasted donut dipped in dark chocolate glaze and finished with chocolate chips. Fluffy inside, glossy outside.",
  "Baked with butter and plenty of chocolate chips for a crisp edge and a chewy middle. Good for lunchboxes and late-night cravings.",
  "A fluffy sandwich loaf baked fresh every morning. Soft enough for kids, sturdy enough for toast and sandwiches.",
  "A long loaf with a crackly crust and an airy, chewy inside. Tear it up with soup, or slice it for garlic bread.",
  "Toasted bread layered with chicken, cheese, fresh vegetables and our house sauce. A filling bite for lunch or a quick meal on the go.",
  "Layers of dark chocolate sponge wrapped in thick, glossy fudge frosting. Deep, rich and made for chocolate lovers and big celebrations.",
  "Soft vanilla sponge filled with strawberry cream and topped with fresh berries. Fruity, light and pretty on any table.",
  "A tender vanilla slice layered with strawberry cream. A small, sweet treat that goes well with an afternoon cup of tea.",
  "A moist chocolate cupcake topped with a swirl of creamy frosting. Sized for one and loved by kids and grown-ups alike.",
  "Our butter croissant filled with almond cream and finished with toasted almond flakes. Best eaten warm with coffee or chai.",
  "Buttery, flaky pastry with a sweet fruit centre and a light glaze. A pretty, easy snack for any time of day.",
  "A soft cocoa cookie packed with chocolate chunks and baked until just set. Crisp at the edge, gooey in the middle.",
  "A light, fluffy yeast donut covered in a thin sweet glaze. Simple, classic and freshly made each morning.",
  "Crusty bread brushed with garlic butter and herbs, then baked until golden. A perfect side for pasta, soup or barbecue.",
  "Soft toasted bread filled with fresh vegetables, cheese and a creamy spread. A light, filling bite for lunch or a quick snack.",
  "A dense, fudgy chocolate brownie with a thin crackly top and a gooey middle. Rich enough to share, though you probably will not want to.",
  "A soft, pillowy bun with a golden top and a gentle sweetness, baked fresh the way Karachi's Irani cafes do it. Perfect dunked in hot chai."];
const rs = n => 'Rs. ' + n.toLocaleString('en-US');
let cart = {}; try { cart = JSON.parse(localStorage.getItem('bb_cart') || '{}') } catch (e) { }
const save = () => { try { localStorage.setItem('bb_cart', JSON.stringify(cart)) } catch (e) { } };
const count = () => Object.values(cart).reduce((a, i) => a + i.q, 0);

function card(p, i) {
  return `<div class="col-md-6 col-lg-4" data-id="${p.id}"><article class="product-card h-100 rv" style="--i:${i % 3}">
<button class="food-art" style="--tint:${p.tint}" data-view="${p.id}" aria-label="View ${p.name}">${p.tag ? `<span class="badge-tag">${p.tag}</span>` : ''}<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="${FALLBACK}"><span class="view-hint">Quick view</span></button>
<div class="p-body"><span class="p-cat">${p.cat}</span><div class="p-top"><h3>${p.name}</h3><strong class="price">${rs(p.price)}</strong></div>
<p class="muted">${p.desc}</p><div class="p-actions"><button class="btn btn-brown flex-grow-1 add-cart" data-add="${p.id}">Add to cart</button><button class="btn btn-outline-brown" data-view="${p.id}">Details</button></div></div></article></div>`
}

/* scroll reveal (IntersectionObserver has no jQuery version, so it is wrapped with jQuery) */
function reveal(root) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { $(e.target).addClass('in'); io.unobserve(e.target) } }), { threshold: .12 });
  $(root || document).find('.rv:not(.in)').each(function () { io.observe(this) });
}

function render() {
  const n = count(), items = Object.entries(cart);
  $('#cartCount,#fabCount').each(function () { const $e = $(this).text(n).removeClass('btn-cart-bump'); void this.offsetWidth; $e.addClass('btn-cart-bump') });
  const total = items.reduce((a, [, i]) => a + i.p * i.q, 0);
  $('#cartBody').html(items.length ? items.map(([k, i]) => `<div class="cart-line"><div><strong>${k}</strong><div class="muted">${rs(i.p)}</div></div><div class="qty"><button data-q="-1" data-k="${k}" aria-label="Less">−</button>${i.q}<button data-q="1" data-k="${k}" aria-label="More">+</button></div></div>`).join('') + `<div class="d-flex justify-content-between mt-3 fs-5"><span>Total</span><strong>${rs(total)}</strong></div><button type="button" class="btn btn-brown w-100 mt-3" data-checkout>Place order</button>` : `<div class="empty"><p>Your cart is empty.</p><a class="btn btn-brown" href="menu.html">Browse the menu</a></div>`);
}
function add(name, price, btn) {
  const i = cart[name] || (cart[name] = { p: price, q: 0 }); i.q++; save(); render();
  $('#toastMessage').text(`${name} added. ${count()} item${count() > 1 ? 's' : ''} in your cart.`);
  bootstrap.Toast.getOrCreateInstance($('#cartToast')[0]).show();
  if (btn) { const $b = $(btn), t = $b.text(); $b.addClass('done').text('Added ✓'); setTimeout(() => $b.removeClass('done').text(t), 1200) }
}

$(function () {

  /* ---- menu: filter + search + sort ---- */
  const $grid = $('#menuGrid');
  if ($grid.length) {
    const cats = ['All', ...new Set(P.map(p => p.cat))]; let cat = 'All';
    $('#menuChips').html(cats.map(c => `<button class="chip${c === 'All' ? ' on' : ''}" data-cat="${c}">${c}<small>${c === 'All' ? P.length : P.filter(p => p.cat === c).length}</small></button>`).join(''));
    const paint = () => {
      const q = ($('#menuSearch').val() || '').toLowerCase().trim(), s = $('#menuSort').val();
      let l = P.filter(p => (cat === 'All' || p.cat === cat) && (p.name + p.desc + p.cat + p.ing).toLowerCase().includes(q));
      if (s === 'lo') l.sort((a, b) => a.price - b.price); if (s === 'hi') l.sort((a, b) => b.price - a.price); if (s === 'az') l.sort((a, b) => a.name.localeCompare(b.name));
      $grid.html(l.length ? l.map(card).join('') : `<div class="empty"><h3>Nothing matches “${q || cat}”</h3><p>Try another word or pick All to see the full menu.</p></div>`);
      $('#resultNote').text(`Showing ${l.length} of ${P.length} items`);
      requestAnimationFrame(() => $grid.find('.rv').addClass('in'));
    };
    const draw = () => { $grid.stop(true, true).fadeOut(140, () => { paint(); $grid.fadeIn(280) }) };
    $('#menuChips').on('click', '.chip', function () { cat = $(this).attr('data-cat'); $('.chip').removeClass('on'); $(this).addClass('on'); draw() });
    $('#menuSearch').on('input', draw); $('#menuSort').on('change', draw); paint();
  }
  const $feat = $('#featuredGrid');
  if ($feat.length) { $feat.html([0, 1, 6, 2, 4, 10].map((id, i) => card(P[id], i)).join('')); reveal($feat) }

  /* ---- modal, toast, cart drawer (injected) ---- */
  $('#productModal,.toast-container').remove();
  $('body').append(`
<div class="modal fade" id="productModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content product-modal">
<div class="modal-header border-0"><h2 class="modal-title h3" id="mTitle"></h2><button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
<div class="modal-body" id="mBody"></div><div class="modal-footer border-0"><button class="btn btn-brown" id="mAdd">Add to cart</button></div></div></div></div>
<div class="toast-container position-fixed top-0 end-0 p-3" style="z-index:1090"><div id="cartToast" class="toast" role="status"><div class="toast-header"><strong class="me-auto">Bakerz Bite</strong><button class="btn-close" data-bs-dismiss="toast"></button></div><div class="toast-body" id="toastMessage"></div></div></div>
<button class="cart-fab" data-bs-toggle="offcanvas" data-bs-target="#cartPanel">🛍 Cart<b id="fabCount">0</b></button>
<div class="offcanvas offcanvas-end" id="cartPanel"><div class="offcanvas-header"><h2 class="h4 m-0">Your cart</h2><button class="btn-close" data-bs-dismiss="offcanvas"></button></div><div class="offcanvas-body" id="cartBody"></div></div>`);

  let cur = 0;
  $(document).on('click', function (e) {
    const $t = $(e.target), $v = $t.closest('[data-view]'), $a = $t.closest('[data-add]'), $m = $t.closest('.merch-add'), $q = $t.closest('[data-q]');
    if ($v.length) {
      const p = P[+$v.attr('data-view')]; cur = p.id; $('#mTitle').text(p.name);
      $('#mBody').html(`<div class="row g-4 align-items-center"><div class="col-md-6"><div class="modal-art" style="--tint:${p.tint}"><img src="${p.img}" alt="${p.name}" onerror="${FALLBACK}"></div></div><div class="col-md-6"><span class="p-cat">${p.cat}</span><p class="price fs-3 mb-1">${rs(p.price)}</p><h3 class="h6">About this treat</h3><p class="mb-0">${L[p.id]}</p><h3 class="h6">Ingredients</h3><div class="ing">${p.ing.split(', ').map(x => `<span>${x}</span>`).join('')}</div></div></div>`);
      bootstrap.Modal.getOrCreateInstance($('#productModal')[0]).show()
    }
    else if ($a.length) { const p = P[+$a.attr('data-add')]; add(p.name, p.price, $a[0]) }
    else if ($m.length) { add($m.attr('data-name'), +$m.closest('.product-card').find('.price').first().text().replace(/\D/g, ''), $m[0]) }
    else if ($q.length) { const i = cart[$q.attr('data-k')]; i.q += +$q.attr('data-q'); if (i.q < 1) delete cart[$q.attr('data-k')]; save(); render() }
    else if (e.target.id === 'mAdd') { add(P[cur].name, P[cur].price); bootstrap.Modal.getOrCreateInstance($('#productModal')[0]).hide() }
  });
  render(); reveal();
  $('.merch-art').css('--tint', '#ffd9e2');

  /* contact + feedback forms are handled in js/forms.js */

  /* ---- active nav link ---- */
  $('.navbar .nav-link').each(function () {
    if (this.pathname === location.pathname || (location.pathname.endsWith('/') && $(this).attr('href') === 'index.html')) $(this).addClass('active').attr('aria-current', 'page');
  });

});
