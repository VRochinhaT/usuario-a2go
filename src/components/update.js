import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Header, Icon, Modal} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function Update() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [job, setJob] = useState('')
    const [id, setId] = useState('')
    const [openUpdateModal, setOpenUpdateModal] = useState(false)    
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    useEffect( () => {
        let id = localStorage.getItem('ID')
        setId(id)
        axios.get(`https://610971a5d71b670017639916.mockapi.io/api/v1/users/${id}`)
        .then((res) => {
            console.log(res);

            setName(res.data.name)
            document.getElementById('nameInput').value = res.data.name
            setEmail(res.data.email)
            document.getElementById('emailInput').value = res.data.email
            setJob(res.data.job)
            document.getElementById('jobInput').value = res.data.job
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const updateUser = (event) => {
        event.preventDefault()
        axios.put(`https://610971a5d71b670017639916.mockapi.io/api/v1/users/${id}`, {
            name, email, job
        })
        .then(res => {
            console.log(res);

            setOpenUpdateModal(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deleteUser = () => {
        axios.delete(`https://610971a5d71b670017639916.mockapi.io/api/v1/users/${id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>           
            <div className='main-title'>
                <span className='title'>Atualização</span>
            </div>
            <form className='create-form' onSubmit={updateUser}>
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

                <Modal 
                    trigger={<button className='btn update-button form-button' type='submit'>Atualizar</button>}
                    open={openUpdateModal}
                    onClose = {() => setOpenUpdateModal(false)}
                >
                    <Header icon='clone' content='Atualizado!'/>
                    <Modal.Content>
                        <p>
                            Atualização do usuário realizado com sucesso.
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Link to='/list'>
                            <Button color='green' onClick={() => setOpenUpdateModal(false)}>
                                <Icon name='checkmark'/>Sucesso
                            </Button>
                        </Link>
                    </Modal.Actions>
                </Modal>

                <Modal 
                    closeIcon
                    trigger={<button className='btn delete-button form-button' type='button'>Deletar</button>}
                    open={openDeleteModal}
                    onOpen = {() => setOpenDeleteModal(true)}
                    onClose = {() => setOpenDeleteModal(false)}
                >
                    <Header icon='trash' content='Deletar usuário?'/>
                    <Modal.Content>
                        <p>
                            Você tem certeza que deseja deletar o usuário?
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => setOpenDeleteModal(false)}>
                            <Icon name='remove' />Não
                        </Button>

                        <Modal
                            trigger={<Button color='red' onClick={() => {deleteUser()}}>
                                    <Icon name='checkmark'/>Sim
                                </Button>}
                        >
                            <Header icon='trash' content='Deletado!'/>
                            <Modal.Content>
                                <p>
                                    Usuário deletado com sucesso.
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Link to='/list'>
                                    <Button color='red' onClick={() => {setOpenDeleteModal(false)}}>
                                        <Icon name='checkmark'/>Okay
                                    </Button>
                                </Link>
                            </Modal.Actions>
                        </Modal>
                    </Modal.Actions>
                </Modal>
            </form>
        </div>
    )
}

export default Update