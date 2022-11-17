import './catalog.css';
import Tolist from "./Category";
import Catalog from "./FormLink";
import logo from "./assets/logo.png";

function Container(){
    return(
        <div className="">
            <div className='encabezado'>
                <Catalog />
                <div>
                    <h1>My links</h1>
                </div>
                <div>
                    <img src={logo} /> 
                </div>
            </div>
            <div>
                <Tolist />
            </div>
        </div>
    )
}

export default Container;