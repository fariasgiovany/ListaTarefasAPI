"use client"
import React, { useState, useEffect } from 'react';
import { Tarefas } from '../Tipos';



export default function Listarfazer() {

    const [afazer, setAfazer] = useState<Tarefas[]>([]);
    const [cfazendo, setCfazendo] = useState<Tarefas[]>([]);
    const [feitas, setFeitas] = useState<Tarefas[]>([]);
    const [,setTotal] = useState<Tarefas[]>([]);

  useEffect(() => {/*não tirar esse uaseefect quebra tudo */
    
    GetData(setAfazer,"listafazer");
    GetData(setCfazendo,"listafazendo");
    GetData(setFeitas,"listafeito");
    GetData(setTotal,"lista");
  
  }, []);
  async function Enviadados(
    uso: Tarefas[],
    setUso: React.Dispatch<React.SetStateAction<Tarefas[]>>,
    id: number,
    destino: number
  ) {
    await Alterarestado(uso, setUso, id, destino);
  
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
  }
  async function Adicionartarefa(
    posts: Tarefas[],
    setPosts: React.Dispatch<React.SetStateAction<Tarefas[]>>,
    tarefa: string
  ) {
    const content = JSON.stringify({ lista: tarefa, status: 0 });
  
    try {
      const response = await fetch(`http://192.168.0.3:8000/lista/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: content,
      });
  
      if (response.ok) {
        const i = findMaxId(posts); // Find the max ID in the current list
        setPosts([...posts, { tarefa, status: 0, id: i + 1 }]); // Add the new task
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
  

  return (
  
     <div>
      <div>
        <label >Nova tarefa:</label>
        <input type="text" id="taskInput" placeholder="escreva a nova tarefa" />
        <button onClick={() => {
          const inputElement = document.getElementById('taskInput') as HTMLInputElement;
          if (inputElement) Adicionartarefa(afazer,setAfazer,inputElement.value);
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
                <button onClick={() => Enviadados(afazer, setAfazer, posts.id, 1)}>Fazendo</button>
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
                <button onClick={() => Enviadados(cfazendo, setCfazendo, posts.id, 2)}>Feitos</button>
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
                <button onClick={() => Enviadados(feitas, setFeitas, posts.id, 0)}>Refazer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      
    </div>
    
  )

}

export async function GetData(setAfazer: React.Dispatch<React.SetStateAction<Tarefas[]>>, url: string) {
  try {
    const response = await fetch('http://192.168.0.3:8000/' + url);
    const data = await response.json();
    setAfazer(data); // Use the setter function passed as an argument
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function Alterarestado(
  afazer: Tarefas[],
  setAfazer: React.Dispatch<React.SetStateAction<Tarefas[]>>,
  id: number,
  destino: number
) {
  console.log(id);
  const tarefa = afazer.find((post) => post.id === id)?.tarefa;
  const content = JSON.stringify({ lista: tarefa, status: destino });
  console.log(content);

  const response = await fetch(`http://192.168.0.3:8000/lista/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: content,
  });

  if (response.ok) {
    const updatedPosts = afazer.filter((post) => post.id !== id);
    setAfazer(updatedPosts); // Use the setter function to update the state
  }
}

function findMaxId(tasks: Tarefas[]): number {
  if (tasks.length === 0) return 0; // Return 0 if the list is empty
  return Math.max(...tasks.map((task) => task.id));
}