import api from './api'

export const categoriesApi = {
  async getAll() {
    try {
      const res = await api.get('/category')
      return res.data?.data || res.data || []
    } catch (e) {
      console.error('[v0] Error fetching categories', e)
      throw e
    }
  },
}
