export type Review = {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
}

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Ines V.',
    rating: 5,
    title: 'A quiet masterpiece',
    body: 'The cut is architectural without being severe. The weight of the wool is perfect for winter evenings.',
    date: 'March 2026',
  },
  {
    id: 'r2',
    author: 'Julien A.',
    rating: 5,
    title: 'Investment piece',
    body: 'Fabric and finish are beyond expectations. Feels like couture at a fraction of the price.',
    date: 'February 2026',
  },
  {
    id: 'r3',
    author: 'Mika S.',
    rating: 4,
    title: 'Beautifully made',
    body: 'Runs slightly oversized — I sized down and it drapes exactly as pictured.',
    date: 'January 2026',
  },
]
