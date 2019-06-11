import { connect } from 'react-redux'
import BargainDetail from './component'
import * as actionCreator from './store/actionCreator'

const mapState = (state) => ({
    data: state.bargain.data,
    car:state.car.carInfo,
})

const mapDispatch = (dispatch) => ({
    getBtnStatus(){
        const action = actionCreator.action_getStatus()
        dispatch(action)
    },
})
export default connect(mapState, mapDispatch)(BargainDetail)