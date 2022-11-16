import './catalog.css'
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const CREATE = gql`
  mutation($category: CategoryInput!){
  createCategory(category: $category){
    _id
    title
  }
}
`;

function Form() {
    const [createCategoryRequest] = useMutation(CREATE);
    
    const createCategoryAction = async (event) => {
        event.preventDefault();
        
        //utilitario para obtener los names de un formulario
        const dataForm = new FormData(event.target)
        
        await createCategoryRequest({ variables: { 
            "category":{
                "title": dataForm.get("title"),
            }
        } })
      
    }

    return (
        <div className="catalogue">
            <form onSubmit={createCategoryAction}>
              <p>Title Category:</p>
              <input name="title" />
              <br/><br/>
              <input type="submit" value="Create"/>
            </form>
        </div>
    )
}

export default Form
