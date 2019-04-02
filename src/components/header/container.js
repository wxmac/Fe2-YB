import { connect } from 'react-redux'
import Header from './component'
import * as actionCreator from './store/actionsCreator'
const mapStateToProps = (state) => ({
    list: state.header.list,
    showModle: state.header.showModle
})

const mapDispatchToProps = (dispatch) => ({
    getList(){
        const action = actionCreator.get_list();
        dispatch(action);
    },
    openModel(){
        const action = actionCreator.open_modle()
        dispatch(action)
    },
    hideModel(){
        const action = actionCreator.hide_model()
        dispatch(action)
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)