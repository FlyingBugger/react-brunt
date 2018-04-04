import {connect} from 'react-redux';
import {loginuser,signoutuser} from "../action/action";
import Login from '../components/front/login';

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return { status: state }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        login:()=>dispatch(loginuser)
    }
}

//连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Login);
