# Code Challenge: Categorização

## Contexto

Você está desenvolvendo um sistema para um comparador de preços que precisa identificar quando diferentes supermercados vendem o mesmo produto, mesmo quando os nomes têm pequenas variações.

## Objetivo

Desenvolver um algoritmo inteligente que categorize produtos de supermercado.

1. **Produtos equivalentes de diferentes supermercados, mesmo com variações na descrição**

   - Exemplo: "Arroz Branco Tio João 5kg" e "Arroz Tio João Branco 5kg" são o mesmo produto.

2. **Produtos similares mas distintos**

   - Exemplo: "Arroz Branco Tio João 5kg" e "Arroz Integral Tio João 5kg" são produtos diferentes.

3. **Produtos com tamanhos/quantidades diferentes**
   - Exemplo: "Leite Integral Italac 1L" e "Leite Integral Italac 2L" devem ser categorizados separadamente.

## Requisitos Técnicos

### Obrigatórios:

- NodeJS

- Implementar uma função que leia o json data01 e retorne um json com os dados categorizados e contados.
- A função deve ser capaz de identificar produtos equivalentes mesmo com:
  - Ordem das palavras trocadas.
  - Pequenas variações de descrição.
  - Diferenças de capitalização.
- A função deve separar produtos com:

  - Tipos diferentes (integral vs. desnatado).
  - Marcas diferentes (Italac vs. Piracanjuba).
  - Tamanhos/quantidades diferentes (1L vs. 2L).

- O resultado deve incluir:
  - Nome da categoria.
  - Contagem de produtos.
  - Lista de produtos na categoria.

## Exemplo

### Entrada

```json
[
  {
    "id": 1,
    "title": "Leite Integral Piracanjuba 1L",
    "supermarket": "Supermercado A"
  },
  {
    "id": 2,
    "title": "Leite Piracanjuba Integral 1L",
    "supermarket": "Supermercado B"
  },
  {
    "id": 3,
    "title": "Leite Integral Italac 1L",
    "supermarket": "Supermercado A"
  },
  {
    "id": 4,
    "title": "Leite Italac Integral 1L",
    "supermarket": "Supermercado C"
  },
  {
    "id": 5,
    "title": "Leite Parmalat Integral 1L",
    "supermarket": "Supermercado D"
  },
  {
    "id": 6,
    "title": "Leite Desnatado Piracanjuba 1L",
    "supermarket": "Supermercado A"
  },
  {
    "id": 7,
    "title": "Piracanjuba Leite Desnatado 1L",
    "supermarket": "Supermercado B"
  },
  {
    "id": 8,
    "title": "Leite Semi-Desnatado Piracanjuba 1L",
    "supermarket": "Supermercado A"
  },
  {
    "id": 9,
    "title": "Leite Piracanjuba Semi Desnatado 1 Litro",
    "supermarket": "Supermercado C"
  },
  {
    "id": 10,
    "title": "Arroz Branco Tio João 5kg",
    "supermarket": "Supermercado A"
  },
  {
    "id": 11,
    "title": "Arroz Tio João Branco 5kg",
    "supermarket": "Supermercado B"
  },
  {
    "id": 12,
    "title": "Arroz Tio João Integral 5kg",
    "supermarket": "Supermercado A"
  },
  {
    "id": 13,
    "title": "Feijão Carioca Camil 1kg",
    "supermarket": "Supermercado A"
  },
  {
    "id": 14,
    "title": "Feijão Camil Tipo Carioca 1kg",
    "supermarket": "Supermercado C"
  },
  {
    "id": 15,
    "title": "Feijao Carioca Camil 1 Quilo",
    "supermarket": "Supermercado D"
  }
]
```

## Saída Esperada

