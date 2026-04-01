const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Server running (demo mode)' }));

app.get('/api/picks', (req, res) => {
  const numGames = parseInt(req.query.numGames) || 8;
  const date = req.query.dates ? req.query.dates.split(',')[0] : '2026-04-05';

  const demoPicks = [
    { id:1, match:"Manchester City vs Arsenal", league:"Premier League, England", datetime:"Sat 4 Apr, 15:00", betType:"Over 2.5 Goals", prediction:"OVER 2.5", confidence:88, odds:1.68, reasoning:"Forebet, PredictZ, Windrawwin all agree on 3.1 avg goals.", sites:["Forebet","PredictZ","Windrawwin"] },
    { id:2, match:"Bayern Munich vs Dortmund", league:"Bundesliga, Germany", datetime:"Sat 4 Apr, 18:30", betType:"Both Teams To Score", prediction:"GG", confidence:92, odds:1.55, reasoning:"Betensured + SoccerVista 78% GG in last 8 H2H.", sites:["Betensured","SoccerVista"] },
    { id:3, match:"Real Madrid vs Barcelona", league:"La Liga, Spain", datetime:"Sun 5 Apr, 20:00", betType:"Over 1.5 Goals", prediction:"OVER 1.5", confidence:85, odds:1.35, reasoning:"All major sites predict high-scoring El Clasico.", sites:["Forebet","PredictZ"] },
  ].slice(0, numGames);

  const totalOdds = demoPicks.reduce((acc, p) => acc * p.odds, 1).toFixed(2);

  res.json({
    selections: demoPicks,
    totalOdds: parseFloat(totalOdds),
    message: null
  });
});

app.listen(PORT, () => console.log(`Demo server running on port ${PORT}`));