import {Link} from 'react-router-dom';
import { FetchWithoutId, isAdmin } from "../func";
import '../App.css'

function CategoryBar({user}){
    const categoryList = Array.from(FetchWithoutId("category").data);
    if(!categoryList){ return <div> Loading ... </div>}
    else {
        return (
            <div style={{margin: "10px", textAlign: "center", borderBottom: "1px solid #373737", whiteSpace: "nowrap"}}>
                <b style={{color: "#373737", fontSize: "30px", verticalAlign: "middle"}}> Category : </b> 
                {categoryList?.map((category, index) => (
                    <Link to={`/board/category/${category.id}`} id="none" key={index}> 
                        <button id="btn-category"> {category.name} </button>
                    </Link>
                ))}
                {isAdmin(user?.auth) && <>
                    <Link id='none' to={"/category"}><button id='btn-remove'> Setting </button></Link>
                </>}
                <br/><br/>
            </div>
        )
    }
}

export default CategoryBar;