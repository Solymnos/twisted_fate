import { Button } from "@/components/ui/button";
import { BrowserRouter as Router , Route , Routes , Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BetsPage from "./pages/BetsPage";
import ProfilePage from "./pages/ProfilePage";
import TeamPage from "./pages/TeamPage";
import RankPage from "./pages/RankPage";

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/bets' element={<BetsPage />}/>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/team' element={<TeamPage /> } />
        <Route path='/rank' element={<RankPage />} />
      </Routes>
    </Router>
  )
}

export default App

/*

THEME : 

DARK    :   #181818
WHITE   :   #FFFFFF
PURPLE  :   #B096E5

*/