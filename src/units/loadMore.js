
/**
 * 下拉加载
 * @param {} container -- 包裹list的容器的父元素 在react中用 this.refs.xxx获取
 * @param {} listContainer -- 包裹list的容器 在react中用 this.refs.xxx获取
 * @param {function} callback -- 下拉加载的回调
*/
export default class LoadMore{
    constructor({
        container,
        listContainer,
        pull = false, // 判断是否下拉
        page = 1, // 页码
        startY = 0, // 
        centerY = 0, // 开始下拉距离
        maxDown = 50, // 最大下拉距离
        maxUp, // 最大上拉距离
        maxUpBounce = 0, // 判断是否到达最大上拉距离
        maxDownBounce,// 判断是否到达最大下拉距离
        callback = () => {} // 下拉回调
    }){
        Object.assign(this, {
            container,
            listContainer,
            pull,
            page,
            startY ,
            centerY,
            maxDown ,
            maxUp,
            maxUpBounce,
            maxDownBounce,
            callback
        })
        this.maxUp = -( this.listContainer.offsetHeight - this.container.offsetHeight + this.maxDown )
        this.maxDownBounce = -(this.listContainer.offsetHeight - this.container.offsetHeight)
        this.init()
    }
    /**
     * 初始化
     * */ 
    init(){
        this.handleTouchStart()
        this.handleTouchMove()
        this.handleTouchEnd()
    }
    handleTouchStart(){
        this.listContainer.addEventListener('touchstart', (e) => {
            this.startY = e.changedTouches[0].clientY;
        })
    }
    handleTouchMove(){
        this.listContainer.addEventListener('touchmove', (e) => {
            this.listContainer.style.transition = 'none';
            const dy = e.changedTouches[0].clientY - this.startY;
            let tempY = this.centerY + dy;
            if( tempY > this.maxDown){
                tempY = this.maxDown;
            }
            if(tempY < this.maxUp){
                tempY = this.maxUp;
            }
            this.listContainer.style.transform = 'translateY('+tempY+'px)';
            this.pull = true;
        })
    }
    handleTouchEnd(){
        this.listContainer.addEventListener('touchend', (e) => {
            const dy = e.changedTouches[0].clientY - this.startY;
            this.centerY = this.centerY + dy
            if(this.pull && this.centerY < this.maxDown ){
                this.page++
                this.callback(this.page)
                this.pull = false
            } 
            if( this.centerY > this.maxUpBounce ){
                this.centerY = this.maxUpBounce
            }
            if( this.centerY < this.maxDownBounce){
                this.centerY = this.maxDownBounce
            }
            console.log('this.centerY', this.centerY)
            this.listContainer.style.transition = '.5s' 
            this.listContainer.style.transform = 'translateY('+this.centerY+'px)';

        })
    }
}