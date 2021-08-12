import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Header, Icon, Input, Modal, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios'

function List() {
    const [searchTitle, setSearchTitle] = useState('')
    const [searchType, setSearchType] = useState('name')
    const [usersData, setUsersData] = useState([])
    const [userID, setUserID] = useState('')
    const [count, setCount] = useState('')
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [sortType, setSortType] = useState('')
    const [sortDirection, setSortDirection] = useState('')

    const [nameIcon, setNameIcon] = useState('sort')
    const [emailIcon, setEmailIcon] = useState('sort')
    const [jobIcon, setJobIcon] = useState('sort')
    const searchOptions = [
        { key: 'name', text: 'Nome', value: 'name'},        
        { key: 'email', text: 'E-Mail', value: 'email'},
        { key: 'job', text: 'Cargo', value: 'job'}
    ]

    const getData = () => {
        axios.get('https://610971a5d71b670017639916.mockapi.io/api/v1/users')
        .then((res) => {
            console.log(res);

            setUsersData(res.data.items)
            setCount(res.data.count)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getDataFilter = () => {
        axios.get(`https://610971a5d71b670017639916.mockapi.io/api/v1/users?${searchType}=${searchTitle}`)
        .then((res) => {
            console.log(res);

            setEmailIcon('sort')
            setJobIcon('sort')
            setNameIcon('sort')
            setUsersData(res.data.items)
            setCount(res.data.items.length)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deleteUser = () => {
        axios.delete(`https://610971a5d71b670017639916.mockapi.io/api/v1/users/${userID}`)
        .then(res => {
            console.log(res)
            getData()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const updateUser = (data) => {
        localStorage.setItem('ID',data.id)
    } 

    function changeIcons(type) {
        if(type === 'name'){
            setEmailIcon('sort')
            setJobIcon('sort')
            if(nameIcon === 'sort')
                setNameIcon('sort down')
            else if(nameIcon === 'sort down')
                setNameIcon('sort up')
            else
                setNameIcon('sort down')
        } else if(type === 'email') {
            setNameIcon('sort')
            setJobIcon('sort')
            if(emailIcon === 'sort')
                setEmailIcon('sort down')
            else if(emailIcon === 'sort down')
                setEmailIcon('sort up')
            else
                setEmailIcon('sort down')
        } else {
            setEmailIcon('sort')
            setNameIcon('sort')
            if(jobIcon === 'sort')
                setJobIcon('sort down')
            else if(jobIcon === 'sort down')
                setJobIcon('sort up')
            else
                setJobIcon('sort down')
        }
    }

    const sortUsers = (type) => {
        let direction = 'asc'
        if(sortType !== type) 
            setSortType(type)
        else if(sortDirection === 'asc')
            direction = 'desc'

        setSortDirection(direction)

        changeIcons(type)

        let api = 'https://610971a5d71b670017639916.mockapi.io/api/v1/users'
        if(searchTitle !== '')
            api += `?${searchType}=${searchTitle}&sortBy=${type}&order=${direction}`
        else
            api += `?sortBy=${type}&order=${direction}`

        axios.get(api)
        .then((res) => {
            console.log(res);

            setUsersData(res.data.items)
            setCount(res.data.items.length)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    return (
        <div>
            <div className='main-search'>
                <Input 
                    label={
                        <Dropdown 
                            value={searchType}
                            options={searchOptions}
                            onChange={(event, data) => setSearchType(data.value)}
                        />
                    }
                    labelPosition='right'
                    className='search-input'
                    placeholder='Digite sua busca aqui'
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                
                <button className='btn search-button' onClick={getDataFilter}>
                    Procurar
                </button>
            </div>
            <div>
                <Table style={ {width: '800px'} } singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                style={{cursor: 'pointer'}}
                                onClick={() => sortUsers('name')}
                            >
                                Nome Completo<Icon name={nameIcon} />
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                style={{cursor: 'pointer'}}
                                onClick={() => sortUsers('email')}
                            >
                                E-Mail<Icon name={emailIcon} />
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                style={{cursor: 'pointer'}}
                                onClick={() => sortUsers('job')}
                            >
                                Cargo<Icon name={jobIcon} />
                            </Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            usersData.map((data) => {
                                return (
                                    <Table.Row key={data.id}>                                    
                                        <Table.Cell>{data.name}</Table.Cell>
                                        <Table.Cell>{data.email}</Table.Cell>
                                        <Table.Cell>{data.job}</Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            <Link to='/update'>                         
                                                <button className='btn list-button update-button' onClick={() => updateUser(data)} >Atualizar</button>
                                            </Link>
                                            
                                            <Modal 
                                                closeIcon
                                                trigger={
                                                    <button 
                                                        className='btn delete-button list-button' 
                                                        type='button' 
                                                        onClick={() => setUserID(data.id)}
                                                    >
                                                        Deletar
                                                    </button>}
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
                                                    <Button color='red' onClick={() => {deleteUser(); setOpenDeleteModal(false)}}>
                                                        <Icon name='checkmark'/>Sim
                                                    </Button>
                                                </Modal.Actions>
                                            </Modal>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell>{count} Usuários</Table.HeaderCell>
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        </div>
    )
}

export default List