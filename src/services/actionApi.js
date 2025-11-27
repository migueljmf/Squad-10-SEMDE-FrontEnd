import api from './api'

export const actionApi = {
  async create(action) {
    try {
      const res = await api.post('/demands/action', action)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error creating action', e)
      throw e
    }
  },
  async update(id, action) {
    try {
      const res = await api.put(`/contact/${id}`, action)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error updating contact', e)
      throw e
    }
  },
}
