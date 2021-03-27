const fetch = require('node-fetch')

let larghezza
let altezza
let navi

const defCampo = async () => {
  let campo = await fetch(`http://localhost:8080/map`)
  campo = await campo.json()
  larghezza = campo.width
  altezza = campo.height
  navi = campo.ships
}

let start = new Date().getTime()

const timer = () => {
  let now = new Date().getTime()
  while (now - start < 1800) {
    now = new Date().getTime()
  }
  start = now
}

const player = async () => {
  await defCampo()
  for (let y = 0; y < altezza; y++) {
    for (let x = 0; x < larghezza; x++) {
      try{
        let res = await fetch(`http://localhost:8080/fire?x=${x}&y=${y}&team=test&password=test`)
        res = await res.json()
        if (res.score === 10) {
          console.log(`nave colpita a x = ${x} y = ${y}`)
        } else if (res.score === 50) {
          console.log(`nave colpita e affondata a x = ${x} y = ${y}`)
        } else {
          console.log(`normal things, nothing to see here a x = ${x} y = ${y}`)
        }
        timer()
      } catch (err) {
        continue
      }
    }
  }
  console.log(`il campo è stato bombardato`)
}

player()