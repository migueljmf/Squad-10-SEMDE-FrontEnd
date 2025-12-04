import api from './api'

export const usersApi = {

  async getAll() {
    try {
      const res = await api.get(`/user`)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error fetching city by id', e)
      throw e
    }
  }
}
