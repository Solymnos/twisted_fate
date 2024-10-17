import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ScheduleProvider } from './context/ScheduleContext.jsx'
import { OverProvider } from './context/OverContext.jsx'
import { CookieProvider } from './context/CookieContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { BetsProvider } from './context/BetsContext.jsx'
import { GeneralDataProvider } from './context/GeneralDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookieProvider>
      <UserProvider>
        <ScheduleProvider>
          <OverProvider>
            <BetsProvider>
              <GeneralDataProvider>
                <App />
              </GeneralDataProvider>
            </BetsProvider>
          </OverProvider>
        </ScheduleProvider>
      </UserProvider>
    </CookieProvider>
  </StrictMode>,
)
