import { connect } from 'react-redux'
import City from './component'
import * as actionCreator from './store/actionCreator'

const mapState = (state) => ({
    list: state.city.list,
    city : state.city.city,
})

const mapDispatch = (dispatch) => ({
    getListInfo(){
        const action = actionCreator.get_cityList()
        dispatch(action)
    },
    get_City(config){
        const action = actionCreator.post_city(config)
        dispatch(action)
    }
})
export default connect(mapState, mapDispatch)(City)