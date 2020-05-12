import React, { useState } from 'react';
import Api from "../../services/api";
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import Logo from '../../assets/logo.svg';
import InputMask from 'react-input-mask';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function HandleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const res = await Api.post('ongs', data);
            alert(`seu ID de acesso ${res.data.id}`);
            history.push('/');
            
        } catch (err) {
            alert('Erro no cadastro tente novamente')
        
        }
    }

    return (
        <div className="container-register">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be The Hero" />

                    <h1>Ajude o mundo!</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color='#00cc66' />
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={HandleRegister}>
                    <InputMask
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                   
                    <InputMask
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputMask
                        placeholder="Telefone"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        mask="(99)99999-9999"
                    />
                    <div className="input-group">
                        <InputMask
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <InputMask
                            placeholder="UF"
                            style={{ width: 80 }}
                            type='text'
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}