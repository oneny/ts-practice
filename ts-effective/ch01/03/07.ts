/**
 * 
 * 타입스크립트에서는 런타임 타입과 선언된 타입이 맞지 않을 수 있다.
 * 타입이 달라지는 혼란스러운 상황을 가능한 한 피해야 한다.
 * 선언된 타입이 언제든지 달라질 수 있다는 것을 명심해야 한다.
 */

function turnLightOn() {}
function turnLightOff() {}

function setLightSwitch(value: boolean) {
  switch(value) {
    case true:
      turnLightOn()
      break
    case false:
      turnLightOff()
      break
    default:
      console.log(`실행되지 않을까 봐 걱정됩니다`)
  }
}

// : boolean은 런타입에 제거되기 때문에 자바스크립트였다면 실수로 setLightSwitch("ON")을 호출할 수도 있었을 것이다.
// 순수 타입스크립트에서도 마지막 코드를 실행하는 방법이 존재한다.

// 네트워크 호출로부터 받아온 값으로 함수를 실행하는 경우
interface LightApiResponse {
  lightSwitchValue: boolean
}

async function setLight() {
  const response = await fetch("/light")
  const result: LightApiResponse = await response.json()
  // API를 잘못 파악해서 lightSwitchValue가 실제로는 문자열이었다면, 런타임 시 setLightSwitch 함수까지 전달된다.
  setLightSwitch(result.lightSwitchValue)
}
