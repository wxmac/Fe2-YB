import { connect } from 'react-redux'
import Car from './component'
import * as actionCreator from './store/actionCreator'

const mapState = (state) => ({
    car: state.car.list,
    SecondCar: state.car.secondList,
    ThreeCar: state.car.threeList,
    city: state.city.city
})

const mapDispatch = (dispatch) => ({
    getCarFirstList(){
        const action = actionCreator.get_car()
        dispatch(action)
    },
    getSecondCar(id){
        const action = actionCreator.get_SecondCar(id)
        dispatch(action)
    },
    getThreeCar(config){
        const action = actionCreator.get_ThreeCar(config)
        dispatch(action)
    },
    get_Car(config){
        const action = actionCreator.post_Car(config)
        dispatch(action)
    }
})
export default connect(mapState, mapDispatch)(Car)