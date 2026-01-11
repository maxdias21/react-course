import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from './loc.js';

// Eu salvei os locais favoritos no local storage do navegador, quando a pessoa fecha, fica salvo
// Vou carregar toda vez que ela iniciar o meu site

// Pegar os items do local storage e converter para um array
const storageIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

// A variável acima retorna apenas os ids, sem foto/nem nada, para isso, vou pegar o id dela e fazer uma busca
// dos objetos que eu tenho para ver se o id bate e eu pegue todas as informações
const storagePlaces = storageIds.map(id => AVAILABLE_PLACES.find((place) => place.id === id));

function App() {
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storagePlaces);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // Converter os json salvo no local storage do navegador em array
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

    // Se o id não existir, eu adiciono
    if(storedIds.indexOf(id) === -1) {
      // Enviar um array em formato json
    localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }
  }

  // useCallback vai ser útil pelos seguintes motivos
  // na minha função DeleteConfirmation, eu recebo essa função como uma prop
  // no useEffect, porém, sempre que eu executo a função App, tudo dentro dela
  // é recriado incluindo funções, logo a função por mais que não mude, no 
  // js ela "muda" o endereço na memória, isso causaria um loop infinito,
  // useCallback resolve esse problema, agora só muda se algo na função mudar
  // (dependência)
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    setModalIsOpen(true);

    // Converter os json salvo no local storage do navegador em array
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

    // Enviar para o storage do navegador os ids dos lugares que quero visitar
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));

  }, [])
  

  // Uso para pegar a localização da pessoa e uso uma função para mostrar o local mais próximo dela
  // Executado apenas uma vez, não preciso de dependência
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.altitude);
      setAvailablePlaces(sortedPlaces);
    });
  }, [])

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting place by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
