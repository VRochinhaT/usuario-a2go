import React, { useState } from 'react'
import axios from 'axios'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function Create() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [job, setJob] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const clearStates = () => {
        document.querySelectorAll('input').forEach(
            input => (input.value = '')
        )
    }

    const createUser = (event) => {
        event.preventDefault()
        axios.post(
            'https://610971a5d71b670017639916.mockapi.io/api/v1/users', {
                name, email, job
            }
        )
        .then(res => {
            console.log(res);

            setOpenModal(true)
            clearStates()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className='main-title'>
                <span className='title'>Cadastro</span>
            </div>
            <form className='create-form' onSubmit={createUser}>
                <div>
                    <label htmlFor='nameInput' className='form-label'>Nome Completo</label>
                    <input 
                        type='text' 
                        id='nameInput' 
                        className='form-input' 
                        placeholder='Insira seu nome' 
                        required 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='emailInput' className='form-label'>E-Mail</label>
                    <input 
                        type='email' 
                        id='emailInput' 
                        className='form-input' 
                        placeholder='Insira seu e-mail' 
                        required 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='jobInput' className='form-label'>Cargo</label>
                    <input 
                        type='text' 
                        id='jobInput' 
                        className='form-input' 
                        placeholder='Insira seu cargo' 
                        required 
                        onChange={(e) => setJob(e.target.value)}
                    />
                </div>

                <button className='btn create-button form-button' >Cadastrar</button>
                <Modal 
                    open={openModal}
                    onOpen = {() => setOpenModal(true)}
                    onClose = {() => setOpenModal(false)}
                >
                    <Header icon='save' content='Cadastrado!'/>
                    <Modal.Content>
                        <p>
                            Cadastro de usuário realizado com sucesso.
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => setOpenModal(false)}>
                            <Icon name='checkmark'/>Sucesso
                        </Button>
                    </Modal.Actions>
                </Modal>
            </form>
        </div>
    )
}

export default Create