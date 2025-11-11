import api from './api'

export const financialCategoriesApi = {
  async getAll() {
    try {
      const res = await api.get('/financial-category')
      return res.data?.data || res.data || []
    } catch (e) {
      console.error('[v0] Error fetching financial categories', e)
      throw e
    }
  },
}
