//possible moves for different pieces

//keep track of relative movements
const moves = {
  'k': {
    'upleft': {
      'x': -1,
      'y': -1,
    },
    'up': {
      'x': -1,
      'y': 0,
    },
    'upright': {
      'x': -1,
      'y': 1,
    },
    'right': {
      'x': 0,
      'y': 1,
    },
    'downright': {
      'x': 1,
      'y': 1,
    },
    'down': {
      'x': 1,
      'y': 0,
    },
    'downleft': {
      'x': 1,
      'y': -1,
    },
    'left': {
      'x': 0,
      'y': -1,
    },
  },
  'w_p_': {
    'up': {
      'x': -1,
      'y': 0,
      'capture': false,
    },
    'upleft': {
      'x': -1,
      'y': -1,
      'capture': true,
    },
    'upright': {
      'x': -1,
      'y': 1,
      'capture': true,
    },
  },
  'b_p_': {
    'down': {
      'x': 1,
      'y': 0,
      'capture': false,
    },
    'downleft': {
      'x': 1,
      'y': -1,
      'capture': true,
    },
    'downright': {
      'x': 1,
      'y': 1,
      'capture': true,
    },
  }
}

//add color pointers
function addColorPieces() {
  moves['w_k_'] = moves['k'];
  moves['b_k_'] = moves['k'];
}

addColorPieces();

module.exports = {
  moves,
}
