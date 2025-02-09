const HomeScreen = () => {

  const handlePlay = () => {
    // redirigir usando react router dom
    window.location.href = '/pets'
  }
  

  return (
    <div>
      <h1>Home Screen</h1>
      <button onClick={handlePlay}>Play</button>
    </div>
  )
}

export default HomeScreen