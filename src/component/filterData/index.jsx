import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

const FilterData = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchingData = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log('err:', err);
    }
  };
  console.log('data:', data);

  const StarRating = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    const star = [];
    for (let i = 0; i < filledStars; i++) {
      star.push(<span key={i}>&#9733;</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      star.push(<span key={i}>&#9734;</span>);
    }

    return <div>{star}</div>;
  };
  useEffect(() => {
    fetchingData();
  }, []);

  const handleOptionChange = (e) => {
    const category = e.target.value;
    // console.log('category:', category);deb
    if (category === selectedOption) {
      setSelectedOption('');
    } else {
      setSelectedOption(category);
    }
  };
  const filterData = selectedOption
    ? data.filter((item) => item.category === selectedOption)
    : data;

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    // console.log('query:', query)
    setSearchQuery(query);
  };

  const searchData = searchQuery
    ? filterData.filter((item) =>
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filterData;
  console.log('searchData', searchData);
  return (
    <>
      <nav>
        <input
          type='text'
          placeholder='Search by title...'
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </nav>
      <div className={styles.mainCont}>
        <section className={styles.textCont}>
          <div className={styles.labelWithRadio}>
            <input
              type='checkbox'
              value="men's clothing"
              checked={selectedOption === "men's clothing"}
              onChange={handleOptionChange}
            />
            <label>men</label>
          </div>
          <div className={styles.labelWithRadio}>
            <input
              type='checkbox'
              value="women's clothing"
              checked={selectedOption === "women's clothing"}
              onChange={handleOptionChange}
            />
            <label htmlFor=''>women</label>
          </div>
          <div className={styles.labelWithRadio}>
            <input
              type='checkbox'
              checked={selectedOption === 'electronics'}
              value='electronics'
              onChange={handleOptionChange}
            />
            <label htmlFor=''>Electronics</label>
          </div>
          <div className={styles.labelWithRadio}>
            <input
              type='checkbox'
              checked={selectedOption === 'jewelery'}
              value='jewelery'
              onChange={handleOptionChange}
            />
            <label>Jewellery</label>
          </div>
        </section>
        <section className={styles.dataCont}>
          {searchData && searchData.length === 0 ? (
            <div style={{ margin: '8rem 12rem', width: '100%' }}>
              404-data not found
            </div>
          ) : (
            searchData?.map((item) => (
              <div className={styles.SingleBox} key={item.id}>
                <div className={styles.imgCont}>
                  <img src={item.image} alt='image' />
                </div>
                <div>
                  <p>
                    {item.title.length > 25 ? (
                      <>{item.title.slice(0, 25)}...</>
                    ) : (
                      <>{item.title}</>
                    )}
                  </p>
                </div>
                <div className={styles.ratePrice}>
                  <p>Price:&nbsp;{item.price}</p>
                  <p>
                    <StarRating rating={item?.rating?.rate} />
                  </p>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
};

export default FilterData;
