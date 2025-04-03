
"use client"
import React, { useState, useEffect } from 'react';
import { Tarefas } from '../Tipos';
import { stringify } from 'querystring';
import { json } from 'stream/consumers';
import { useRouter } from 'next/navigation';

export default function Listarfazer() {

    const [afazer, setAfazer] = useState<Tarefas[]>([]);
    const [cfazendo, setCfazendo] = useState<Tarefas[]>([]);
    const [feitas, setFeitas] = useState<Tarefas[]>([]);
    const Router = useRouter();

  useEffect(() => {
    
    getData([afazer, setAfazer],"listafazer");
    getData([cfazendo, setCfazendo],"listafazendo");
    getData([feitas, setFeitas],"listafeito");
  
  }, []);
  async function enviadados([uso, setUso] = useState<Tarefas[]>([]),id: number, destino:number) {
    Alterarestado([uso, setUso],id, destino);
    if (destino === 0) {
      const updatedPosts = uso.filter((post) => post.id !== id);
      setUso(updatedPosts);
      const updatedPosts2 = uso.filter((post) => post.id === id);
      setAfazer([...afazer, ...updatedPosts2]);
      Router.push('/');
    }
    if (destino === 1) {
      const updatedPosts = uso.filter((post) => post.id !== id);
      setUso(updatedPosts);
      const updatedPosts2 = uso.filter((post) => post.id === id);
      setCfazendo([...cfazendo, ...updatedPosts2]);
      Router.push('/');
    }
    if (destino === 2) {
      const updatedPosts = uso.filter((post) => post.id !== id);
      setUso(updatedPosts);
      const updatedPosts2 = uso.filter((post) => post.id === id);
      setFeitas([...feitas, ...updatedPosts2]);
      Router.push('/');
    }
    
  }
  async function fazendo(id:number) {
    console.log(id);
    const tarefa = afazer.find(post => post.id === id)?.tarefa;
    const content = JSON.stringify({ lista: tarefa, status: 1 });
    console.log(content);
    const response = await fetch(`http://192.168.0.3:8000/lista/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }, body: content
      });
      const updatedPosts = afazer.filter((post) => post.id !== id);
      console.log(updatedPosts);
      setAfazer(updatedPosts);
    }
  

  return (
  
     <div>
      
      <table border={5}>
        <thead>
          <tr>
            <th>Tarefa Para Fazer</th>
            <th>ação</th>
          </tr>
        </thead>
        <tbody>
          {afazer.map((posts) => (
            <tr key={posts.id}>
              <td className='pr-20'>{posts.tarefa}</td>
              <td>
                <button onClick={() => enviadados([afazer,setAfazer],posts.id,1)}>Fazendo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table border={5}>
        <thead>
          <tr>
            <th>Tarefas Fazendo</th>
            <th>ação</th>
          </tr>
        </thead>
        <tbody>
          {cfazendo.map((posts) => (
            <tr key={posts.id}>
              <td className='pr-20'>{posts.tarefa}</td>
              <td>
                <button onClick={() => enviadados([cfazendo, setCfazendo],posts.id,2)}>Feitos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table border={5}>
        <thead>
          <tr>
            <th>Tarefas Feitas</th>
            <th>ação</th>
          </tr>
        </thead>
        <tbody>
          {feitas.map((posts) => (
            <tr key={posts.id}>
              <td className='pr-20'>{posts.tarefa}</td>
              <td>
                <button onClick={() => enviadados([feitas, setFeitas],posts.id,0)}>Feitos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      
    </div>
    
  )

}

export async function getData([afazer, setAfazer] = useState<Tarefas[]>([]),url:string) {
  try {
  const response = await fetch('http://192.168.0.3:8000/'+url);
  const data = await response.json();
  setAfazer(data);
} catch (error) {
  console.error('Error fetching data:', error);
}}

export async function Alterarestado([afazer, setAfazer] = useState<Tarefas[]>([]),id: number, destino:number) {
  console.log(id);
  const tarefa = afazer.find(post => post.id === id)?.tarefa;
  const content = JSON.stringify({ lista: tarefa, status: destino });
  console.log(content);
  const response = await fetch(`http://192.168.0.3:8000/lista/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }, body: content
    });
    
  }