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

const jsonDataMock = {
  "sport": {
    "id": "1",
    "name": "Futbol",
    "team": [
      {
        "id": "1",
        "name": "Audax Italiano",
        "country": "CL",
        "active": "true",
        "player": [
          {
            "id": "1",
            "name": "Joaquin",
            "position": "Delantero"
          },
          {
            "id": "2",
            "name": "Nicolas",
            "position": "Defensa"
          },
          {
            "id": "3",
            "name": "Jonathan",
            "position": "Portero"
          },
          {
            "id": "4",
            "name": "Boris",
            "position": "Portero"
          }
        ]
      },
      {
        "id": "2",
        "name": "Cobresal",
        "country": "CL",
        "active": "true"
      },
      {
        "id": "3",
        "name": "Colo Colo",
        "country": "CL",
        "active": "true"
      },
      {
        "id": "4",
        "name": "D. Antofagasta",
        "country": "CL",
        "active": "false",
        "player": [
          {
            "id": "5",
            "name": "Carlos",
            "position": "Delantero"
          },
          {
            "id": "6",
            "name": "Jorge",
            "position": "Defensa"
          },
          {
            "id": "7",
            "name": "Richart",
            "position": "Portero"
          }
        ]
      },
      {
        "id": "5",
        "name": "Deportes Iquique",
        "country": "CL",
        "active": "false"
      },
      {
        "id": "6",
        "name": "Deportes Concepcion",
        "country": "CL",
        "active": "true"
      },
      {
        "id": "7",
        "name": "Everton",
        "country": "CL",
        "active": "true"
      },
      {
        "id": "8",
        "name": "Huachipato",
        "country": "CL",
        "active": "true"
      },
      {
        "id": "9",
        "name": "O'Higgins",
        "country": "CL",
        "active": "true"
      },
      {
        "id": "10",
        "name": "Universidad de Chile",
        "country": "CL",
        "active": "true"
      }
    ]
  }
}

module.exports = {
  expectedPlayers,
  teamObjectWithChilds,
  jsonDataMock
}