import React from 'react'
import ReactDOM from 'react-dom/client'
import Catalog from './Catalog.jsx'
import FormLink from './FormLink.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Category from './Category.jsx';
import FormCategory from './FormCategory.jsx';
import Container from './Container.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
  },
  {
    path: "/links",
    element: <Catalog />,
  },
  {
    path: "/createLink",
    element: <FormLink/>,
  },
  {
    path: "/createCat",
    element: <FormCategory/>,
  },
]);

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
