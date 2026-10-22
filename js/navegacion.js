
// Función para cambiar entre pantallas
function showView(viewId) {
    
    // Ocultar todas las vistas
    var views = document.querySelectorAll(".view-section");
    for (var i = 0; i < views.length; i++) {
        views[i].style.display = "none";
        views[i].classList.remove("active-view");
    }
    
    // Mostrar la vista solicitada
    var target = document.getElementById(viewId);
    if (target) {
        target.style.display = "block";
        target.classList.add("active-view");
    }
    
    // Scroll al inicio
    window.scrollTo(0, 0);
}

 // Función para las pestañas (Tabs)
function switchTab(evt, tabName) {
    var tabContents = document.querySelectorAll(".tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    var tabBtns = document.querySelectorAll(".tab-btn");
    for (var i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }
    var targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.style.display = "grid";
    }
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}