import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="bg-white shadow-sm">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex justify-between h-16">
      
      <div className="flex-shrink-0 flex items-center">
        <a href="#" className="text-xl font-bold text-gray-800">Lista de Tarefas</a>
      </div>
      
      
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Todas</a>
        <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">A Fazer</a>
        <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Fazendo</a>
        <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Feitas</a>
        
      </div>
      
      
      <div className="md:hidden flex items-center">
        <button className="text-gray-500 hover:text-gray-900 focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  
  
</nav>
</div>
  
  )
}
