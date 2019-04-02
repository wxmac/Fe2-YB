// css放在public/css/global.css
/**
 * 
 * 
 * 
*/
import { lotteryBoxTpl } from './tpl'
 class Lottery {
    constructor({
        el,
        timer = null,
        lotteryPrizeIndex =  0,
        $prizeItemsEl = null,
        delayTime = 2000, // 延时多少秒得到结果
        animateTime = 100, // 动画时间
        clearActive = true, // 清除状态
        _luckyTimes = 1, // 抽奖次数
    }){
        Object.assign(this, {
            el,
            timer,
            lotteryPrizeIndex,
            $prizeItemsEl,
            delayTime,
            animateTime,
            clearActive,
            _luckyTimes
        })
        this.$el = document.querySelector(el)
        this.$lotteryStartEl = null
        this.$prizeItemsEl = null
        this.init()
    }
    init(){
        this.initEvent()
    }
    initEvent(){
        this.renderLotteryBox()
        this.initStartEvent()
    }
    renderLotteryBox(){
        let config = {
            luckTime: 1 || 0,
            prizeImgs: [
                'http://img17.3lian.com/d/file/201702/21/8f8a5c670f68613382cb043d1ad2fe05.jpg',
                'http://img17.3lian.com/d/file/201702/21/8f8a5c670f68613382cb043d1ad2fe05.jpg',
                'http://img17.3lian.com/d/file/201702/21/8f8a5c670f68613382cb043d1ad2fe05.jpg',
                'http://img17.3lian.com/d/file/201702/21/8f8a5c670f68613382cb043d1ad2fe05.jpg',
                'http://img17.3lian.com/d/file/201702/21/8f8a5c670f68613382cb043d1ad2fe05.jpg',
                'http://img17.3lian.com/d/file/201702/21/8f8a5c670f68613382cb043d1ad2fe05.jpg',
                'http://img17.3lian.com/d/file/201702/21/8f8a5c670f68613382cb043d1ad2fe05.jpg',
                'http://img17.3lian.com/d/file/201702/21/8f8a5c670f68613382cb043d1ad2fe05.jpg',
            ],
            maskMsg: '遮罩'
        }
        this.$el.innerHTML = lotteryBoxTpl(config)
        this.$lotteryStartEl = document.querySelector('.J_lottery_start') // 开始按钮
        this.$prizeItemsEl = document.querySelectorAll('.lottery_prize_item') // 🏅奖品
    }
    initStartEvent(){
        const _this = this
        let res = true
        this.$lotteryStartEl.onclick = (e) => {
            if (!this.$lotteryStartEl.classList.contains('disabled') ) {
                this.handleStartAnimate()
                this.setStartBtnStatus(true)
                if (res) {
                    // 还未得到抽奖结果，需要轮询 （到时候这里可以挪下面去）
                    this.getTargetPrize()
                    --_this._luckyTimes
                } else {
                    // 得到结果，转到指定位置再提醒用户
                }
            }
        }
    }
    // 开始抽奖动画
    handleStartAnimate(){
        this.lotteryPrizeIndex = 0
        this.timer = setInterval(() => {
            this.lotteryPrizeIndex = this.lotteryPrizeIndex === 8 ? 1 : this.lotteryPrizeIndex + 1
            this.addPrizeMask()
            document.querySelector(`.lottery_prize_item_${this.lotteryPrizeIndex}`).classList.remove('mask')
        }, this.animateTime)
        return this.timer
    }
    // 添加所有奖品的遮罩状态
    addPrizeMask(){
        for (let i = 0, l = this.$prizeItemsEl.length; i < l; i++) {
            this.$prizeItemsEl[i].classList.add('mask')
        }
    }
    // 清除所有奖品的遮罩状态
    clearPrizeActive () {
        for (let i = 0, l = this.$prizeItemsEl.length; i < l; i++) {
            this.$prizeItemsEl[i].classList.remove('mask')
        }
    }
    // 抽奖结果
    getTargetPrize(){
        let prizeIndex = Math.floor( Math.random() * 10 )
        console.log(prizeIndex)
        if(prizeIndex === 0 || prizeIndex === 9){
            prizeIndex = 1
        }
        setTimeout(() => {
            this.stopPrizeAnimate(prizeIndex)
            this.setStartBtnStatus()
        }, this.delayTime)
    }
    // 关闭抽奖动画
    stopPrizeAnimate(index){
        if (index) {
            let stopTimer = null
            stopTimer = setInterval(() => {
                if (index === this.lotteryPrizeIndex ) {
                    clearInterval(stopTimer)
                    clearInterval(this.timer)
                    if (this.clearActive) {
                        // this.clearPrizeActive()
                    }
                }
            }, 100)
        } else {
            clearInterval(this.timer)
            this.clearPrizeActive()
        }
    }
    // 按钮状态
    setStartBtnStatus (status) {
        console.log('this._luckyTimes', this._luckyTimes)
        if (status ) {
            this.$lotteryStartEl.classList.add('disabled')
        } else if (this._luckyTimes) { 
            this.$lotteryStartEl.classList.remove('disabled')
        }
    }
}

export default Lottery;