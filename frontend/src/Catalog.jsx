import './catalog.css'
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Modify from './FormUpdate';

const CATALOGUE = gql`
  query{
    links{
      _id
      title
      description
      link
      category{
      title
    }
    }
  }
`;

const DELETE = gql`
  mutation($linkId: ID!){
    deleteLink(linkId: $linkId){
      title
    }
  }
`;

function Catalog() {
  const [ deleteLinkRequest ] = useMutation(DELETE);
  const [ loadCatalogRequest , { error, data}] = useLazyQuery(CATALOGUE);
  const [ visible, setVisible ] = useState(false);

  //  query variables (playground) 
  const deleteLink = async (id) => {
    console.log(id);
    await deleteLinkRequest({variables: {linkId: id}})
    loadCatalogRequest({fetchPolicy: "no-cache"})
  }

  
  useEffect(() => {
    loadCatalogRequest()
  }, [])

  if (error) return <p>Error :(</p>;

  return (
    <div className="catalogue">
      {
        (data ?? {}).links?.map(({ _id, title, description, link, category}) => (
          <div key={_id} className="card-link">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{link}</p>
            <p>{category?.title}</p>
            <button onClick={() => deleteLink(_id)}>Delete</button>
            <br />
            <button onClick={() => setVisible(true)}>Modificar</button>
            
            {visible && <Modify/>}
          </div>
        ))
      }
    </div>
  )
}

export default Catalog
