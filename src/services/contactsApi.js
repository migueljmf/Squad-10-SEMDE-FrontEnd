import api from './api'

export const contactsApi = {
  async create(contact) {
    try {
      const res = await api.post('/contact', contact)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error creating contact', e)
      throw e
    }
  },
  async update(id, contact) {
    try {
      const res = await api.put(`/contact/${id}`, contact)
      return res.data?.data || res.data
    } catch (e) {
      console.error('[v0] Error updating contact', e)
      throw e
    }
  },
}
