import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    // https://github.com/robinvdvleuten/vuex-persistedstate#createpersistedstateoptions
    createPersistedState()(store)
  })
}