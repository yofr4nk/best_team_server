const expectedPlayers = [ { id: '1',
    name: 'Joaquin',
    position: 'Delantero',
    _externalId: '1' 
  },
  { 
    id: '2',
    name: 'Nicolas',
    position: 'Defensa',
    _externalId: '2' 
  },
  { 
    id: '3',
    name: 'Jonathan',
    position: 'Portero',
    _externalId: '3' 
  },
  { id: '4', name: 'Boris', position: 'Portero', _externalId: '4' },
  { 
    id: '5',
    name: 'Carlos',
    position: 'Delantero',
    _externalId: '5' 
  },
  { id: '6', name: 'Jorge', position: 'Defensa', _externalId: '6' },
  { 
    id: '7',
    name: 'Richart',
    position: 'Portero',
    _externalId: '7' }];

const expectedPlayersWithParents = [ { id: '1',
    name: 'Joaquin',
    position: 'Delantero',
    _externalId: '1',
    teamId: '1' 
  },
  { 
    id: '2',
    name: 'Nicolas',
    position: 'Defensa',
    _externalId: '2',
    teamId: '1' 
  },
  { 
    id: '3',
    name: 'Jonathan',
    position: 'Portero',
    _externalId: '3',
    teamId: '1' 
  },
  { 
    id: '4',
    name: 'Boris',
    position: 'Portero',
    _externalId: '4',
    teamId: '1' 
  },
  { 
    id: '5',
    name: 'Carlos',
    position: 'Delantero',
    _externalId: '5',
    teamId: '4' 
  },
  { 
    id: '6',
    name: 'Jorge',
    position: 'Defensa',
    _externalId: '6',
    teamId: '4' 
  },
  { 
    id: '7',
    name: 'Richart',
    position: 'Portero',
    _externalId: '7',
    teamId: '4' }];

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

const mongoTeamMockData = [ 
  { players: 
    [ "5b70fce3821cf0002f87c2b6",
      "5b70fce3821cf0002f87c2b7",
      "5b70fce3821cf0002f87c2b8",
      "5b70fce3821cf0002f87c2b9" ],
    _id: "5b70fce3821cf0002f87c2bd",
    _externalId: '1',
    name: 'Audax Italiano',
    active: true },
  { 
    players: [],
    _id: "5b70fce3821cf0002f87c2be",
    _externalId: '2',
    name: 'Cobresal',
    active: true
  }];

module.exports = {
  expectedPlayers,
  teamObjectWithChilds,
  jsonDataMock,
  expectedPlayersWithParents,
  mongoTeamMockData
}