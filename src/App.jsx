import axios from "axios";
import { useState } from "react";

function App() {
  const [imageSearch, setImageSearch] = useState();
  const [imageSearchList, setImageSearchList] = useState([]);
  const [imageResults, setImageResults] = useState([]);

  const onHandleSearch = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const GroceryCard = ({ item, image }) => (
    <div className='flex '>
      <span className='ml-6'>{item}</span>
      <img className='w-20' src={image}></img>
    </div>
  );

  return (
    <div className='flex justify-center items-center m-10 flex-col'>
      <input onChange={e => setImageSearch(e.target.value)} value={imageSearch} className='text-black'></input>
      <button onClick={onHandleSearch}>search</button>
      {imageResults.map((image, index) => (
        <GroceryCard item={imageSearchList[index]} image={image.imageUrl} key={index} />
      ))}
    </div>
  );
}

export default App;
