import React from 'react';
import Lists from './table';
import Article from './article';



export default class mixed extends  React.Component {
  state={
    flag:true
  }

  getToArticle=(d)=>{
    this.setState({
      flag:!this.state.flag,
      dates:d
    })
  }

  getToTable=(d)=>{
    this.setState({
      flag:!this.state.flag
    })
  }

  render(){
    if(!this.state.flag){
      return(
        <div>
          <Article {...this.state} handleBack={this.getToTable} />
        </div>

      )
    }else{
      return(
        <div>
          <Lists handleGetArticle={this.getToArticle} ref="props"/>
        </div>

      )
    }

  }
}