```json
[
  {
    "category": "Leite Integral Piracanjuba 1L",
    "count": 2,
    "products": [
      {
        "title": "Leite Integral Piracanjuba 1L",
        "supermarket": "Supermercado A"
      },
      {
        "title": "Leite Piracanjuba Integral 1L",
        "supermarket": "Supermercado B"
      }
    ]
  },
  {
    "category": "Leite Integral Italac 1L",
    "count": 2,
    "products": [
      {
        "title": "Leite Integral Italac 1L",
        "supermarket": "Supermercado A"
      },
      {
        "title": "Leite Italac Integral 1L",
        "supermarket": "Supermercado C"
      }
    ]
  },
  {
    "category": "Leite Parmalat Integral 1L",
    "count": 1,
    "products": [
      {
        "title": "Leite Parmalat Integral 1L",
        "supermarket": "Supermercado D"
      }
    ]
  },
  {
    "category": "Leite Desnatado Piracanjuba 1L",
    "count": 2,
    "products": [
      {
        "title": "Leite Desnatado Piracanjuba 1L",
        "supermarket": "Supermercado A"
      },
      {
        "title": "Piracanjuba Leite Desnatado 1L",
        "supermarket": "Supermercado B"
      }
    ]
  },
  {
    "category": "Leite Semi-Desnatado Piracanjuba 1L",
    "count": 2,
    "products": [
      {
        "title": "Leite Semi-Desnatado Piracanjuba 1L",
        "supermarket": "Supermercado A"
      },
      {
        "title": "Leite Piracanjuba Semi Desnatado 1 Litro",
        "supermarket": "Supermercado C"
      }
    ]
  },
  {
    "category": "Arroz Branco Tio João 5kg",
    "count": 2,
    "products": [
      {
        "title": "Arroz Branco Tio João 5kg",
        "supermarket": "Supermercado A"
      },
      {
        "title": "Arroz Tio João Branco 5kg",
        "supermarket": "Supermercado B"
      }
    ]
  },
  {
    "category": "Arroz Tio João Integral 5kg",
    "count": 1,
    "products": [
      {
        "title": "Arroz Tio João Integral 5kg",
        "supermarket": "Supermercado A"
      }
    ]
  },
  {
    "category": "Feijão Carioca Camil 1kg",
    "count": 3,
    "products": [
      {
        "title": "Feijão Carioca Camil 1kg",
        "supermarket": "Supermercado A"
      },
      {
        "title": "Feijão Camil Tipo Carioca 1kg",
        "supermarket": "Supermercado C"
      },
      {
        "title": "Feijao Carioca Camil 1 Quilo",
        "supermarket": "Supermercado D"
      }
    ]
  }
]
```

Após conclusão enviar link do seu repo e info para o google [Forms](https://docs.google.com/forms/d/e/1FAIpQLSdm9_Ho3hiSuwBFZpdR-KrP6OKTHa670JGPhAlkM8lum86ZeQ/viewform?usp=dialog)

## Critérios de avaliação:

- Maior pontuação
- Melhor entendimento do código
- Entrega mais rapida

## Solução

```
const fs = require("fs");
const path = require("path");

const data01Path = path.join(__dirname, "../data01.json");
const data01 = JSON.parse(fs.readFileSync(data01Path, "utf-8"));

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, " ") // Remove espaços extras
    .split(" ")
    .sort()
    .join(" ");
}

function categorizeProducts(products) {
  const categories = {};

  products.forEach((product) => {
    const normalizedTitle = normalizeTitle(product.title);
    if (!categories[normalizedTitle]) {
      categories[normalizedTitle] = {
        category: product.title,
        count: 0,
        products: [],
      };
    }
    categories[normalizedTitle].count += 1;
    categories[normalizedTitle].products.push({
      title: product.title,
      supermarket: product.supermarket,
    });
  });

  return Object.values(categories);
}

const categorizedProducts = categorizeProducts(data01);
console.log(JSON.stringify(categorizedProducts, null, 2));

```

### Explicação do Código:

#### Normalização do Título:

A função normalizeTitle converte o título para minúsculas, remove caracteres especiais, remove espaços extras, ordena as palavras e as junta novamente. Isso ajuda a identificar produtos equivalentes mesmo com variações na ordem das palavras ou na capitalização.

#### Categorização dos Produtos:

A função categorizeProducts itera sobre cada produto, normaliza o título e verifica se já existe uma categoria para esse título normalizado.

Se a categoria não existir, ela é criada com o título original do produto, a contagem é inicializada em 0 e uma lista vazia de produtos.

A contagem é incrementada e o produto é adicionado à lista de produtos da categoria.

#### Saída:

A função retorna um array de categorias, onde cada categoria contém o nome da categoria, a contagem de produtos e a lista de produtos.

#### Diagrama de Classes:

<p align="center">
    <a href="https://github.com/jciterceros/challenge01/blob/8012979f1f78ae23ef76842d14e2ac4c5d159cc9/assets/diagram.png" target="blank">
        <img src="https://github.com/jciterceros/challenge01/blob/8012979f1f78ae23ef76842d14e2ac4c5d159cc9/assets/diagram.png" width="600" alt="Diagrama de Classes" />
    </a>
</p>

#### Diagrama de Fluxo:

<p align="center">
    <a href="https://github.com/jciterceros/challenge01/blob/8012979f1f78ae23ef76842d14e2ac4c5d159cc9/assets/flow.png" target="blank">
        <img src="https://github.com/jciterceros/challenge01/blob/8012979f1f78ae23ef76842d14e2ac4c5d159cc9/assets/flow.png" width="600" alt="Diagrama de Fluxo" />
    </a>
</p>

#### Clonando repositorio

```
git clone https://github.com/jciterceros/challenge01.git
```

#### Executando o Código:

```
cd challenge01
npm run dev
```
