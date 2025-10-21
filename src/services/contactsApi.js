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
}
