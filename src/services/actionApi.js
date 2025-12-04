import api from './api'

export const actionApi = {
  async create(action) {
    try {
      const res = await api.post('/demands/action', action)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error creating action', e)
      throw e
    }
  },
  async update(id, action) {
    try {
      const res = await api.put(`/demands/action/${id}`, action)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error updating contact', e)
      throw e
    }
  },
    async updateStatus(id, status) {
    try {
      
      const response = await api.put(`/demands/action/${id}`, {status })
      return response.data
    } catch (error) {
      console.error("[v0] Error updating demand status:", error)
      throw error
    }
  },
  async getActionsCoordinates() {
    try {
      const response = await api.get('/action/cordinates')
      if (Array.isArray(response.data)) return response.data
      return response.data?.data || []
    } catch (error) {
      console.error('[v0] Error fetching action coordinates:', error)
    }
  },
    async getById(id) {
    try {
      const response = await api.get(`/action/${id}`)
      // backend might respond { message, data: { ... } } or directly the object
      return response.data?.data || response.data
    } catch (error) {
      console.error("[v0] Error fetching demand:", error)
    }
  },
}
