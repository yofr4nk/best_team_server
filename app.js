const koa = require('koa'); 
const koaRouter = require('koa-router'); 
const koaBody = require('koa-bodyparser'); 
const cors = require('koa-cors');
const app = new koa();
const router = new koaRouter();
const PORT = process.env.PORT || 3001;
const {runSeedFromXmlData} = require('./controllers/formatDataHandle');
const {getTeams, getTeamPlayers, getPlayersPosition} = require('./controllers/teamController');
const {mongoDBConnect} = require('./models/connection');

app.use(cors());
app.use(koaBody({
  extendTypes: {
    json: ['application/x-javascript']
  }
}));

router.get('/api/teams', getTeams);

router.get('/api/teams/:idTeam/players', getTeamPlayers);

router.get('/api/teams/players/:position', getPlayersPosition);

router.get('/api/runseed', runSeedFromXmlData);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => {
  mongoDBConnect();
	console.log('The Best Team Server is running in port', PORT);
});