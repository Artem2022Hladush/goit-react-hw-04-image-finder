import {useState, useEffect} from "react";
import Notiflix from "notiflix";
import api from "./service/api";
import {Searchbar} from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import {Modal} from "./Modal/Modal";



export function App(){
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [photo, setPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null)

  useEffect(()=>{
    if(query === ' ') {
      return;
    }
  
    async function getImages() {
      try {
        const response = await api
        .fetchApi(query, page)
        .then(images => {
          setPhoto(prev => [...prev, ...images.data.hits]);
        })
        .finally(() => setIsLoading(false));
  
            response.then(images => {
          if (images.data.totalHits === 0) {
            Notiflix.Notify.failure('Enter correct request');
            setPhoto([]);
            return;
          }
          images.data.hits.forEach(
            ({ id, webformatURL, largeImageURL, tags }) => {
              setPhoto(prev => [
                ...prev,
                { id, webformatURL, largeImageURL, tags },
              ]);
              setTotalPages(Math.ceil(images.data.totalHits / 12));
              setIsLoading(false);
            }
          );
        });
      } catch  {
        setError("Something went wrong. Try one more time.")
        setIsLoading(false)
      } 
    }
  
    getImages();
  }, [query, page, setTotalPages, setError])

const handleFormSubmit = name =>{
  setPhoto([]);
  setQuery(name);
  setPage(1)
}


const loadMore=()=> {
  setPage(prev => prev +1)
}

const togleModal=()=> {
  setShowModal(prev => !prev)
}

const onClick=(photo)=>{
  setLargeImage(photo);
  setShowModal(true)
}

  return (
    <>
    <Searchbar onSubmit={handleFormSubmit}/>
    {isLoading && <Loader/>}
    {error && <p style={{color: 'red'}}>{error}</p>}
    {showModal && <Modal src={largeImage} onClose={togleModal}/>}
    {photo.length > 0 && <ImageGallery items={photo} onClick={onClick}/>}
    {photo.length!==0 &&  <Button onLoadMore={loadMore}/>}
    </>
    );
};