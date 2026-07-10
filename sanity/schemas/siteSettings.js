import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuracoes do site",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Texto pequeno do topo",
      type: "string",
      initialValue: "Drop cristao autoral",
    }),
    defineField({
      name: "heroTitle",
      title: "Titulo principal",
      type: "string",
      initialValue: "Streetwear cristao com mensagem.",
    }),
    defineField({
      name: "heroText",
      title: "Texto do banner principal",
      type: "text",
      rows: 3,
      initialValue:
        "Criamos estampas unicas para camisetas que expressam sua personalidade. SACERIS, estilo que fala por voce.",
    }),
    defineField({
      name: "promoMessages",
      title: "Mensagens da faixa superior",
      description: "Uma mensagem por linha/bloco.",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Compra segura pelo Mercado Pago.",
        "Use o WhatsApp para tamanhos, grupos e revenda.",
        "SACERIS - Fe nas ruas.",
      ],
    }),
    defineField({
      name: "defaultPaymentUrl",
      title: "Link padrao de compra",
      description: "Usado quando o produto nao tiver link proprio.",
      type: "url",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp",
      description: "Somente numeros com codigo do pais. Exemplo: 5519982214588.",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configuracoes do site" }),
  },
});
