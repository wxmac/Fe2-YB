export const lotteryBoxTpl = ({
    luckTime = 0,
    prizeImgs = [],
    maskMsg = ''
  }) => `
  <div>今日还有 <span class="J_lottery_count">${luckTime}</span> 次抽奖机会</div>
  <div class="lottery_box J_lottery_box">
      <i class="hbd_lottery_dot"></i>
      <div class="lottery_prize_items">
          <div class="lottery_prize_item lottery_prize_item_1">
              <img src="${prizeImgs[0]}" alt="">
          </div>
          <div class="lottery_prize_item lottery_prize_item_2">
              <img src="${prizeImgs[1]}" alt="">
          </div>
          <div class="lottery_prize_item lottery_prize_item_3">
              <img src="${prizeImgs[2]}" alt="">
          </div>
          <div class="lottery_prize_item lottery_prize_item_8">
              <img src="${prizeImgs[7]}" alt="">
          </div>
          <div class="lottery_start J_lottery_start ">GO!
          </div>
          <div class="lottery_prize_item lottery_prize_item_4">
              <img src="${prizeImgs[3]}" alt="">
          </div>
          <div class="lottery_prize_item lottery_prize_item_7">
              <img src="${prizeImgs[7]}" alt="">
          </div>
          <div class="lottery_prize_item lottery_prize_item_6">
              <img src="${prizeImgs[5]}" alt="">
          </div>
          <div class="lottery_prize_item lottery_prize_item_5">
              <img src="${prizeImgs[4]}" alt="">
          </div>
      </div>
    
      <div class="lottery_mask J_lottery_mask">
          <div>
              <p class="lottery_msg">${maskMsg}</p>
              <div class="lottery_mask_close J_lottery_mask_close">关闭</div>
          </div>
      </div>
      
      
      <i class="hbd_lottery_dot"></i>
  </div>
  `
  