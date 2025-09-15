'use server'

const url = `http://localhost:3000/api/v1/`

export const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
