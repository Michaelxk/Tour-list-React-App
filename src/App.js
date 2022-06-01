import React from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {

  const [loading, setLoading] = React.useState(true);
  const [tours, setTours] = React.useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter(tour => tour.id !== id);
    setTours(newTours);
  }

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    }
    catch (err) {
      setLoading(false);
      console.log(err);
    }
  
  }
  React.useEffect(() => {
    fetchTours();
  },[])

  if(loading) {
    return (
      <main>
        <Loading />
      </main>  
    );
  }
  if(tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={fetchTours}>Refresh Tours</button>
        </div>
      </main>
    );
  }
  return (
    <main>
     <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

  

export default App

