import { useState } from 'react'
import React from 'react' 
import './App.css'
import { News } from './compoenents/news'

import { Index } from './compoenents'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Financials from './compoenents/financial'

function App() {
  

  return <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        <Route path='/news' element={<News/>}/>
        <Route path='/financials' element={<Financials/>}/>

        
      </Routes>
    </BrowserRouter>
  </>
}

export default App
