import api from './api'

export const addressApi = {
  async create(address) {
    try {
      const res = await api.post('/address', address)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error creating address', e)
      throw e
    }
  },
  async update(id, address) {
    try {
      const res = await api.put(`/address/${id}`, address)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error updating address', e)
      throw e
    }
  },
  async getById(id) {
    try {
      const res = await api.get(`/address/${id}`)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error fetching address by id', e)
      throw e
    }
  },
}
