// --- Day 11: Seating System ---
// Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

// By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

// The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

// L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL
// Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

// If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
// If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
// Otherwise, the seat's state does not change.
// Floor (.) never changes; seats don't move, and nobody sits on the floor.

// After one round of these rules, every seat in the example layout becomes occupied:

// #.##.##.##
// #######.##
// #.#.#..#..
// ####.##.##
// #.##.##.##
// #.#####.##
// ..#.#.....
// ##########
// #.######.#
// #.#####.##
// After a second round, the seats with four or more occupied adjacent seats become empty again:

// #.LL.L#.##
// #LLLLLL.L#
// L.L.L..L..
// #LLL.LL.L#
// #.LL.LL.LL
// #.LLLL#.##
// ..L.L.....
// #LLLLLLLL#
// #.LLLLLL.L
// #.#LLLL.##
// This process continues for three more rounds:

// #.##.L#.##
// #L###LL.L#
// L.#.#..#..
// #L##.##.L#
// #.##.LL.LL
// #.###L#.##
// ..#.#.....
// #L######L#
// #.LL###L.L
// #.#L###.##
// #.#L.L#.##
// #LLL#LL.L#
// L.L.L..#..
// #LLL.##.L#
// #.LL.LL.LL
// #.LL#L#.##
// ..L.L.....
// #L#LLLL#L#
// #.LLLLLL.L
// #.#L#L#.##
// #.#L.L#.##
// #LLL#LL.L#
// L.#.L..#..
// #L##.##.L#
// #.#L.LL.LL
// #.#L#L#.##
// ..L.L.....
// #L#L##L#L#
// #.LLLLLL.L
// #.#L#L#.##
// At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

// Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?

