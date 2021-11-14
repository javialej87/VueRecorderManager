import soundMock from '../assets/sound-recordings-mock.json'

export const recording = {
  namespaced: true,
  state: {
    //recordings: [{ id: '1' }, { id: '2' }]
    recordings: JSON.parse(JSON.stringify(soundMock))
  },
  getters: {
    getRecordings: (state) => {
      return state.recordings
    }
  },
  actions: {
    addRecording({ commit }, recording) {
      commit('PUSH', recording)
    },
    deleteRecording({ commit }, recordingToRemove) {
      commit('DELETE_RECORD', recordingToRemove)
    }
  },
  mutations: {
    SET_RECORDS(state, recordings) {
      state.recordings = recordings
    },
    PUSH(state, recording) {
      state.recordings.push({
        ...recording,
        id:
          state.recordings.length > 0
            ? Math.max.apply(
                Math,
                state.recordings.map((item) => item.id)
              ) + 1
            : 0
      })
    },
    DELETE_RECORD(state, recordingToRemove) {
      state.recordings = state.recordings.filter(
        (recording) => recording.id != recordingToRemove
      )
    }
  }
}
