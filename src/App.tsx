import React from 'react'
import { Container, Form, Row, Button, Col } from 'react-bootstrap';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import './scss/App.scss';

export const getJsonFromHashString = (str: string): Record<string, any> => {
  const query = str.substr(1);
  const result: Record<string, any> = {};

  query.split('&').forEach(function(part) {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });

  return result;
};

interface MainPageProps {
  location: any
};

type BitBucketAuthParams = {
  access_token: string | undefined;
  expires_in: string | undefined;
  scopes: string | undefined,
  token_type: string | undefined
};

function MainPage({location}: MainPageProps): JSX.Element {
  const params = getJsonFromHashString(location.hash) as BitBucketAuthParams;

  if(params.access_token) {
    return (
      <Container>
        <Row>
            <h1>Bitbucket Authenticated!</h1>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Token:</Form.Label>
            <Form.Control type="text" placeholder={params.access_token} readOnly/>
              <Button
                onClick={() => {navigator.clipboard.writeText(params.access_token ?? '')}}
              >Copy</Button>
          </Form.Group>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
            <h1>No Token Provided!</h1>
        </Row>
      </Container>
    );
  }
}

function App() {
  return (
    <BrowserRouter>
      <Route component={MainPage}/>
    </BrowserRouter>
  )
}

export default App;
