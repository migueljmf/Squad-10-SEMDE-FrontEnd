import  api  from "./api"
export const demandasApi = {
  // Fetch all demands
  async getAll() {
    try {
      // Real API call (commented for now)
      const response = await api.get("/task")
      return response.data

      // Using mock data
      // const { demandasMock } = await import("./demandasMock")
      // return await demandasMock.getAll()
    } catch (error) {
      console.error("[v0] Error fetching demands:", error)
      throw error
    }
  },

  // Fetch single demand by ID
  async getById(id) {
    try {
      const response = await api.get(`/task/${id}`)
      // backend might respond { message, data: { ... } } or directly the object
      return response.data?.data || response.data
    } catch (error) {
      console.error("[v0] Error fetching demand:", error)
    }
  },

  // Create new demand
  async create(demandData) {
    try {
      const response = await api.post('/task', demandData)
      return response.data?.data || response.data
    } catch (error) {
      console.error("[v0] Error creating demand:", error)
      throw error
    }
  },

  // Update existing demand
  async update(id, demandData) {
    try {
      const response = await api.put(`/task/${id}`, demandData)
      return response.data?.data || response.data
    } catch (error) {
      console.error("[v0] Error updating demand:", error)
      throw error
    }
  },

  // Delete demand
  async delete(id) {
    try {
      await api.delete(`/task/${id}`)
      return true
    } catch (error) {
      console.error("[v0] Error deleting demand:", error)
      throw error
    }
  },

  async updateStatus(id, status) {
    try {
      
      const response = await api.put(`/task/${id}`, {status })
      return response.data

      // const { demandasMock } = await import("./demandasMock")
      // return await demandasMock.updateStatus(id, status)
    } catch (error) {
      console.error("[v0] Error updating demand status:", error)
      throw error
    }
  },
  
  // Fetch task coordinates (new endpoint)
  async getTaskCoordinates() {
    try {
      const response = await api.get('/task/cordinates')
      // backend may return { message, data: [...] } or directly an array
      if (Array.isArray(response.data)) return response.data
      return response.data?.data || []
    } catch (error) {
      console.error('[v0] Error fetching task coordinates:', error)
    }
  },

  
  // Fetch task coordinates (new endpoint)
  async getTaskCoordinates() {
    try {
      const response = await api.get('/task/cordinates')
      // backend may return { message, data: [...] } or directly an array
      if (Array.isArray(response.data)) return response.data
      return response.data?.data || []
    } catch (error) {
      console.error('[v0] Error fetching task coordinates:', error)
    }
  },
}