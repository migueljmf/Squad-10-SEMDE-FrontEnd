export const demandasApi = {
  // Fetch all demands
  async getAll() {
    try {
      // Real API call (commented for now)
      // const response = await api.get("/demands")
      // return response.data

      // Using mock data
      const { demandasMock } = await import("./demandasMock")
      return await demandasMock.getAll()
    } catch (error) {
      console.error("[v0] Error fetching demands:", error)
      throw error
    }
  },

  // Fetch single demand by ID
  async getById(id) {
    try {
      // const response = await api.get(`/demands/${id}`)
      // return response.data

      const { demandasMock } = await import("./demandasMock")
      return await demandasMock.getById(id)
    } catch (error) {
      console.error("[v0] Error fetching demand:", error)
      throw error
    }
  },

  // Create new demand
  async create(demandData) {
    try {
      // const response = await api.post("/demands", demandData)
      // return response.data

      const { demandasMock } = await import("./demandasMock")
      return await demandasMock.create(demandData)
    } catch (error) {
      console.error("[v0] Error creating demand:", error)
      throw error
    }
  },

  // Update existing demand
  async update(id, demandData) {
    try {
      // const response = await api.put(`/demands/${id}`, demandData)
      // return response.data

      const { demandasMock } = await import("./demandasMock")
      return await demandasMock.update(id, demandData)
    } catch (error) {
      console.error("[v0] Error updating demand:", error)
      throw error
    }
  },

  // Delete demand
  async delete(id) {
    try {
      // await api.delete(`/demands/${id}`)
      // return true

      const { demandasMock } = await import("./demandasMock")
      return await demandasMock.delete(id)
    } catch (error) {
      console.error("[v0] Error deleting demand:", error)
      throw error
    }
  },

  async updateStatus(id, status) {
    try {
      // const response = await api.patch(`/demands/${id}/status`, { status })
      // return response.data

      const { demandasMock } = await import("./demandasMock")
      return await demandasMock.updateStatus(id, status)
    } catch (error) {
      console.error("[v0] Error updating demand status:", error)
      throw error
    }
  },
}
