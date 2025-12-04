import api from './api'

export const eleicoesApi = {
  async getDistricts() {
    try {
      const res = await api.get('/contact/districts')
      return res.data?.data || res.data || []
    } catch (e) {
      console.error('[v0] Error fetching contact districts', e)
      throw e
    }
  },
}
