const roundTypes = [
  {
    id: '0',
    rank: 19,
    name: 'Qualification round',
    cellName: 'Qualification',
    isFinal: 0,
  },
  {
    id: '3',
    rank: 79,
    name: 'Semi Final',
    cellName: 'Semi Final',
    isFinal: 0,
  },
  {
    id: 'b',
    rank: 39,
    name: 'B Final',
    cellName: 'B Final',
    isFinal: 0,
  },
  {
    id: 'c',
    rank: 90,
    name: 'Combined Final',
    cellName: 'Combined Final',
    isFinal: 1,
  },
  {
    id: 'd',
    rank: 20,
    name: 'Combined First round',
    cellName: 'Combined First',
    isFinal: 0,
  },
  {
    id: 'e',
    rank: 59,
    name: 'Combined Second round',
    cellName: 'Combined Second',
    isFinal: 0,
  },
  {
    id: 'f',
    rank: 99,
    name: 'Final',
    cellName: 'Final',
    isFinal: 1,
  },
  {
    id: 'g',
    rank: 70,
    name: 'Combined Third round',
    cellName: 'Combined Third',
    isFinal: 0,
  },
  {
    id: '1',
    rank: 29,
    name: 'First round',
    cellName: 'First',
    isFinal: 0,
  },
  {
    id: '2',
    rank: 50,
    name: 'Second round',
    cellName: 'Second',
    isFinal: 0,
  },
  {
    id: 'h',
    rank: 10,
    name: 'Combined qualification',
    cellName: 'Combined qualification',
    isFinal: 0,
  },
];

export const roundTypeById = id => roundTypes.find(t => t.id === id);

export const roundTypeFromCellName = cellName =>
  roundTypes.find(t => cellName.includes(t.cellName));
