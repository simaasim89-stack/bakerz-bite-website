/* Deals page: bundles, countdown, box builder. Uses P, rs, add(), reveal() from script.js */
const D = [
    ["Morning Rush", "Croissant x2, Club Sandwich x2, Soft Bread", [[6, 2], [14, 2], [12, 1]], 949, "hot"],
    ["Sweet Duo", "Chocolate Cake + 4 Chocolate Chip Cookies", [[0, 1], [11, 4]], 2199],
    ["Cheesecake Date", "Blueberry Cheesecake + 2 Red Velvet Slices", [[4, 1], [2, 2]], 1699],
    ["Tea Party Box", "2 Pastry, 2 Puff Slice, 2 Donuts, 2 Cookies", [[9, 2], [8, 2], [10, 2], [11, 2]], 1399],
    ["Celebration Pack", "Strawberry Dream Cake, 4 Cupcakes, 4 Donuts", [[1, 1], [5, 4], [10, 4]], 4299],
    ["Student Saver", "Club Sandwich + Puff Slice + Donut", [[14, 1], [8, 1], [10, 1]], 499]];
const was = d => d[2].reduce((a, [i, q]) => a + P[i].price * q, 0);

$(function () {

    /* deal cards */
    $('#dealGrid').html(D.map((d, k) => {
        const o = was(d), s = o - d[3], pc = Math.round(s / o * 100);
        return `<div class="col-md-6 col-lg-4"><article class="d-ticket rv ${d[4] || ''}" style="--i:${k % 3};--tint:${P[d[2][0][0]].tint}">
<div class="d-stamp"><span>-${pc}%<small>OFF</small></span></div>
<div class="d-stage">${d[2].slice(0, 3).map(([i]) => `<img src="${P[i].img}" alt="${P[i].name}">`).join('')}</div>
<h3>${d[0]}</h3><ul class="d-list">${d[1].split(/, | \+ /).map(x => `<li>${x}</li>`).join('')}</ul>
<div class="d-prices"><strong>${rs(d[3])}</strong><s>${rs(o)}</s><span class="d-save">Save ${rs(s)}</span></div>
<button class="btn btn-brown w-100 deal-add" data-k="${k}">Grab this deal</button></article></div>`
    }).join(''));
    reveal($('#dealGrid'));
    $('#dealGrid').on('click', '.deal-add', function () { const d = D[$(this).attr('data-k')]; add('Deal: ' + d[0], d[3], this) });

    /* midnight countdown */
    const dg = { h: $('#h'), m: $('#m'), s: $('#s') };
    function tickClock() {
        const n = new Date(), e = new Date(n); e.setHours(24, 0, 0, 0); let t = Math.floor((e - n) / 1e3);
        const v = { h: Math.floor(t / 3600), m: Math.floor(t % 3600 / 60), s: t % 60 };
        for (const k in v) { const x = String(v[k]).padStart(2, '0'), $el = dg[k]; if ($el.text() !== x) { $el.text(x).removeClass('tick'); void $el[0].offsetWidth; $el.addClass('tick') } }
    }
    tickClock(); setInterval(tickClock, 1000);
    const line = ['Bundle & save', 'Baked fresh every morning', 'Deals reset at midnight', 'Build your own box', 'Rs. 499 se shuru'];
    $('#mq').html((line.map(x => `<span>${x} ✦</span>`).join('')).repeat(4));

    /* box builder */
    const box = {}; let last = -1;
    const tiers = [[8, .15], [5, .10], [3, .05]];
    $('#tiles').html(P.map(p => `<div class="d-tile" data-i="${p.id}"><img src="${p.img}" alt="${p.name}"><p>${p.name}</p><small>${rs(p.price)}</small><div class="d-qty"><button data-d="-1" aria-label="Remove ${p.name}">−</button><b>0</b><button data-d="1" aria-label="Add ${p.name}">+</button></div></div>`).join(''));
    function draw() {
        const n = Object.values(box).reduce((a, b) => a + b, 0), sub = Object.entries(box).reduce((a, [i, q]) => a + P[i].price * q, 0);
        const t = tiers.find(t => n >= t[0]), off = t ? t[1] : 0, tot = Math.round(sub * (1 - off));
        $('.d-tile').each(function () { const q = box[$(this).attr('data-i')] || 0; $(this).find('b').text(q); $(this).toggleClass('on', q > 0) });
        $('#bar').css('width', Math.min(n / 8, 1) * 100 + '%');
        [3, 5, 8].forEach(k => $('#t' + k).toggleClass('hit', n >= k));
        const html = Object.entries(box).flatMap(([i, q]) => Array(q).fill(i));
        $('#box').html(html.length ? html.map((i, x) => `<img src="${P[i].img}" alt="" ${x === html.lastIndexOf(String(last)) && last >= 0 ? '' : 'style="animation:none"'}>`).join('') : '<em>Empty box. Add 3 items to start saving.</em>');
        const nx = [...tiers].reverse().find(t => n < t[0]);
        $('#hint').text(n === 0 ? '' : nx ? `Add ${nx[0] - n} more to unlock ${nx[1] * 100}% off.` : 'Top discount unlocked. Nice box!');
        $('#old').text(off ? rs(sub) : ''); $('#new').text(rs(tot));
        $('#addBox').prop('disabled', n < 3).attr({ 'data-p': tot, 'data-n': n });
    }
    $('#tiles').on('click', '[data-d]', function () { const d = +$(this).attr('data-d'), i = $(this).closest('.d-tile').attr('data-i'); box[i] = Math.max(0, (box[i] || 0) + d); if (!box[i]) delete box[i]; last = d > 0 ? +i : -1; draw() });
    $('#addBox').on('click', function () { add(`Custom Box (${$(this).attr('data-n')} items)`, +$(this).attr('data-p'), this); for (const k in box) delete box[k]; last = -1; setTimeout(draw, 1300) });
    draw();

});
