import React from 'react'
import logoImg from './logo.png'

export const Logo: React.FC = () => {
  return (
    <img 
      src={logoImg} 
      alt="Church Logo" 
      className="size-6"
    />
  )
} 