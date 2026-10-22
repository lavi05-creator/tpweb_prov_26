
// Marcar una notificación específica como leída
function markAsRead(notifId) {
    var notif = document.getElementById(notifId);
    if (notif) {
        notif.classList.remove('unread');
        // Quitar el botón de "marcar como leída"
        var readBtn = notif.querySelector('.icon-action:not(.delete)');
        if (readBtn) readBtn.remove();
        updateNotificationBadge();
    }
}

// Eliminar una notificación específica
function deleteNotification(notifId) {
    var notif = document.getElementById(notifId);
    if (notif) {
        notif.style.opacity = '0';
        setTimeout(function() {
            notif.remove();
            updateNotificationBadge();
        }, 200);
    }
}

/* --- NOTIFICACIONES: SELECCIÓN MÚLTIPLE --- */

// Actualizar el estado visual de una fila al marcar su checkbox
function updateSelectedState(checkbox) {
    var row = checkbox.closest('.notification-item');
    if (checkbox.checked) {
        row.classList.add('selected');
    } else {
        row.classList.remove('selected');
    }
    updateSelectAllCheckbox();
}

// Seleccionar / Deseleccionar todas las notificaciones
function toggleAllNotifs(source) {
    var checkboxes = document.querySelectorAll('.notif-checkbox');
    checkboxes.forEach(function(cb) {
        cb.checked = source.checked;
        var row = cb.closest('.notification-item');
        if (source.checked) {
            row.classList.add('selected');
        } else {
            row.classList.remove('selected');
        }
    });
}

// Actualizar el checkbox de "Seleccionar todas" si el usuario marca/desmarca manualmente
function updateSelectAllCheckbox() {
    var checkboxes = document.querySelectorAll('.notif-checkbox');
    var allChecked = true;
    var anyChecked = false;
    
    checkboxes.forEach(function(cb) {
        if (!cb.checked) allChecked = false;
        if (cb.checked) anyChecked = true;
    });

    var selectAll = document.getElementById('selectAllNotifs');
    if (selectAll) {
        selectAll.checked = allChecked;
        selectAll.indeterminate = anyChecked && !allChecked;
    }
}

// Acción masiva: Marcar seleccionadas como leídas
function bulkMarkAsRead() {
    var selected = document.querySelectorAll('.notif-checkbox:checked');
    if (selected.length === 0) return alert('Selecciona al menos una notificación.');
    
    selected.forEach(function(cb) {
        var row = cb.closest('.notification-item');
        row.classList.remove('unread');
        var readBtn = row.querySelector('.icon-action:not(.delete)');
        if (readBtn) readBtn.remove();
        cb.checked = false;
        row.classList.remove('selected');
    });
    
    document.getElementById('selectAllNotifs').checked = false;
    updateNotificationBadge();
}

// Acción masiva: Eliminar seleccionadas
function bulkDelete() {
    var selected = document.querySelectorAll('.notif-checkbox:checked');
    if (selected.length === 0) return alert('Selecciona al menos una notificación.');
    
    if (!confirm('¿Estás seguro de eliminar las notificaciones seleccionadas?')) return;

    selected.forEach(function(cb) {
        var row = cb.closest('.notification-item');
        row.style.opacity = '0';
        setTimeout(function() { row.remove(); }, 200);
    });
    
    document.getElementById('selectAllNotifs').checked = false;
    setTimeout(updateNotificationBadge, 250);
}

// Actualizar contador y puntito de la campana
function updateNotificationBadge() {
    var unreadCount = document.querySelectorAll('.notification-item.unread').length;
    var notifDot = document.querySelector('.notif-dot');
    
    if (notifDot) {
        notifDot.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}


// Función para simular el envío de trabajo
function enviarTrabajo(event) {
    event.preventDefault(); // Evita que la página se recargue
    alert('Trabajo enviado con éxito. Recibirás una notificación.');
    showView('view-inicio'); // Vuelve al dashboard
}

// Función para cambiar entre pantallas
        function showView(viewId) {
            var views = document.getElementsByClassName("view-section");
            for (var i = 0; i < views.length; i++) {
                views[i].classList.remove("active-view");
            }
            document.getElementById(viewId).classList.add("active-view");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

 // Función para las pestañas (Tabs)
        function switchTab(evt, tabName) {
            var tabContents = document.getElementsByClassName("tab-content");
            for (var i = 0; i < tabContents.length; i++) {
                tabContents[i].style.display = "none";
            }
            var tabBtns = document.getElementsByClassName("tab-btn");
            for (var i = 0; i < tabBtns.length; i++) {
                tabBtns[i].className = tabBtns[i].className.replace(" active");
            }
            document.getElementById(tabName).style.display = "grid";
            evt.currentTarget.className += " active";
        }

/* Lógica del Calendario */

let currentMonth = 9; // Octubre (0=Enero, 9=Octubre)
let currentYear = 2026;

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendarHeader();
}

function updateCalendarHeader() {
    var header = document.getElementById('calendar-month-year-est');
    if (header) {
        header.innerText = monthNames[currentMonth] + ' ' + currentYear;
    }
}

function setCalendarView(view) {
    // Actualizar botones activos
    var buttons = document.querySelectorAll('.calendar-view-btn-est');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    // Marcar el botón clicado como activo
    event.currentTarget.classList.add('active');
}