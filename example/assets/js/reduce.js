/**
 * @author monkeywang
 * Date: 17/9/6
 */
const test = 0
let reduce = function (a, b) {
  if (a > b) {
    return a - b
  } else if (a < b) {
    return b - a
  }
  return test
}

export default reduce
