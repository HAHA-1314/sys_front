const state = {
    resp:null,
}

const mutations = {
    RESET_STATE: (state, resp) => {
        state.resp = resp;
    },
}

const actions = {
    updateResponse: ({ commit }, resp) => {
        commit('RESET_STATE', resp);
    }
}