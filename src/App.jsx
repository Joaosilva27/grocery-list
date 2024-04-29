import axios from "axios";
import { useState } from "react";
import MinusCartIcon from "./Icons/cart-minus.svg";

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

      setImageSearchList(prevState => [imageSearch[0].toUpperCase() + imageSearch.substring(1), ...prevState]);

      setImageResults(prevState => [...response.data.images, ...prevState]);

      setImageSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleRemoveItem = index => {
    setImageSearchList(prevState => {
      const newList = [...prevState];
      newList.splice(index, 1);
      return newList;
    });

    setImageResults(prevState => {
      const newResults = [...prevState];
      newResults.splice(index, 1);
      return newResults;
    });
  };

  const onHandleClearList = () => {
    setImageSearchList([]);
    setImageResults([]);
  };

  const GroceryCard = ({ item, image, index }) => (
    <div className='flex justify-between items-center w-full mb-3'>
      <span className='ml-6'>{item}</span>
      <div className='flex'>
        <img className='w-20 h-20 object-cover rounded-xl' src={image} alt=''></img>
        <img className='w-8 ml-2 cursor-pointer' src={MinusCartIcon} alt='Remove' onClick={() => onHandleRemoveItem(index)} />
      </div>
    </div>
  );

  return (
    <div className='flex justify-center items-center m-10 flex-col'>
      <div className='flex mb-10'>
        <form className='flex'>
          <input
            placeholder='Search groceries...'
            onChange={e => setImageSearch(e.target.value)}
            value={imageSearch}
            className='text-black bg-white rounded-full outline-none pl-6'
          ></input>
          <button className='ml-4 mr-2' onClick={onHandleSearch}>
            Search
          </button>
        </form>
        <button onClick={onHandleClearList}>Clear List</button>
      </div>
      {imageResults.map((image, index) => (
        <GroceryCard item={imageSearchList[index]} image={image.imageUrl} index={index} key={index} />
      ))}
    </div>
  );
}

export default App;
