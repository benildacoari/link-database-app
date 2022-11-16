import './catalog.css'
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const CREATE = gql`
  mutation($link: LinkInput!){
    createLink(link: $link){
      _id
      title
      description
      link
    }
  }
`;

const QUERYCATEGORY = gql`
    query{
    categorys{
        _id
        title
    }
    }
`;

function Catalog() {
    const [createLinkRequest] = useMutation(CREATE);
    const [ loadTolistRequest , { error, data}] = useLazyQuery(QUERYCATEGORY);

    useEffect(() => {
        loadTolistRequest()
    }, [])

    if (error) return <p>Error :(</p>;

    const createLinkAction = async (event) => {
      event.preventDefault();
      
      //utilitario para obtener los names de un formulario
      const dataForm = new FormData(event.target)
      
      await createLinkRequest({ variables: { "link": {
		    "title": dataForm.get("title"),
        "description": dataForm.get("description"),
        "link": dataForm.get("link"),
        "category": dataForm.get("categoryid")
      } } })
      
    }

    return (
        <div className="catalogue">
            <form onSubmit={createLinkAction}>
              <p>Title Link:</p>
              <input name="title" />
              <p>Description:</p>
              <input name="description" />
              <p>Link:</p>
              <input name="link" />
              <br/><br/>
              <select name="categoryid">
                {
                  (data ?? {}).categorys?.map(({ _id, title}) => (
                      <option key={_id} value={_id}>
                        {title}
                      </option>
                  ))
                } 
              </select>
              <input type="submit" value="Create"/>
            </form>
        </div>
    )
}

export default Catalog
