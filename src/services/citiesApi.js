import api from './api'

export const citiesApi = {
  async search(query) {
    try {
      // endpoint ajustado para /city/name conforme informado
      const res = await api.get('/city/name', { params: { search: query } })
      return res.data?.data || res.data || []
    } catch (e) {
      console.error('[v0] Error searching cities', e)
      return []
    }
  }
}
