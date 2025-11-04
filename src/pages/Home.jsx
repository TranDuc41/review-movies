import React from 'react'
import { Trending } from '../components/HomePage/Trending'
import { HeroSection } from '../components/HomePage/HeroSection'
import { FeaturedTrailers } from '../components/HomePage/FeaturedTrailers'

export const Home = () => {
  return (
    <div>
        <HeroSection />
        <Trending />
        <FeaturedTrailers />
    </div>
  )
}
