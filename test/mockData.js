const expectedPlayers = [ 
  { 
    id: '1',
    name: 'Joaquin',
    position: 'Delantero',
    _externalId: '1' },
  { 
    id: '2',
    name: 'Nicolas',
    position: 'Defensa',
    _externalId: '1' },
  { 
    id: '3',
    name: 'Jonathan',
    position: 'Portero',
    _externalId: '1' },
  { id: '4', name: 'Boris', position: 'Portero', _externalId: '1' },
  { 
    id: '5',
    name: 'Carlos',
    position: 'Delantero',
    _externalId: '4' },
  { id: '6', name: 'Jorge', position: 'Defensa', _externalId: '4' },
  { 
    id: '7',
    name: 'Richart',
    position: 'Portero',
    _externalId: '4' } 
];

const teamObjectWithChilds = { 
  '1':[ 
    { id: '1', name: 'Joaquin', position: 'Delantero' },
    { id: '2', name: 'Nicolas', position: 'Defensa' },
    { id: '3', name: 'Jonathan', position: 'Portero' },
    { id: '4', name: 'Boris', position: 'Portero' } 
  ],
  '4': [ 
    { id: '5', name: 'Carlos', position: 'Delantero' },
    { id: '6', name: 'Jorge', position: 'Defensa' },
    { id: '7', name: 'Richart', position: 'Portero' } 
  ] 
};

module.exports = {
  expectedPlayers,
  teamObjectWithChilds
}