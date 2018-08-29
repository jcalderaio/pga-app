import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import InputForm from './components/InputForm';
import './style/style.css';

class App extends Component {
  render() {
    const { Header, Content } = Layout;

    return (
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <div
              style={{ fontSize: '2em', color: 'white', textAlign: 'center' }}
            >
              PGA Score App
            </div>
          </Menu>
        </Header>
        <Content style={{ padding: 100 }}>
          <div
            style={{ paddingTop: 50, background: '#fff', textAlign: 'center' }}
          >
            <InputForm />
          </div>
          <div
            style={{ paddingTop: 700, background: '#fff', textAlign: 'center' }}
          />
        </Content>
      </Layout>
    );
  }
}

export default App;
