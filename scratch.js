const createTicTac = num => {
  let result = []

  for (let i = 0; i < num; i++) {
    let row = ['ROW']

    for (let j = 0; j < num; j++) {
      if (j % 2 === 0) {
        let col = ['COL - X']
        row.push(col)
      } else {
        let col = ['COL - O']
        row.push(col)
      }
    }

    result.push(row)
  }
  return result
}

console.log(createTicTac(3))
