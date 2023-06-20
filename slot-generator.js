import { reelMultipliers } from "./paytable.js";
import { reelSelectiveArray } from "./paytable.js";
export const generateScreen = () => {
  let reels = []
  let reelsPicked = [];
  let occuranceRate = 10;
  let numberOfBonus = 0;
  let maxNumberOfBonus = 4;
  let selectiveArrayLength = 48;
//  console.log(reelSelectiveArray.length)
//  console.log(reelSelectiveArray)
/**!!ekrana gelecek reeller  reelSelectiveArray üzerinden seçiliyor*/
  for(let i = 0 ; i < occuranceRate; i++){
    // console.log('********* ', Math.floor(Math.random() * selectiveArrayLength), '*********')
    // console.log('********* ', reelSelectiveArray[Math.floor(Math.random() * selectiveArrayLength)], '*********')
    reelsPicked.push(reelSelectiveArray[Math.floor(Math.random() * selectiveArrayLength)])
  }
  
  for(let i = 0 ; i < 20; i++){
    let currentReel = reelsPicked[Math.floor(Math.random() * occuranceRate)]
    // console.log('currentReel :', Math.floor(Math.random() * occuranceRate), 'of', reelsPicked)
  /**number of B cannot be bigger than 6 */
    if(currentReel == 10) numberOfBonus++;
    reels.push(currentReel != 10 ? currentReel.toString() : numberOfBonus <= maxNumberOfBonus ? 'B' : '1')
  }

//   console.log(reels);
  let multiplier = calculateScreenMultiplier(reels)
  let bonusCounter = 0;
  reels.forEach((e) => {if(e == 'B') bonusCounter++} )
  let isBonus = bonusCounter >= 4;
  return [multiplier, reels, isBonus]
}

export const generateAllScreens = () => {
    let seedMap = new Map();
    let totalBonuses = 0;
    for(let i = 0 ; i < 500; i++){
        let currentScreen = generateScreen();
        let currentScreenType = paymentTypeDecider(currentScreen[0])
        let screenTypeArray = seedMap.get(currentScreenType);
        if(currentScreen[1].includes('B')) console.log(currentScreen[1]);
        let elementToSet = screenTypeArray == undefined ? [currentScreen[1]] : [...screenTypeArray,currentScreen[1]]
        if(currentScreen[2] == true) totalBonuses++;
        // console.log('currentScreen[1]',currentScreen[1])
        seedMap.set(currentScreenType, elementToSet)
    }
    let estimatedProfitOrLoss = 0;
    seedMap.forEach((el, key) => {
        console.log(key, ':', el.length)
        //estimated profit/loss
        estimatedProfitOrLoss = estimatedProfitOrLoss + estimatedProfit(key, el.length)
})
console.log('Total Bonus:',totalBonuses)
console.log('Money Giveaway:',estimatedProfitOrLoss)
}
export const estimatedProfit = (type, quantity) => {
    return type == 'mini' ? quantity * 1.5 :
        type == 'minor' ? quantity * 5 :
        type == 'major' ? quantity * 12 :
        type == 'super' ? quantity * 30 :
        type == 'grand' ? quantity * 75 : 0

}
export const paymentTypeDecider = (multiplier) => {
    return multiplier == 0 ? 'zero' :
            (multiplier > 0 && multiplier <= 3) ? 'mini' :
            (multiplier > 3 && multiplier <= 8) ? 'minor' :
            (multiplier > 8 && multiplier <= 15) ? 'major' :
            (multiplier > 15 && multiplier <= 50) ? 'super' :
            multiplier > 50 ? 'grand' : ''
}

export const calculateScreenMultiplier = (reels) => {
    const screenMap = new Map();
    var screenValue = 0;
    reels.forEach(element => {
        screenMap.set(element, screenMap.get(element) == undefined ? 1 : screenMap.get(element) + 1)
    });
    
    screenMap.forEach((element, key) => {
        // console.log(key, ':', element );
        let currentValue = element >= 8 && element <= 9 ? reelMultipliers[key]['8 - 9'] : element >= 10 && element <= 11 ? reelMultipliers[key]['10 - 11'] : element >= 12 ? reelMultipliers[key]['12+'] : 0
        screenValue = screenValue + currentValue;
    })
    // console.log('Screen Value:', screenValue)
    return screenValue;
}
 /**
  * Sırayla kaç x atacağını veya bonus alıp almayacağını dönecek
  */
export const getScreen = () => {

}