
import { Divider , Breadcrumb,Space,Table,Flex,Button, Input,Modal,Select, Alert,Title} from 'antd';
import { useEffect, useState } from 'react';
import { createBook, deleteBook, fetchAllBook, updateBook } from '../../api/book.api';
import DeleteButton from '../../components/DeleteButton';
import EditButton from '../../components/EditButton';
import {fetchAllCategories} from '../../api/category.api';
import {PageTitle} from '../../components/PageTitle';

function BookPage() {

  const[books,setBooks]=useState([]);
  const[isModalOpen,setIsModalOpen]=useState(false);
  const[book,setBook]=useState({});
  const[isEditBookModalOpen,setEditBookModalOpen]=useState(false);
  const[categories,setCategories]=useState();
  const[isDeleteBookModalOpen,setDeleteBookModalOpen]=useState(false);

  const loadBooks=()=>{
    fetchAllBook().then((books)=>{
      setBooks(books);
    }).catch(error => console.error(error));
  };

  const loadCategories = () => {
    fetchAllCategories().then((receivedCategories) => setCategories(receivedCategories)).catch(error=> console.log(error.stack));
  };

  const handleOk=()=>{
    if(isEditBookModalOpen){
      updateBook(book).then(()=>{
        setEditBookModalOpen(false);
        setBook({});
        loadBooks();

      }).finally(()=>{
        setEditBookModalOpen(false);
        setIsModalOpen(false);
      });
    } else{
      createBook(book).then(()=>{
        setIsModalOpen(false);
        setBook({});
        loadBooks();

      });
    }
  };

  const handleCancel=()=>{
    setIsModalOpen(false);
    setBook({});
    setEditBookModalOpen(false);

  };

  const showModal=()=>{
    setIsModalOpen(true);
  };

  useEffect(() => {
    // fetchAllBook().then(books=>setBooks(books)).catch(error => console.error(error));
    loadBooks();
    loadCategories();
  }, []);

  const onBookTitleChange=(e)=>{
    setBook({
      ...book,
      title:e.target.value
    });
  };
  const onBookCategoryChange=(value)=>{

    const updatedBook={...book };
    // updatedBook.category={};
    // updatedBook.category={name:value};
    updatedBook.category={name:value};
    console.log(updatedBook.category);

    setBook(updatedBook);

  };
  const onBookPubslishedYearChange=(e)=>{
    setBook({
      ...book,
      publishedYear:e.target.value
    });
  };
  const handleDeleteok=()=>{
    deleteBook(book).then(()=>{
      setDeleteBookModalOpen(false);
      loadBooks();
    }).catch(error=>console.error(error));

  };
  const handleDeleteCancel=()=>{
    setDeleteBookModalOpen(false);
  };

  const columns = [
    {
      title: 'Id',
      key: 'id',
      render: (book) => <span key={book.id}>{book.id}</span>,
      width: '20%'
    },

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text,book) => <span key={book.id}>{book.title}</span>,
      width: '20%'
    },
    {
      title: 'Category',
      key: 'category',
      render: (book) => <span key={book.id}>{book.category.name}</span>,
      width: '20%'
    },
    {
      title: 'Published Year',
      key: 'publishedYear',
      render: (book) => <span key={book.id}>{book.publishedYear}</span>,
      width: '20%'
    },
    {
      title: 'Edit ',
      key: 'edit',
      render: (book) => (
        <EditButton key={book.id} onClick={()=>{
          setIsModalOpen(true);
          setBook(book);
          setEditBookModalOpen(true);
        }
        } />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (book) => (
        <Space key={book.id} size="middle">
          <DeleteButton onClickDeleteButton ={()=>{
            setDeleteBookModalOpen(true);
            setBook(book);

          } } />
        </Space>
      ),
    }

  ];
  const confirmationMessageDelete= `Est ce que vous confirmez la suppression de la livre ${book.title}`;
  const modalTitle = isEditBookModalOpen ? 'Modifier livre' : 'Ajoute livre';

  return (
    <>
      <PageTitle title='Gestion des livres'/>
      <Breadcrumb items={[
        {
          title: 'Home',
        },
        {
          title: 'Books',
        }
      ]}/>

      <Divider />
      <Flex horizontal={'true'} justify={'flex-end'} style={{'padding-bottom': 5}} >
        <Button className='button-modal' variant='outlined' onClick={showModal} > Ajoute un livre </Button>
      </Flex>
      <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <label> nom : </label>
        <Input placeholder='nom de livre' value={book.title} onChange={onBookTitleChange} />
        <label> category :  </label> <br></br>

        <Flex vertical>
          <Select
            showSearch={true}
            // book.category c'est un objet
            value={ book.category ? book.category.name : null }
            onChange={onBookCategoryChange}
            options={categories}
            fieldNames= {{
              label:'name',
              // value radi ykoun string
              value: 'name'
            }}
          />
        </Flex >
        <br></br>
        <label> année de publication  :  </label>
        <Input placeholder=" l'année de publication" value={book.publishedYear} onChange={onBookPubslishedYearChange} />

      </Modal>
      <Modal title={'Confirmer la suppression'} open={isDeleteBookModalOpen} onOk={handleDeleteok} onCancel={handleDeleteCancel} >
        <Alert message={confirmationMessageDelete} type='error' />
      </Modal>

      <div>
        <Table rowKey={book => book.id} columns={columns} dataSource={books} />
      </div>
    </>

  );
}

export default BookPage;
