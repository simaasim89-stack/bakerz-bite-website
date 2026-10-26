/* Site-wide: page fade, smooth nav, live bottom bar (date, time, location, visitors) */
$(function(){
  var safe=function(f){try{return f()}catch(e){}};

  $('main').hide().fadeIn(450);
  $(document).on('click','a[href]',function(e){
    var h=this.getAttribute('href');
    if(!h||h.charAt(0)==='#'||/^(https?:|mailto:|tel:)/.test(h)||this.target==='_blank'||e.ctrlKey||e.metaKey)return;
    e.preventDefault();
    if($(this).hasClass('nav-link')){$('.navbar .nav-link').removeClass('active');$(this).addClass('active')}
    $('main').fadeOut(250,function(){location.href=h});
  });
  $(window).on('pageshow',function(e){if(e.originalEvent.persisted)$('main').stop(true).fadeIn(200)});

  
  // date time
function updateDateTime() {
    const now = new Date();
    var t=document.getElementById("live-data-time");if(t)t.innerHTML = "🗓️" + now.toLocaleDateString() + "⏰" + now.toLocaleTimeString();

}
setInterval(updateDateTime, 1000);
updateDateTime();

//location
function updateTicker(){var el=document.getElementById("live-location");if(el)el.textContent="Location: "+loc}
let loc= "Karachi, Pakistan (24.86, 67.01)";
if (navigator.geolocation) {
    navigator.geolocation((position) => {
        loc = "Lat:" + pos.coords.latitude.toFixed(2) + "Lon:" + pos.coords.longitude.toFixed(2);
        updateTicker();
    }, () => {
       loc = "Karachi, Pakistan(24.86, 67.01)";
       updateTicker();
    });
} 
function getLoc(){return loc; }
updateTicker();


function showDetails(title, ing, img) {
    document.getElementById("modalTitle").innerHTML = title;
    document.getElementById("modalIng").innerHTML = ing;
    document.getElementById("modalImg").src = img;
    document.getElementById("modalModal").style.display = "flex";
}

  /* visitors: shared counter service, falls back to a count stored in this browser */
 let count = 100;localStorage.getItem("bakerz_visitors");
  if (!count){
    count=1259;
  }else{
    count=parseInt(count)+1;
  }
  localStorage.setItem("bakerz_visitors, count");
  document.getElementById("visitorcount").innerHTML = count;
});
