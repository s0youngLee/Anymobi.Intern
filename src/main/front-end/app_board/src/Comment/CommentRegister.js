import React,{useState, useCallback} from "react";

function CommentRegister(){
    const urlList = ((window.location.href).split('/'));
    const articleId = urlList[(urlList.length)-1]
    
    const [userId, setUserId] = useState("unknown");
    const [content, setContent] = useState("");

    const axios = require('axios');

    const addUserId = useCallback(e => {
        setUserId(e.target.value);
    }, [])
    
    const addContent = useCallback(e => {
        setContent(e.target.value);
    }, [])
    
    const isEmpty = function(value){
        if(value === "" || value === null || value === undefined || ( value !== null && typeof value === "object" && !Object.keys(value).length)){
            return true;
        }else { return false; }
    }

    const addComment = (e) => {
        if(isEmpty(userId)){ setUserId("unknown"); }
        
        if(isEmpty(content)){
            alert("You must input content!!!");
            return Error;
        }else{setContent(content);}

        console.log(userId + " " + content + " " + articleId);
        axios.post(`/comment`, {
            data: {
                user_id: userId,
                content: content,
                article_id: articleId
            }
        }).then(() => {window.location.href=`/board/${articleId}`})
        
        
        alert("comment registerd");
    }

    return(
        <form onSubmit={addComment}>
            <div id="div-align">
                <b> Add Comment</b> <br/>
                <input id="id-box" placeholder="User Id"
                       onChange={addUserId}></input> <br/>
                <textarea id="text-box" placeholder="Add a comment"
                          onChange={addContent}></textarea> 
                <button type="submit" id="btn-post"> Add </button>
            </div>
            <br/>
        </form>
    )
}

export default CommentRegister;