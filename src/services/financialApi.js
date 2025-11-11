import api from './api'

export const financialApi = {
  async getAll() {
    try {
      const res = await api.get('/financial')
      return res.data?.data || res.data || []
    } catch (e) {
      console.error('[v0] Error fetching financial', e)
      throw e
    }
  },
}
