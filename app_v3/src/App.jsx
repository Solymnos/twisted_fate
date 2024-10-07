import { useState } from 'react'
import LoadingPage from './pages/LoadingPage';

function App() 
{
	const [ isReady , setIsReady ] = useState(false);
	
	if (!isReady)
	{
		return (
			<LoadingPage />
		)
	}

  return (
    <div>
        <h1>NOT READY</h1>
    </div>
  )
}

export default App
