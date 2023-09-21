var path = window.location.pathname;
var page = path.split("/").pop();

var splashScreen = document.querySelector('.splash');
function hideSplashScreen() {
splashScreen.style.opacity = 0;
setTimeout(()=>{
    splashScreen.classList.add('hidden')
}, 610)
}

setTimeout(hideSplashScreen, 1000);
