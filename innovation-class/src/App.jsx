import { useState } from 'react';
import { InputGroup, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Imagem from './assets/images/imagem.png';

function App() {
  const [ username, setUsername ] = useState('');
  const [ userData, setUserData ] = useState(null);
  const [ error, setError ] = useState('');

  const fetchGitHubUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente');
      const data = await response.json();
      setUserData(data);
      setError('');
    } catch (err) {
      setUserData(null);
      setError(err.message);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs={10} md={6} className="text-center">
          <img src={Imagem} alt="Imagem" className="img-fluid" />
        </Col>
      </Row>

      <Form onSubmit={fetchGitHubUser}>
        <Row className="justify-content-center">
          <Col xs={11} md={8} lg={6}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Digite o nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <Search />
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>

      {error && (
        <Row className="justify-content-center">
          <Col xs={11} md={8} lg={6}>
            <div className="alert text-danger text-center" style={{ backgroundColor: '#D9D9D9' }}>
              {error}
            </div>
          </Col>
        </Row>
      )}

      {userData && (
        <Row className="justify-content-center mt-3">
          <Col xs={11} md={8} lg={6}>
            <div className="card" style={{ backgroundColor: '#D9D9D9' }}>
              <div className="card-body d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <img
                  src={userData.avatar_url}
                  alt="Avatar"
                  className="rounded-circle border border-primary"
                  width="150"
                />
                <div className="text-center text-md-start">
                  <h4 className="card-title text-primary">{userData.login}</h4>
                  <p className="card-text">{userData.bio || 'Sem bio disponível.'}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
