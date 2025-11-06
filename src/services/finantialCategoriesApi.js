import api from './api'

export const finantialCategoriesApi = {
  async getAll() {
    try {
      const res = await api.get('/financial-category')
      return res.data?.data || res.data || []
    } catch (e) {
      console.error('[v0] Error fetching finantial categories', e)
      throw e
    }
  },
}
