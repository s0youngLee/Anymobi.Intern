import {Link} from 'react-router-dom';
import * as Function from "../func";
import '../App.css'

function CategoryBar(){
    const categoryList = Function.FetchingCategory();
   
    return (
        <div style={{margin: "10px", textAlign: "center", borderBottom: "1px solid #373737", whiteSpace: "nowrap"}}>
            <b style={{color: "#373737", fontSize: "30px", verticalAlign: "middle"}}> Category : </b> 
            {categoryList?.map((category, index) => (
                <Link to={`/board/category/${category.id}`} id="none" key={index}> 
                    <button id="btn-category"> {category.name} </button>
                </Link>
            ))}
            <br/><br/>
        </div>
    )
}

export default CategoryBar;