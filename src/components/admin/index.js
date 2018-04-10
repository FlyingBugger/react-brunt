import React from 'react';
import Menu from './menu';
import { Layout,Table, Icon, Divider } from 'antd';
import axios from 'axios';
import Lists from './table';
const { Header, Footer, Sider, Content } = Layout;



export default class Index extends React.Component {
  constructor(props){
    super(props);

  }
  ChangeComponents=(dates)=>{
      this.refs.props.filterDates(dates);
  }



  render() {

    return (
      <div>
          <Layout>
              <Header style={{backgroundColor:"#2795ff",color:"white",textAlign:"center"}}>内江日报爆料平台</Header>
                  <Layout>

                      <Sider style={{backgroundColor:"unset"}}>
                      <Menu handleChangeComponents={this.ChangeComponents}/>
                      </Sider>
                    <Content> <Lists ref="props"/> </Content>
                  </Layout>

              </Layout>
        </div>
    );
  }
}
