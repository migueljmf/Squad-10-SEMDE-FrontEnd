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
}
