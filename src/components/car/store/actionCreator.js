import * as types from './actionType'
import fetch from '@/units/api'
// 第一层
export const get_car = () => {
    return (dispatch) => {
        fetch.get('/stdEndorsed/json/queryCarBand.htm', (res) => {
            if(res.data && res.data.data && res.status === 200){
                const data = res.data.data
                let map = {};
                let dataM = [];
                // 格式化数据,单独抽出来会有问题
                for(let i = 0; i < data.length; i++){
                    let ai = data[i];
                    if(!map[ai.first_letter]){
                        dataM.push({
                            type: ai.first_letter,
                            data: [ai]
                        });
                        map[ai.first_letter] = ai;
                    } else {
                        for(let j = 0; j < dataM.length; j++){
                            let dj = dataM[j];
                            if(dj.type === ai.first_letter){
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                };
                const action = post_carList(dataM)
                dispatch(action)
            }
        })
    }
}

export const post_carList = (value) => {
    return {
        type:types.GETCARLIST,
        value:value,
    }
}

// 第二层
export const get_SecondCar = (id) => {
    return (dispatch) => {
        fetch.post('/stdEndorsed/json/carSeries.htm', {
            brandId:id
        },(res) => {
            if(res.data && res.data.data && res.status === 200){
                const data =  res.data.data
                let map = {};
                let dataM = [];
                // 格式化数据,单独抽出来会有问题
                for(let i = 0; i < data.length; i++){
                    let ai = data[i];
                    if(!map[ai.group_name]){
                        dataM.push({
                            type: ai.group_name,
                            data: [ai]
                        });
                        map[ai.group_name] = ai;
                    } else {
                        for(let j = 0; j < dataM.length; j++){
                            let dj = dataM[j];
                            if(dj.type === ai.group_name){
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                };
                const action = post_SecondCarList(dataM)
                dispatch(action)
            }
        })
    }
}


export const post_SecondCarList = (value) => {
    return {
        type:types.GETSECONDCARLIST,
        value:value,
    }
}


// 第三层
export const get_ThreeCar = (config) => {
    return (dispatch) =>{
        fetch.post('/stdEndorsed/json/carModel.htm', {
            brandId:config.brand_id,
            seriesId:config.seriesId
        },(res) => {
            if(res.data && res.data.data && res.status === 200){
                const data =  res.data.data
                let map = {};
                let dataM = [];
                // 格式化数据,单独抽出来会有问题  
                for(let i = 0; i < data.length; i++){
                    let ai = data[i];
                    if(!map[ai.model_year]){
                        dataM.push({
                            type: ai.model_year,
                            series_id:ai.series_id,
                            data: [ai]
                        });
                        map[ai.model_year] = ai;
                        
                    } else {
                        for(let j = 0; j < dataM.length; j++){
                            var dj = dataM[j];
                            
                            if(dj.type === ai.model_year){
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                };
                const action = post_ThreeCarList(dataM)
                dispatch(action)
            }
        })
    }
}
export const post_ThreeCarList = (value) => {
    return {
        type:types.GETTHREELIST,
        value:value,
    }
}


export const post_Car = (config) => {
    return {
        type:types.POSTCAR,
        value:config
    }
}