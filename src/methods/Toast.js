import Swal from 'sweetalert2'

export function showToast (icon = 'success', title = '') {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    }
  })

  Toast.fire({icon, title})
}

export function confirmClearDialog (t) {
  return Swal.fire({
    title: t('toast.deleteConfirmTitle'),
    text: t('toast.deleteConfirmText'),
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: t('toast.deleteConfirmCancel'),
    confirmButtonText: t('toast.deleteConfirmOk'),
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d'
  })
}