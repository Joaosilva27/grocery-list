import axios from "axios";
import { useState, useEffect } from "react";
import MinusCartIcon from "./Icons/cart-minus.png";

function App() {
  const [imageSearch, setImageSearch] = useState("");
  const [imageSearchList, setImageSearchList] = useState(() => {
    const storedList = localStorage.getItem("imageSearchList");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [imageResults, setImageResults] = useState(() => {
    const storedResults = localStorage.getItem("imageResults");
    return storedResults ? JSON.parse(storedResults) : [];
  });

  const onHandleSearch = async e => {
    e.preventDefault();

    if (imageSearch) {
      let data = JSON.stringify({
        q: `supermarket packaging clear photo of ${imageSearch} on a plain background`,
        num: 1,
      });

      let config = {
        method: "post",
        url: "https://google.serper.dev/images",
        headers: {
          "X-API-KEY": import.meta.env.VITE_SERPER_API_KEY,
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await axios(config);
        console.log(JSON.stringify(response.data)); // Log the response to check the structure

        // take only the first google image result
        const firstImage = response.data.images[0];

        setImageSearchList(prevState => [imageSearch[0].toUpperCase() + imageSearch.substring(1), ...prevState]);

        setImageResults(prevState => [firstImage, ...prevState]);

        setImageSearch("");
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
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
      <span className='ml-6 font-semibold'>{item}</span>
      <div className='flex items-center'>
        <img className='w-20 h-20 object-cover rounded-xl' src={image} alt=''></img>
        <img className='w-8 h-8 ml-2 cursor-pointer' src={MinusCartIcon} alt='Remove' onClick={() => onHandleRemoveItem(index)} />
      </div>
    </div>
  );

  useEffect(() => {
    localStorage.setItem("imageSearchList", JSON.stringify(imageSearchList));
    localStorage.setItem("imageResults", JSON.stringify(imageResults));
  }, [imageSearchList, imageResults]);

  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center m-10 flex-col lg:w-3/12'>
        <div className='flex mb-10'>
          <form className='flex'>
            <input
              placeholder='Add groceries...'
              onChange={e => setImageSearch(e.target.value)}
              value={imageSearch}
              className='text-black bg-white rounded-full outline-none pl-6'
            ></input>
            <button className='bg-green-500 ml-2 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl text-sm' onClick={onHandleSearch}>
              Add
            </button>
          </form>
          <button className='bg-green-500 ml-2 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl text-sm' onClick={onHandleClearList}>
            Clear List
          </button>
        </div>
        {imageResults.map((image, index) => (
          <GroceryCard item={imageSearchList[index]} image={image.imageUrl} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
