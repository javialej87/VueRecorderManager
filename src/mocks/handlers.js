import { rest } from 'msw'
import store from '../store'

export default [
  rest.get('/sound-recordings', (req, res, ctx) => {
    return res(
      ctx.json({
        recordings: store.getters['recording/getRecordings']
      })
    )
  }),
  rest.post('/sound-recordings', (req, res, ctx) => {
    store.dispatch('recording/addRecording', req.body.newRecording)
    return res(
      ctx.json({
        message: 'post'
      })
    )
  }),
  rest.delete('/sound-recordings', (req, res, ctx) => {
    let idRecordToDelete = req.url.searchParams.get('idRecording')
    store.dispatch('recording/deleteRecording', idRecordToDelete)
    return res(
      ctx.json({
        message: 'delete'
      })
    )
  })
]
