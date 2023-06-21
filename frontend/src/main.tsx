import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Modal from './components/Modal.tsx'
import Table from './components/Table.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Modal />
    <Table />
  </React.StrictMode>,
)