const initialRows = [
  'LLLLLLLLLL.LLLLLL.LLLLLLLLLLLL.LL.LLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLL.L.LLLLLLLLLL.LLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLL..LLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLL.LL.LL.LLLLL.L.LLLLL.LLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLL.LLL.LL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLL.L.LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LL',
  'LLLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLLLLLLL.LLLLL.LLLLLLL.LLLL.L.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL',
  '.L.LL...LLLL.......L....L.LLLLLL.......LL....LL...L..L.LLL...LLL..L.L.L.L..L...............L',
  'LLLLLLLLLL.LL.LLL.LLLLLL.LLLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLL.LLLL.LLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLL..LLLLLLLLLLLLLLLLLL',
  'LLLLLLL.LL.LLL.LLLLLLLLLLLLL.L.LLLLLLL.LLLLL.LLLLLLL.LLLLLL..LLLLLL.LLLLL.LLLLLL.LLLLLLLLLLL',
  '.......L.LLL........LL.L....L.LL...L.....L..LL......L.....L....L.LLLL...L....L..L.L........L',
  'LLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLL.L.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LL.LLLL.LLLLL.LLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLL.LLLLLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL',
  '..L...L.........LL.LLLL...L...LL.L.L..L...L.L...LL..LL...L....L....LL.L...LLL........LLL....',
  'LLLLLLLL.L.LLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLL.LLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLL.LL.LLLLLLLLLLL.LLLLLL.LLLLLL.LL.LLLLLLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LL.LLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL',
  'L..L...........L....L.LLLL........L..LL....L.L.......L.L.L.....LL......L.....LLL.LL.L.L.LL.L',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLL..LLLLLL.LLLLLLLLLLL.LLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLL',
  'LLLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLL.LLL.LLLLL.LLLLLL..LLLLL.LLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  '..L.....LLL.L..L...L......LL......L.......LL..L.L.L.L....LLLL....L....L...LL...LLL.L....LLL.',
  'LLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLL.LLL',
  'LLLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLL.LL.LL.L.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLLLLLL.LL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.L.LLLLLLLLLL..LLLL',
  'LLLLL.LLLLLLLL.LLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.L.LLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLLLLL..LLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLL.LL.LLL.LLLLLLLLLLL',
  '.....LL.L...LL....L...L.L.....L...L.L.L.L.L.L.......LL.....L.LL.LL...LLL.L.....L...L......L.',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLL.LL..LLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.L.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLL.LL.LLLLLLLLLLLLL.LLLLLLLLLL.',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLL.L.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.L.LLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLL.L',
  '.L....LL....L....L.L....L......LL.....L..L.L....LL.......L......L.L..L.......L....L.LLL....L',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLLLLLLLL..LLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  '.L......L....L.L..L....LL.......L.LL..LL.L.....L..L.L...............LL....L...L....L....L.LL',
  'LLLLLLLLL..LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL..LLLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLL.LLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL..LLLLLL.LLLLL.LLLLLLLLLLLL.L.LLLLLL..LLLLLLLLLLLL.LLLLLLLLLLL',
  '.L..L..L.L.L.L.L.L.....L.L...L....LL.L.L....L..L.L.L........L....LL.......LL....L...L.L..LL.',
  'LLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLL..LLLLL.LLLLLL.LLLLL..LLLLLL.LLLLLLLLLLL',
  'L.LLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LL.LLLLLLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLL.L.LLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLL..LLLLL.LLLLLLLLLLLLL.LLLLL.L.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL..LLLLLLLLLL',
  'LLLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL..LLLLL.LLLLLLLLLL.LLLLLLL',
  'LLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLL.L.L.LLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLL.LLLLLLLLLLLLL',
  'LLLLL....L.LL..LLL.L...LL.....L............L...............L..L.LLLLL.L.L.......L..LL.L...L.',
  'LLLLLLLLLL.LLLLLL.LLLLL..LLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLL.LLL.LL.LLLLLL..LLLLL.LLLLLL.L.LLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.L.LLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLL',
  '.....L...L......L...LL.L.......LL.L...LL..LL.....L.......LL.LL......LL.L...L..L..L...L.LLL..',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL..LLLLLLLLLL',
  'LLLLLL.LLL.LLLLLL.LLLLLL.LL.LL.LLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLL',
  'LLL.LLL.LL..LLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.',
  'LLLLLLLLL.LLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLL.LLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.L.LLLLLLLLLL.LLLL.LL.LLLLL.LLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLL.L.L.LLLLLLLLL',
  'LLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  '.LL.LLL.L.L.L..L....L..L...L......L......L.L.L...L.L..L.L.LLLLL..L.LL.LLL.L...LL.LL...L.L.L.',
  'LLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLL.LLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLL.LLLLLLL.LLLLLL.LLLLL..LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLL.LLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  '..L.LLLL.L...LL.L....L..LL..L.....L....L.L...LL.......L.L..LL..LL............L...LL.....L...',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLL',
  'LLLLLLLLLLLLL.LLL.LLLLLL..LLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLL..LLLLL.',
  'LLLLLLLLLL.LLLLLL..LLLLL.LLLLL.LLLLLLL..LLLL.LLLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLL.L.LLLLL.LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLL.LLLLLL.LLLLLL.LLLLL.LLLLL.L.LLLLLLLLLLLLL.LL.LLLLL.LLLL.LLLLLL.LLLLLLLLLL.LLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLL..LLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLL',
  'LLLLLLLLLL.LLL.LLLLLLLLL.LLLLL.LLLLLLLLLLLL..LLLLLLL.LLLLL..LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL.LL.LLLLLLLLLL.LLLLLLLLLLL'
];
const smallBatch = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL'
];

roundOfRules(smallBatch);

function roundOfRules(layout) {
  let rows = [...layout];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let seatIndex = 0; seatIndex < rows[rowIndex].length; seatIndex++) {
      let seat = rows[rowIndex][seatIndex];
      if (seat === 'L') {
        if (areAdjacentSeatsFree(seatIndex, rowIndex, rows)) {
          let row = rows[rowIndex];
          let newRow =
            row.substring(0, seatIndex) + '#' + row.substring(seatIndex + 1);
          rows[rowIndex] = newRow;
        }
      } else if (seat === '#') {
        if (areAdjacentSeatsOccupied(seatIndex, rowIndex, rows)) {
          let row = rows[rowIndex];
          let newRow =
            row.substring(0, seatIndex) + 'L' + row.substring(seatIndex + 1);
          rows[rowIndex] = newRow;
        }
      }
    }
  }
  rows.forEach(row => console.log(row));

  if (JSON.stringify(layout) === JSON.stringify(rows)) {
    console.log(numberOfOccupiedSeats(rows));
  } else {
    //roundOfRules(smallBatch);
  }
}

