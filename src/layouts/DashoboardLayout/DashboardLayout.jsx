import { Layout, Menu} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {Outlet,Link} from 'react-router-dom';
const { Header, Footer } = Layout;

const items = [
  {
    key:'homme',
    label: (
      <Link to={'/'}>Home</Link>
    ),
  },
    
  {
    key:'books',
    label: (
      <Link to={'/books'}>Books</Link>
    ),
  },
  {
    key:'category',
    label: (
      <Link to={'/category'}>Categories</Link>
    ),
  },
  {
    key:'users',
    label: (
      <Link to={'/users'}>Users</Link>
    ),
  },
  {
    key:'borrows',
    label: (
      <Link to={'/borrows'}>Borrows</Link>
    ),
  }
];
export const DashboardLayout = () => {
  return (
    <Layout style={{height:'100vh'}}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
          height: '100%'
        }}
      >
        <Outlet/>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
                
      </Footer>
    </Layout>
  );
};
