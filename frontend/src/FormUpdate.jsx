import './catalog.css'
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const UPDATE = gql`
  mutation($linkId: ID!, $link: LinkInput!){
    updateLink(linkId: $linkId, link: $link){
        _id
        title
        description
        link
    }
  }
`;

function Modify() {
    const [ updateLinkRequest ] = useMutation(UPDATE);
//  query variables (playground) 
    const updateLink = async (id) => {
        await updateLinkRequest({variables: {linkId: id}})
        loadCatalogRequest({fetchPolicy: "no-cache"})
    }

    return (
        <div className="catalogue">
            <form >
              <p>Title Link:</p>
              <input name="title" />
              <p>Description:</p>
              <input name="description" />
              <p>Link:</p>
              <input name="link" />
              <br/><br/>
              <input type="submit" value="Create"/>
            </form>
        </div>
    )
  
}

export default Modify;