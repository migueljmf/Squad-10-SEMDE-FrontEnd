import { reactive } from 'vue'

const state = reactive({
  toasts: []
})

let idCounter = 1

function push(toast) {
  const id = idCounter++
  const t = { id, ...toast }
  state.toasts.push(t)

  if (t.duration !== 0) {
    const timeout = t.duration ?? 4000
    setTimeout(() => {
      remove(id)
    }, timeout)
  }

  return id
}

function remove(id) {
  const idx = state.toasts.findIndex(t => t.id === id)
  if (idx !== -1) state.toasts.splice(idx, 1)
}

function success(message, opts = {}) {
  return push({ type: 'success', message, duration: opts.duration ?? 4000 })
}

function error(message, opts = {}) {
  return push({ type: 'error', message, duration: opts.duration ?? 6000 })
}

function info(message, opts = {}) {
  return push({ type: 'info', message, duration: opts.duration ?? 4000 })
}

export const notificationStore = {
  state,
  push,
  remove,
  success,
  error,
  info
}

export default notificationStore
