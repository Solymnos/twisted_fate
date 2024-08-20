"use client"

import UserAuthCard from "./components/spec/UserAuthCard"

function App() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6">
        <UserAuthCard />
      </div>
    </div>
  )
}

export default App