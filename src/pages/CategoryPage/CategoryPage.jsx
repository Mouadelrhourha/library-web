import {Breadcrumb, Divider, Table,Input,Flex, Alert} from 'antd';
import {useEffect, useState} from 'react';
import {fetchAllCategories,createCategory, updateCategory, deleteCategory} from '../../api/category.api';
import DeleteButton from '../../components/DeleteButton';
import EditButton from '../../components/EditButton';
import { Button, Modal } from 'antd';
import {PageTitle} from '../../components/PageTitle';

/**
 * 1- click 3la l button edit
 * ---------------------------
 * awl haja hwa dwzna l props dial EditButton l Button dial antdesign bach y3rf onClick
 * dakchi lach hrssna props bach ydouz kolchi l button original
 *
 * 2- radi tban l modal w khess f name ykon smiya dial category li brkna 3liha
 * -----------------------------------------------------------------------------
 * lmodal kayt7l b setIsModalOpen(true)
 * w moraha khssni ndir lcategory li tbrkat f state category bach l input y pointer 3liha
 *
 * 3- brek 3la modifier khssna n3yto l api
 * ----------------------------------------
 *
 * 3- khssna n reloadiw
 */

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [category,setCategory]=useState({id:undefined, name:undefined});

  const onCategoryNameChange=(e)=>{
    // kan fiha flwl id w name
    setCategory({
      ...category,
      name:e.target.value
    });
  };

  const loadCategories = () => {
    fetchAllCategories()
      .then((receivedCategories) => {
        setCategories(receivedCategories);
      })
      .catch(error => console.log(error));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if( (isEditingCategory)) {
      updateCategory(category).then(()=>{
        setIsModalOpen(false);
        setCategory({});
        loadCategories();
      }).finally(() => {
        setIsEditingCategory(false);
      });
    }else {
      createCategory(category).then(()=> {
        setIsModalOpen(false);
        setCategory({name:undefined});
        loadCategories();
      });
    }

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const columns = [
    {
      title: 'Id',
      key: 'id',
      render: (category) => <span>{category.id}</span>,
      width: '30%'
    },
    {
      title: 'Name',
      key: 'name',
      render: (text,category) => <span>{category.name}</span>,
      width: '50%'
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (currentCategory) => (
        <EditButton onClick={() => {
          setIsModalOpen(true);
          setCategory(currentCategory);
          setIsEditingCategory(true);
        }} />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (currentCategory) => (
        <DeleteButton onClickDeleteButton={() => {
          setCategory(currentCategory);
          setIsDeleteModalOpen(true);
        }} />
      ),
    },
  ];

  const confirmDeletionMessage = `Est ce que vous confirmez la suppression de la category ${category.name} ?`;

  const handleDeleteCategory = () => {
    deleteCategory(category).then(() => {
      setIsDeleteModalOpen(false);
      loadCategories();
    }).finally(() => setCategory({}));
  };

  const handleCancelDeleteCategory = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <PageTitle title='Gestion des categories'/>

      <Modal title="Nouvelle  catégorie" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <Input placeholder="Basic usage" value={category.name} onChange={onCategoryNameChange}/>
      </Modal>

      <Modal title="Confirmer la suppression" open={isDeleteModalOpen} onOk={handleDeleteCategory} onCancel={handleCancelDeleteCategory} >
        <Alert message={confirmDeletionMessage} type="error" />
      </Modal>
      <Breadcrumb items={[
        {
          title: 'Home',
        },
        {
          title: 'Categories',
        }
      ]}/>
      <Divider />
      <Flex horizontal={'true'} justify={'flex-end'}style={{'padding-bottom': 5}} >
        <Button className='button-modal' onClick={showModal} variant='outlined' > Ajoute categorie  </Button>
      </Flex>
      <Flex vertical>
        <Table rowKey={book => book.id} columns={columns} dataSource={categories} />
      </Flex>
    </>
  );
};
