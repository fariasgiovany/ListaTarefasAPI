
"use client"
import React, { useState, useEffect } from 'react';
import { Tarefas } from '../Tipos';
import { stringify } from 'querystring';
import { json } from 'stream/consumers';


export default function Listarfazer() {

    const [afazer, setAfazer] = useState<Tarefas[]>([]);
    const [cfazendo, setCfazendo] = useState<Tarefas[]>([]);
    const [feitas, setFeitas] = useState<Tarefas[]>([]);
    const [total,setTotal] = useState<Tarefas[]>([]);

  useEffect(() => {/*não tirar esse uaseefect quebra tudo */
    
    getData([afazer, setAfazer],"listafazer");
    getData([cfazendo, setCfazendo],"listafazendo");
    getData([feitas, setFeitas],"listafeito");
    getData([total, setTotal],"lista");
  
  }, []);
  async function enviadados([uso, setUso] = useState<Tarefas[]>([]),id: number, destino:number) {
    Alterarestado([uso, setUso],id, destino);
    if (destino === 0) {   
      const updatedPosts = uso.filter((post) => post.id !== id);
      setUso(updatedPosts);
      const updatedPosts2 = uso.filter((post) => post.id === id);
      setAfazer([...afazer, ...updatedPosts2]);
      
    }
    if (destino === 1) {
      const updatedPosts = uso.filter((post) => post.id !== id);
      setUso(updatedPosts);
      const updatedPosts2 = uso.filter((post) => post.id === id);
      setCfazendo([...cfazendo, ...updatedPosts2]);
      
    }
    if (destino === 2) {
      const updatedPosts = uso.filter((post) => post.id !== id);
      setUso(updatedPosts);
      const updatedPosts2 = uso.filter((post) => post.id === id);
      setFeitas([...feitas, ...updatedPosts2]);
      
    }
    if (destino === 3) {
      const updatedPosts = uso.filter((post) => post.id !== id);
      setUso(updatedPosts);
    }
    
  }
  async function adicionartarefa([posts, setPosts] = useState<Tarefas[]>([]),tarefa: string){
    const content= JSON.stringify({ lista: tarefa, status: 0 });
    const response = await fetch(`http://192.168.0.3:8000/lista/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: content
      });
      var i=findMaxId(total);
     
    setTotal([...total, {tarefa: tarefa, status:0, id: i+1}]);
    setPosts([...posts, {tarefa: tarefa, status:0, id: i+1}]);

  }
  

  return (
  
     <div>
      <div>
        <label >Nova tarefa:</label>
        <input type="text" id="taskInput" placeholder="escreva a nova tarefa" />
        <button onClick={() => {
          const inputElement = document.getElementById('taskInput') as HTMLInputElement;
          if (inputElement) adicionartarefa([afazer,setAfazer],inputElement.value);
        }}>adicionar tarefa</button>
      </div>
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

  function findMaxId(tasks: Tarefas[]): number {
    if (tasks.length === 0) return 0; // Return 0 if the list is empty
    return Math.max(...tasks.map((task) => task.id));
  }