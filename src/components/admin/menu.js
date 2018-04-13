import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class menu extends React.Component{
  constructor(props){
    super(props);
  }
 handleClick = (e) => {
      this.props.handleChangeComponents(e.key);
  }
  render(){
    return(
      <div>
          <Menu
              onClick={this.handleClick}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>查看已提交的稿件</span></span>}>
            <MenuItemGroup key="g1" title="稿件分类">
              <Menu.Item key="1">未审核的稿件</Menu.Item>
              <Menu.Item key="2">已审核的稿件</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
    </div>
    )
  }
}
