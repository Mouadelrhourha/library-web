import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function EditButton(props) {  

  return ( 
    <Button shape='circle' icon={<EditOutlined/>} {...props} /> 
  );
}

export default EditButton;