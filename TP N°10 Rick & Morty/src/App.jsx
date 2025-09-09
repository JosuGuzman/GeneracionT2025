import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Button } from 'semantic-ui-react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <Container style={{ marginTop: '2em' }}>
      {!selectedCharacter ? (
        <CharacterList onCharacterSelect={setSelectedCharacter} />
      ) : (
        <>
          <Button
            onClick={() => setSelectedCharacter(null)}
            primary
            style={{ marginBottom: '1em' }}
          >
            🔙 Volver a la lista
          </Button>
          <CharacterDetail character={selectedCharacter} />
        </>
      )}
    </Container>
  );
}

export default App;