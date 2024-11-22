import { Divider , Breadcrumb,Table,Button, Flex,Modal,Input, Alert} from 'antd';
import { createUser, deleteUser, fetchAllUser, updateUser } from '../../api/user.api';
import DeleteButton from '../../components/DeleteButton';
import { useState ,useEffect } from 'react';
import EditButton from '../../components/EditButton';
import {PageTitle} from '../../components/PageTitle';

function UserPage() {

  const[users,setUsers]=useState([]);
  const[isModalOpen,setModalOpen]=useState(false);
  const[user,setUser]=useState({id:undefined,name:undefined,email:undefined,joinedDate:undefined});
  const[isEditingUser,setIsEditingUser]=useState(false);
  const[isDeleteModalOpensUser,setDeleteModalOpenUser]=useState(false);

  const loadUsers=()=>{
    fetchAllUser().then(users => setUsers(users)).catch(error=> console.error(error));

  };

  const onUserNameChange =(e)=>{
    setUser({
      ...user,
      name:e.target.value

    });
  };
  const onUserEmailChange =(e)=>{
    setUser({
      ...user,
      email:e.target.value
    });
  };
  const onUserJoindDateeChange =(e)=>{
    setUser({
      ...user,
      joinedDate:e.target.value
    });
  };

  const handleOk=()=>{
    if(isEditingUser){
      updateUser(user).then(()=>{
        setModalOpen(false);
        setUser({});
        loadUsers();
      }).finally(()=>{
        setIsEditingUser(false);
      });
    }
    else{
      createUser(user).then(()=>{
        setModalOpen(false);
        setUser({});
        loadUsers();
      });
    }

  };

  const handleCancel=()=>{
    setModalOpen(false);
    setIsEditingUser(false);
  };
  const ShowModal=()=>{
    setModalOpen(true);
  };

  useEffect(() => {
    fetchAllUser().then(users => setUsers(users)).catch(error=> console.error(error));

  }, []);

  const handleDeleteOk=()=>{
    deleteUser(user).then(()=>{
      setDeleteModalOpenUser(false);
      loadUsers();
    }).finally(()=> setUser({}));

  };
  const handleDeleteCancel=()=>{
    setDeleteModalOpenUser(false);
  };

  const columns = [
    {
      title: 'Id',
      key: 'id',
      render: (user) => <span>{user.id}</span>,
      width: '20%'
    },
    {
      title: 'Name',
      key: 'name',
      render: (user) => <span>{user.name}</span>,
      width: '20%'
    },
    {
      title: 'Email',
      key: 'email',
      render: (user) => <span>{user.email}</span>,
      width: '30%'
    },
    {
      title: 'joinedDate',
      key: 'joineddate',
      render: (user) => <span>{user.joinedDate}</span>,
      width: '30%'
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (user) => (
        <EditButton onClick={()=>{
          setModalOpen(true);
          setUser(user);
          setIsEditingUser(true);

        }} />
      ),
    },

    {

      title: 'Delete',
      key: 'delete',
      render: (user) => (
        <DeleteButton onClickDeleteButton={()=>{
          setUser(user);
          setDeleteModalOpenUser(true);
        }} />

      ),
    },
  ];
  const confirmDeletionMessage = `Est ce que vous confirmez la suppression de l'utilisateur ${user.name} ?`;

  const modalTitle = isEditingUser ? 'Modifier Utilisateur' : ' Ajouter Utilisateur ';
  const buttonModal = isEditingUser ? 'Modifier' : 'Enregistré' ;

  return (
    <div>
      <PageTitle title='Gestion des utilisateurs'/>

      <Flex vertical >
        <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={buttonModal} >
          <label >  Name :  </label>
          <Input placeholder='entre votre nom' value={user.name} onChange={onUserNameChange} />
          <label > Email :  </label>
          <Input placeholder='entre votre email' value={user.email} onChange={onUserEmailChange} />
          <label > Membre Depuis :  </label>
          <Input placeholder='entre la date join ' value={user.joinedDate} onChange={onUserJoindDateeChange} />
        </Modal>

        <Modal title="Suppression d'utilisateur" open={isDeleteModalOpensUser} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
          <Alert message={confirmDeletionMessage} type='error'/>

        </Modal>
      </Flex >

      <Breadcrumb items={[
        {
          title: 'Home',
        },
        {
          title: 'Users',
        }
      ]}/>

      <Divider />
      <Flex horizontal={'true'} justify={'flex-end'}style={{'padding-bottom': 5}} >

        <Button className='button-modal' variant='outlined' onClick={ShowModal} > Ajoute un utilisateur   </Button>
      </Flex>

      <Flex vertical>

        <Table rowKey={book => book.id} columns={columns} dataSource={users} />
      </Flex>

    </div>

  );
}

export default UserPage;
