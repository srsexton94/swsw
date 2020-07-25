const faces = ['R', 'U', 'F', 'B', 'L', 'D']
const rotation = ['', '2', "'"]

const  generateScramble = function() {
  let scramble = []
  let move
  let lastface
  let face
  while (scramble.length < 25){
    move = faces[Math.floor(Math.random() * Math.floor(6))]
    face = move
    move += rotation[Math.floor(Math.random() * Math.floor(3))]
    if (lastface !== face) {
      scramble.push(move)
      lastface = face
      face = ''
    }
    move = ''
  }
  console.log(scramble.length)
  return scramble
}

export default (
  generateScramble
)
 