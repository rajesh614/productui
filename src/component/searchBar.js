import React, {useState, useEffect} from 'react';
import { FcSearch } from 'react-icons/fc';
import './searchbar.css';

const SearchBar = ({placeholder, data}) => {

    const [info, setInfo] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = info.filter((val)=>{
            return val.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if(searchWord == "") {
            setFilterData([]);
        }else{
            setFilterData(newFilter);
        }
    }

    const getData = async () => {
        try {
          const res = await fetch('/getdata');
          const result = await res.json();
          setInfo(result);
          console.log(result);
        } catch (err) {
          console.log(err);
        }
    }

  useEffect(() => {
    getData();
  }, []);

    return (
        <div>
            <div className='search'>
                <div className='searchInputs' style={{marginLeft:'38%'}}>
                <FcSearch/>
                    <input type="text" placeholder={placeholder} onChange={handleFilter}/>
                </div>
                {
                filterData.length !== 0 && (
                <div className="dataResult" style={{marginLeft:'39%'}}>
                    {
                        filterData.slice(0,5).map((value, key)=>{
                            return (
                                <a key={value._id} href={`/productdetail/${value._id}`}>
                                    <p>{value.name}</p>
                                </a>
                            )
                        })
                    }
                </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar;
