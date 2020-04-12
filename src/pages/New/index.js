import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.png';

import './styles.css';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [sports, setSports] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  // Store the new court
  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('sports', sports);
    data.append('price', price);

    await api.post('/courts', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Selecione uma imagem" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua quadra incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="sports">ESPORTES * <span>(separados por vírgula)</span></label>
      <input
        id="sports"
        placeholder="Para quais esportes?"
        value={sports}
        onChange={event => setSports(event.target.value)}
      />

      <label htmlFor="price">VALOR DA HORA * <span>(em branco para GRATUITO)</span></label>
      <input
        id="price"
        placeholder="Valor cobrado pela hora"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Cadastrar</button>

    </form>
  )
}