function areAdjacentSeatsFree(seatIndex, rowIndex, layout) {
  const adjustmentSeats = getAdjacentSeats(seatIndex, rowIndex, layout);
  return adjustmentSeats.some(seat => !seat || seat === '.' || seat === 'L');
}

function areAdjacentSeatsOccupied(seatIndex, rowIndex, layout) {
  const adjustmentSeats = getAdjacentSeats(seatIndex, rowIndex, layout);
  let nr = 0;
  adjustmentSeats.forEach(seat => {
    if (seat === '#') {
      nr++;
    }
  });

  if (nr > 3) {
    return true;
  }

  return false;
}

function getAdjacentSeats(seatIndex, rowIndex, layout) {
  const adjustmentSeats = [];
  if (layout[rowIndex]) {
    adjustmentSeats.push(layout[rowIndex][seatIndex - 1]);
    adjustmentSeats.push(layout[rowIndex][seatIndex + 1]);
  } else {
    adjustmentSeats.push('.');
    adjustmentSeats.push('.');
  }

  if (layout[rowIndex - 1]) {
    adjustmentSeats.push(layout[rowIndex - 1][seatIndex]);
    adjustmentSeats.push(layout[rowIndex - 1][seatIndex - 1]);
    adjustmentSeats.push(layout[rowIndex - 1][seatIndex + 1]);
  } else {
    adjustmentSeats.push('.');
    adjustmentSeats.push('.');
    adjustmentSeats.push('.');
  }

  if (layout[rowIndex + 1]) {
    adjustmentSeats.push(layout[rowIndex + 1][seatIndex]);
    adjustmentSeats.push(layout[rowIndex + 1][seatIndex - 1]);
    adjustmentSeats.push(layout[rowIndex + 1][seatIndex + 1]);
  } else {
    adjustmentSeats.push('.');
    adjustmentSeats.push('.');
    adjustmentSeats.push('.');
  }

  return adjustmentSeats;
}

function numberOfOccupiedSeats(layout) {
  let nr = 0;
  layout.forEach(row => {
    for (let i = 0; i < row.length; i++) {
      const seat = row[i];
      if (seat === '#') {
        nr++;
      }
    }
  });
  return nr;
}

// --- Part Two ---
// As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

// Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

// .......#.
// ...#.....
// .#.......
// .........
// ..#L....#
// ....#....
// .........
// #........
// ...#.....
// The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

// .............
// .L.L.#.#.#.#.
// .............
// The empty seat below would see no occupied seats:

// .##.##.
// #.#.#.#
// ##...##
// ...L...
// ##...##
// #.#.#.#
// .##.##.
// Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

// Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

// L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL
// #.##.##.##
// #######.##
// #.#.#..#..
// ####.##.##
// #.##.##.##
// #.#####.##
// ..#.#.....
// ##########
// #.######.#
// #.#####.##
// #.LL.LL.L#
// #LLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLL#
// #.LLLLLL.L
// #.LLLLL.L#
// #.L#.##.L#
// #L#####.LL
// L.#.#..#..
// ##L#.##.##
// #.##.#L.##
// #.#####.#L
// ..#.#.....
// LLL####LL#
// #.L#####.L
// #.L####.L#
// #.L#.L#.L#
// #LLLLLL.LL
// L.L.L..#..
// ##LL.LL.L#
// L.LL.LL.L#
// #.LLLLL.LL
// ..L.L.....
// LLLLLLLLL#
// #.LLLLL#.L
// #.L#LL#.L#
// #.L#.L#.L#
// #LLLLLL.LL
// L.L.L..#..
// ##L#.#L.L#
// L.L#.#L.L#
// #.L####.LL
// ..#.#.....
// LLL###LLL#
// #.LLLLL#.L
// #.L#LL#.L#
// #.L#.L#.L#
// #LLLLLL.LL
// L.L.L..#..
// ##L#.#L.L#
// L.L#.LL.L#
// #.LLLL#.LL
// ..#.L.....
// LLL###LLL#
// #.LLLLL#.L
// #.L#LL#.L#
// Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

// Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?
