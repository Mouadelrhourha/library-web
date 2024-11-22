import { Divider , Breadcrumb,Table,Flex,Button, Modal, Select, Input} from 'antd';
import { useState ,useEffect} from 'react';
import { createBorrow, fetchAllBorrows, updateBorrows } from '../../api/borrow.api';
import EditButton from '../../components/EditButton';
import { fetchAllBook } from '../../api/book.api';
import { fetchAllUser } from '../../api/user.api';
import {PageTitle} from '../../components/PageTitle';

function BorrowPage() {

  const[borrows,setBorrows]=useState([]);
  const[isModalOpen,setIsModalOpen]=useState(false);
  const[isEditBorrowModalOpen,setEditBorrowIsModalOpen]=useState(false);
  const[books,setBooks]=useState([]);
  const[bookId,setBookId]=useState();
  const[users,setUsers]=useState([]);
  const[userId,setUserId]=useState();
  const[borrowDate,setBorrowDate]=useState();
  const[returnDate,setReturnDate]=useState();
  const [selectedBorrow, setSelectedBorrow] = useState();
  const showModal=()=>{
    setIsModalOpen(true);
  };

  const resetForm=()=>{
    setBookId(null);
    setUserId(null);
    setBorrowDate(null);
    setReturnDate(null);
  };
  const handleOK=()=>{
    if(isEditBorrowModalOpen){
      updateBorrows(selectedBorrow.id,{userId,bookId,borrowDate,returnDate}).then(()=>{
        setEditBorrowIsModalOpen(false);
        loadBorrows();
        setIsModalOpen(false);
      });
    }
    else{
      createBorrow( {userId, bookId, borrowDate, returnDate }).then(()=>{
        setIsModalOpen(false);
        resetForm();
        loadBorrows();
      });
    }

  };

  const handleCancel=()=>{
    setIsModalOpen(false);
    resetForm();
  };

  const loadBorrows=()=>{
    fetchAllBorrows().then(borrows=>setBorrows(borrows)).catch(error => console.error(error));

  };
  const loadBooks=()=>{
    fetchAllBook().then((book)=>{
      setBooks(book);
    }).catch(error => console.error(error));
  };

  const loadUsers=()=>{
    fetchAllUser().then((user)=>{
      setUsers(user.map((user)=>{
        return {...user,label : `${user.name} - ${user.email}` };
      }));
    }).catch(error => console.error(error));
  };

  const onBookChange=(value)=>{
    setBookId(value);
  };

  const onUserChange=(value)=>{

    setUserId(value);

  };
  const onBorrowDateChange=(e)=>{
    setBorrowDate(e.target.value);

  };
  const onReturneDateChange=(e)=>{
    setReturnDate(e.target.value);
  };

  useEffect(() => {
    loadBorrows();
    loadUsers();
    loadBooks();
    // loadCategories();

  }, []);
  const columns = [
    {
      title: 'Id',
      key: 'id',
      render: (borrow) => <span>{borrow.id}</span>,
      width: '10%'
    },
    {
      title: 'User Name ',
      key: 'Username',
      render: (borrow) => <span>{borrow.user.name}</span>,
      width: '10%'
    },

    {
      title: 'join Date',
      key: 'joinedate',
      render: (borrow) => <span>{borrow.user.joinedDate}</span>,
      width: '10%'
    },
    {
      title: 'Email',
      key: 'email',
      render: (borrow) => <span>{borrow.user.email}</span>,
      width: '10%'
    },

    {
      title: 'Title',
      key: 'title',
      render: (borrow) => <span>{borrow.book.title}</span>,
      width: '10%'
    },

    {
      title: 'Category Name ',
      key: 'categoryname',
      render: (borrow) => <span>{borrow.book.category.name}</span>,
      width: '10%'
    },
    {
      title: 'Borrow Date ',
      key: 'borrowdate',
      render: (borrow) => <span>{borrow.borrowDate}</span>,
      width: '11%'
    },
    {
      title: 'Return Date ',
      key: 'returndate',
      render: (borrow) => <span>{borrow.returnDate}</span>,
      width: '12%'
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (borrow) => {
        return (
          <EditButton onClick={()=>{
            setIsModalOpen(true);
            setSelectedBorrow(borrow);
            setBookId(borrow.book.id);
            setUserId(borrow.user.id);
            setBorrowDate(borrow.borrowDate);
            setReturnDate(borrow.returnDate);
            setEditBorrowIsModalOpen(true);
          }} />
        );
      }
    }

  ];

  return (

    <div>
      <PageTitle title='Gestion des emprunts'/>
      <Breadcrumb items={[
        {
          title: 'Home',
        },
        {
          title: 'Borrows',
        }
      ]}/>

      <Divider />
      <Flex horizontal={'true'} justify={'flex-end'} style={{'padding-bottom': 5}} >
        <Button className='button-modal' variant='outlined' onClick={showModal} > Ajoute un emprunte </Button>
      </Flex>
      <Modal title={'Ajoute un emprunte'} open={isModalOpen} onOk={handleOK} onCancel={handleCancel} >
        <label> Utilisateur :</label>
        <Flex vertical>
          {/** [
          *
          * {label: 'A', value : '1'},
          * {label: 'A', value : '1'}
         ] */}
          <Select
            // showSearch={true}
            value={userId}
            onChange={onUserChange}
            options={users}
            fieldNames= {{
              value: 'id'
            }}
          />
        </Flex>
        <label>Livre  :</label>
        <Flex vertical>
          <Select
            // showSearch={true}
            value={bookId}
            onChange={onBookChange}
            options={books}
            fieldNames= {{
              label:'title',
              value: 'id'
            }}
          />
        </Flex>
        <label> Date de début d'emprunt : </label>
        <Input value={borrowDate} onChange={onBorrowDateChange} />
        <label> Date de fin d'emprunt   : </label>
        <Input value={returnDate} onChange={onReturneDateChange} />

      </Modal>
      <Table rowKey={ borrow => borrow.id} columns={columns} dataSource={borrows} />
    </div>
  );
}

export default BorrowPage;
