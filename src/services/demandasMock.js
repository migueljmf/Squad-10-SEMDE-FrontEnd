// Mock data service for development
// Remove this file when API is ready

const mockDemandas = [
  {
    id: "1",
    advisorId: "f94b0e3a-0ab1-4a7d-9a13-95a27f516bde",
    title: "Entrega de relatório final",
    description: "Enviar o relatório técnico final para o cliente e encerrar o atendimento.",
    date: "2025-09-30T16:00:00.000Z",
    contactId: "b6f72a1f-03c1-4f0b-8ff2-b1a88ffb938b",
    contactName: "João Silva",
    advisorName: "Maria Santos",
    status: "CONCLUIDA",
    priority: "BAIXA",
    addressId: "d61b7d22-91f7-4633-9a48-dbbde4f5d134",
    addressName: "Rua das Flores, 123",
    categories: [{ id: "8f0d5d3a-0c25-49e9-95db-26a6e3b4c86f", name: "Relatório" }],
    type: "Tarefa",
    isFavorite: false,
    createdAt: "2025-01-15T10:00:00.000Z",
  },
  {
    id: "2",
    advisorId: "a12b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
    title: "Reunião com cliente",
    description: "Agendar e realizar reunião para discutir o andamento do projeto.",
    date: "2025-02-10T14:00:00.000Z",
    contactId: "c7d8e9f0-1a2b-3c4d-5e6f-7g8h9i0j1k2l",
    contactName: "Ana Costa",
    advisorName: "Pedro Oliveira",
    status: "EM_ANDAMENTO",
    priority: "ALTA",
    addressId: "e3f4g5h6-7i8j-9k0l-1m2n-3o4p5q6r7s8t",
    addressName: "Av. Principal, 456",
    categories: [{ id: "9a0b1c2d-3e4f-5g6h-7i8j-9k0l1m2n3o4p", name: "Reunião" }],
    type: "Ação",
    isFavorite: true,
    createdAt: "2025-01-20T09:30:00.000Z",
  },
  {
    id: "3",
    advisorId: "b23c4d5e-6f7g-8h9i-0j1k-l2m3n4o5p6q7",
    title: "Análise de documentos",
    description: "Revisar e analisar os documentos enviados pelo departamento jurídico.",
    date: "2025-03-05T11:00:00.000Z",
    contactId: "d8e9f0a1-2b3c-4d5e-6f7g-8h9i0j1k2l3m",
    contactName: "Carlos Mendes",
    advisorName: "Juliana Lima",
    status: "PENDENTE",
    priority: "MEDIA",
    addressId: "f4g5h6i7-8j9k-0l1m-2n3o-4p5q6r7s8t9u",
    addressName: "Centro Empresarial, Sala 201",
    categories: [{ id: "0b1c2d3e-4f5g-6h7i-8j9k-0l1m2n3o4p5q", name: "Análise" }],
    type: "Tarefa",
    isFavorite: false,
    createdAt: "2025-01-25T15:45:00.000Z",
  },
]

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const demandasMock = {
  async getAll() {
    await delay(800)
    return [...mockDemandas]
  },

  async getById(id) {
    await delay(500)
    const demanda = mockDemandas.find((d) => d.id === id)
    if (!demanda) throw new Error("Demanda não encontrada")
    return { ...demanda }
  },

  async create(demandData) {
    await delay(600)
    const newDemanda = {
      id: String(Date.now()),
      ...demandData,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    }
    mockDemandas.push(newDemanda)
    return { ...newDemanda }
  },

  async update(id, demandData) {
    await delay(600)
    const index = mockDemandas.findIndex((d) => d.id === id)
    if (index === -1) throw new Error("Demanda não encontrada")

    mockDemandas[index] = {
      ...mockDemandas[index],
      ...demandData,
    }
    return { ...mockDemandas[index] }
  },

  async delete(id) {
    await delay(500)
    const index = mockDemandas.findIndex((d) => d.id === id)
    if (index === -1) throw new Error("Demanda não encontrada")
    mockDemandas.splice(index, 1)
    return true
  },

  async updateStatus(id, status) {
    await delay(400)
    const index = mockDemandas.findIndex((d) => d.id === id)
    if (index === -1) throw new Error("Demanda não encontrada")

    mockDemandas[index].status = status
    return { ...mockDemandas[index] }
  },
}
