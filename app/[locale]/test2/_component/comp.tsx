"use client"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import React from 'react'

const Comp = () => {
    let i=2
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch(`https://api.github.com/repos/TanStack/${i}`).then((res) =>
            res.json(),
          ),
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
    

      
  return (
    <div>
    <h1>{data.name}</h1>
    <p>{data.description}</p>
    <strong>👀 {data.subscribers_count}</strong>{' '}
    <strong>✨ {data.stargazers_count}</strong>{' '}
    <strong>🍴 {data.forks_count}</strong>
  </div>
  )
}

export default Comp