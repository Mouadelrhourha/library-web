import {Typography} from 'antd';
const {Title} = Typography;

export const PageTitle = ({title, level = 3,...otherProps}) => {
  return (
    <Title level={level} {...otherProps}>{title}</Title>
  );
};
