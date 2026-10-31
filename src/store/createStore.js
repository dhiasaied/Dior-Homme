import { useSyncExternalStore } from 'react'

/**
 * Minimal external store. Works across React renderers (DOM + R3F canvas),
 * so the 3D scene and the HTML overlay share state without context bridging.
 */
export function createStore(initializer) {
  let state
  const listeners = new Set()

  const getState = () => state
  const setState = (partial) => {
    const next = typeof partial === 'function' ? partial(state) : partial
    if (next === state) return
    state = { ...state, ...next }
    listeners.forEach((l) => l())
  }
  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  state = initializer(setState, getState)

  function useStore(selector = (s) => s) {
    return useSyncExternalStore(subscribe, () => selector(state), () => selector(state))
  }
  useStore.getState = getState
  useStore.setState = setState
  useStore.subscribe = subscribe
  return useStore
}
