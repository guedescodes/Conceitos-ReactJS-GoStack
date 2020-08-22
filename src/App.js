import React, {useState, useEffect} from "react";
import Api from "./services/api";
import "./styles.css";
import { wait } from "@testing-library/react";
import api from "./services/api";

function App() {

  const [repositories, setRepositories ] = useState([]);
  
  useEffect(() => {
    Api.get('repositories').then(Response => {
      setRepositories(Response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await Api.post('repositories',
      {
        title:`Project ${Date.now()}`,
        url:"https://github.com/guedescode/Conceitos-nodejs",
        techs: "['c#','react','js']"
      })      
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {   
      await api.delete(`repositories/${id}`)
      setRepositories(repositories.filter(repo => repo.id != id));  
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
              return (
                  <li key={repo.id}>
                    {repo.title} <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
                  </li>
               );
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
