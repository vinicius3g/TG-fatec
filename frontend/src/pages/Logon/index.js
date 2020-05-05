import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Api from '../../services/api';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');

    const history = useHistory();

    async function HandleLogin(e) {
        e.preventDefault();

        try {
            const res = await Api.post('sessions', { id });
            alert(`Bem vinda ${res.data.name}`);

            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', res.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Erro no login tente novamente.')
        }
    }
    return (
        <div className="container-logon">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={HandleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color='#E02041' />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}
