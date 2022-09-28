import React, {useState, useCallback, useEffect} from "react";


function CategoryEdit(){
    const urlList = ((window.location.href).split('/'));
    const categoryId = urlList[(urlList.length)-2];
    
    const [category, setCategory] = useState({
        data : {}
    });
    const [loading, setLoading] = useState(true);
    
    useEffect(()=> {
        const RES = fetch(`/category/${categoryId}`)
        .then(res =>  res.json())
        .then(result => {
            setCategory(result);
            setLoading(false);
        });
    },[]);

    if(loading) {return <div> Loading ... </div>}
    else { 
        return  <CategoryEditForm categoryId={categoryId} nameOrigin={category.data.name}/>
    }
}

function CategoryEditForm({categoryId, nameOrigin}){
    const axios = require('axios');
    const [categoryName, setCategoryName] = useState(nameOrigin);
    
    const editName = useCallback( e => {
        setCategoryName(e.target.value);
    }, [])

    const isEmpty = function(value){
        if(value === "" || value === null || value === undefined || ( value !== null && typeof value === "object" && !Object.keys(value).length)){
            return true;
        }else { return false; }
    }

    const editCategory = (e) => {
        if(isEmpty(e.target.value)){ setCategoryName(nameOrigin); }

        axios.put(`/category/${categoryId}`, {
            data : {
                name: categoryName
            }
        })

        alert("category: " + nameOrigin + " id: " + categoryId + " edited. \n After : " + categoryName);
    }


    return (
        <><br/><br/><br/>
        <form onSubmit={editCategory}>
            <div id="div-box">
                <b style={{textAlign: "center"}}> Edit Category </b> <br/>
                <input id="id-box" placeholder={categoryId} readOnly></input> <br/>
                <input id="id-box" placeholder={nameOrigin} onChange={editName}></input> <br/>
                <button type="submit" id="btn-post" style={{textAlign: "right"}}
                     onClick={() => {window.location.href=`/category/${categoryId}`}}> Save </button>
            </div>
        </form></>
    )
}

export default CategoryEdit;