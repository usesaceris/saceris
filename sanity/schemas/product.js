import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produtos",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome da camiseta",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identificador",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "active",
      title: "Mostrar no site",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "tag",
      title: "Etiqueta",
      description: "Exemplo: Lancamento, Destaque, Essencial.",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Preco",
      description: "Digite como deve aparecer no site. Exemplo: R$ 179,90.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "colors",
      title: "Cores disponiveis",
      description: "Exemplo: 1 cor, 2 cores, preta e branca.",
      type: "string",
    }),
    defineField({
      name: "paymentUrl",
      title: "Link de pagamento",
      description: "Link do Mercado Pago ou WhatsApp para comprar esta peca.",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Foto do produto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo da imagem",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      title: "Ordem no site",
      description: "Numeros menores aparecem primeiro.",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "image",
    },
  },
});
