import React from 'react';
import Menu from './menu';
import { Layout } from 'antd';
import axios from 'axios';
import MixedC from './mixedComponents';

const { Header, Footer, Sider, Content } = Layout;

export default class Index extends React.Component {
  constructor(props){
    super(props);

  }
  ChangeComponents=(dates)=>{
    if(this.refs.props.refs.hasOwnProperty("props")){
      this.refs.props.refs.props.filterDates(dates);
    }else{
      this.refs.props.getToTable();
    }

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
                    <Content> <MixedC ref="props"  /> </Content>
                  </Layout>

              </Layout>
        </div>
    );
  }
}
