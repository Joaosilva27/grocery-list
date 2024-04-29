import axios from "axios";
import { useState } from "react";

function App() {
  const [imageSearch, setImageSearch] = useState();
  const [imageSearchList, setImageSearchList] = useState([]);
  const [imageResults, setImageResults] = useState([]);

  const onHandleSearch = async e => {
    e.preventDefault();

    let data = JSON.stringify({
      q: `supermarket ${imageSearch}`,
      num: 1,
    });

    let config = {
      method: "post",
      url: "https://google.serper.dev/images",
      headers: {
        "X-API-KEY": "1f75c2b111ad0bd95a563938e5cb0d1cdb8add15",
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(JSON.stringify(response.data));

      setImageSearchList(prevState => [imageSearch, ...prevState]);

      setImageResults(prevState => [...response.data.images, ...prevState]);

      setImageSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleClearList = () => {
    setImageSearchList([]);
    setImageResults([]);
  };

  const GroceryCard = ({ item, image }) => (
    <div className='flex justify-between items-center w-full mb-3'>
      <span className='ml-6'>{item}</span>
      <img className='w-20 h-20 object-cover' src={image}></img>
    </div>
  );

  return (
    <div className='flex justify-center items-center m-10 flex-col'>
      <div className='flex mb-10'>
        <form className='flex'>
          <input onChange={e => setImageSearch(e.target.value)} value={imageSearch} className='text-black'></input>
          <button className='ml-4 mr-2' onClick={onHandleSearch}>
            search
          </button>
        </form>

        <button onClick={onHandleClearList}>clear list</button>
      </div>
      {imageResults.map((image, index) => (
        <GroceryCard item={imageSearchList[index]} image={image.imageUrl} key={index} />
      ))}
    </div>
  );
}

export default App;
