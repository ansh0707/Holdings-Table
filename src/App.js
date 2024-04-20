import {useEffect, useState} from "react";
import UserData from "./components/UserData.js";

const API = " https://canopy-frontend-task.now.sh/api/holdings";

const App = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedGroups, setExpandedGroups] = useState({});

    const fetchUsers = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.payload && data.payload.length>0) {
                setUsers(data.payload);
                setLoading(false);
            }
            else{
              setError('No data available')
              setLoading(false)
            }
            console.log(data.payload);
        } catch (e) {
            setError('Error fetching data');
            setLoading(false);
            console.error(e)
        }
    }


    const handleRowClick = (assetClass) => {
      setExpandedGroups(prevState => ({
        ...prevState,
        [assetClass]: !prevState[assetClass]
    }));
  }

    useEffect(() => {
        fetchUsers(API);
    }, [])

    return <>
          {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
        <table>
            <thead>
            <tr>
                <th>NAME</th>
                <th>TICKER</th>
                <th>AVERAGE PRICE</th>
                <th>MARKET PRICE</th>
                <th>MARKET VALUE</th>
                <th>LATEST CHANGE PERCENTAGE</th>
            </tr>
            </thead>
            <tbody>
            <UserData users={users} handleRowClick={handleRowClick} expandedGroups={expandedGroups}/>
            </tbody>
        </table>
      )}
    </>
}

export default App;