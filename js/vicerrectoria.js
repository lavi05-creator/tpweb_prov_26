
/* --- Modal: Crear evento (desde el Calendario) --- */
function openModal(dateText) {
    document.getElementById('modal-date-text').innerText = dateText;
    document.getElementById('modal-crear-evento').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-crear-evento').style.display = 'none';
}

function irAlFormulario() {
    closeModal(); // Cierra la ventana emergente
    showView('view-crear-evento'); // Te lleva al formulario grande
}

/* --- Modal: Columnas visibles (desde Entregas) --- */
function openColumnsModal() {
    document.getElementById('modal-columnas').style.display = 'flex';
}

function closeColumnsModal() {
    document.getElementById('modal-columnas').style.display = 'none';
}

/* --- Cerrar modales al hacer click afuera --- */
window.addEventListener('click', function(e) {
    var modalCrear = document.getElementById('modal-crear-evento');
    var modalColumnas = document.getElementById('modal-columnas');
    
    if (e.target == modalCrear) closeModal();
    if (e.target == modalColumnas) closeColumnsModal();
});

/* --- Filtros por temática --- */
document.addEventListener('DOMContentLoaded', function() {
    var pills = document.querySelectorAll('.theme-pill');
    pills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            pills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

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

// Acción masiva: marcar seleccionadas como leídas
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

// Acción masiva: eliminar seleccionadas
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

