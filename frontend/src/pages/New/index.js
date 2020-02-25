import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import './styles.css';

import camera from '../../assets/camera.svg';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
      () => {return thumbnail ? URL.createObjectURL(thumbnail) : null},
      [thumbnail]
    );

    async function handleSubmit(event){
      event.preventDefault();

      const user_id = localStorage.getItem('user');
      const data = new FormData();
      data.append('thumbnail', thumbnail)
      data.append('company', company)
      data.append('techs', techs)
      data.append('price', price)

      await api.post('/spots', data, {
        headers: { user_id }
      })

      history.push('/dashboard')
    }
    return (
        <form onSubmit={handleSubmit}>
          <label 
          id="thumbnail" 
          style={{ backgroundImage: `url(${preview})`}}
          className={thumbnail ? 'has-thumbnail' : ''}
          >
            <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
            <img style={{height: '50px', width:'50px'}} src={camera} alt="Select image"/>
          </label>
            <label htmlFor="company">EMPRESA *</label>
            <input id="company" 
              placeholder="Sua empresa incrível" 
              value={company}
              onChange={event => setCompany(event.target.value)}
              type="text"
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgula)</span></label>
            <input id="techs" 
              placeholder="Quais tecnologias usam?" 
              value={techs}
              onChange={event => setTechs(event.target.value)}
              type="text"
            />
            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input id="price" 
              placeholder="Quais tecnologias usam?" 
              value={price}
              onChange={event => setPrice(event.target.value)}
              type="text"
            />

        <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}