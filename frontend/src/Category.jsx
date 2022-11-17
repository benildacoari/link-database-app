import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const QUERYCATEGORY = gql`
    query{
    categorys{
        _id
        title
    }
    }
`;

const CATALOGUE = gql`
  query{
    links{
        _id
        title
        description
        link
        category{
            _id  
            title
        }
    }
  }
`;

function Tolist() {
    const [ loadTolistRequest , { error, data}] = useLazyQuery(QUERYCATEGORY);
    const [ loadCatalogRequest , { error: errorl, data: datal}] = useLazyQuery(CATALOGUE);

    useEffect(() => {
        loadTolistRequest()
        loadCatalogRequest()
      }, [])
    
    if (error || errorl) return <p>Error :(</p>;

    return (
        <div className='listaCateg'>
            {
                (data ?? {}).categorys?.map(({ _id, title}) => (
                    <div key={_id} className="categ">
                      <h3>{title}</h3>
                      {
                        (datal ?? {}).links?.map(({ _id: idlink, title: titlelink, link, category}) => (
                            <div key={idlink + ' - ' + _id}>
                                {category?._id === _id && (
                                    <div className="enlace">
                                        <p>{titlelink}</p>
                                        <a href={link} target="_blank" >{link}</a>
                                    </div>
                                )}
                            </div>
                          ))
                      }
                    </div>
                  ))
            }
            <div className="categ">
                {
                (datal ?? {}).links?.map(({ _id: idlink, title: titlelink, link, category}) => (
                    <div key={idlink + 'no-category'}>
                        {!Boolean(category) && (
                            <div className="enlace">
                                <p>{titlelink}</p>
                                <a href={link} target="_blank" >{link}</a>
                            </div>
                        )}
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Tolist