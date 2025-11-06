import api from './api'

export const citiesApi = {
  async search(name) {
    try {
      // endpoint ajustado para /city/name conforme informado
      const res = await api.get(`/city/name/${name}`)
      return res.data?.data || res.data || []
    } catch (e) {
      console.error('[v0] Error searching cities', e)
      return []
    }
  },

  async getById(id) {
    try {
      const res = await api.get(`/city/${id}`)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error fetching city by id', e)
      throw e
    }
  }
}
