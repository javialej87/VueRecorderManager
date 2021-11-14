import axios from 'axios'

export default class {
  constructor(options = {}) {
    this.url = options.url || process.env.VUE_APP_SPORTPLAN_API_URI + '/plan'
    this.timeout = options.timeout || 10000
    this.onResponse = options.onResponse
    this.onError = options.onError
  }

  getRecordings = async function () {
    await axios
      .get('/sound-recordings')
      .then((response) => {
        this.onResponse && this.onResponse(response, 'getRecordings')
      })
      .catch((e) => {
        this.onError && this.onError(e)
      })
  }

  postRecording = async function (newRecording) {
    await axios
      .post('/sound-recordings', { newRecording })
      .then((response) => {
        this.onResponse && this.onResponse(response, 'postRecording')
      })
      .catch((e) => {
        this.onError && this.onError(e)
      })
  }

  deleteRecording = async function (id) {
    let params = {}
    params.idRecording = id

    await axios
      .delete('/sound-recordings', { params })
      .then((response) => {
        this.onResponse && this.onResponse(response, 'deleteRecording')
      })
      .catch((e) => {
        this.onError && this.onError(e)
      })
  }
}
