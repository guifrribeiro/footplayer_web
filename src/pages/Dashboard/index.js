import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const[courts, setCourts] = useState([]);

  useEffect(() => {
    async function loadCourts() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setCourts(response.data);
    }

    loadCourts();
  }, []);
  return (
    <>
      <ul className="court-list">
        {courts.map(court => (
          <li key={court._id}>
            <header style={{ backgroundImage: `url(${court.thumbnail_url})` }} />
            <strong>{court.company}</strong>
            <span>{court.price ? `R$${court.price}/hora` : `GRATUITO`}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar nova quadra</button>
      </Link>
    </>
  )
}