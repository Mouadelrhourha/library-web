import {Button } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

function DeleteButton({onClickDeleteButton}) {
  return ( 
        
    <Button color={'danger'} shape="circle" variant="outlined" size={'small'} icon={<DeleteOutlined />} onClick={onClickDeleteButton}>
    </Button>
        
  );
}

export default DeleteButton;