import { useState, useEffect } from "react";
import _ from 'lodash';
import { FetchWithoutId, userLastAccess, userNickname } from '../func';
import ArticleList from './ArticleList';
import '../App.css'

function Board(){
    const [article, setArticle] = useState();
    const [articleData, setArticleData] = useState();

    useEffect(() => {
        if(_.isEmpty(articleData)){
            FetchWithoutId(articleData, setArticleData, "article");
        }else{
            setArticle(articleData);
        }
    }, [articleData]);
    
    function checkUserAccessDate(){
        if(!_.isEmpty(userNickname)){
            const lastAccess = new Date(userLastAccess);
            const today = new Date();
    
            const compare = today.getTime() - lastAccess.getTime();
            const checkDay = compare / (1000 * 60 * 60 * 24);
            
            if(checkDay > 7){
                if(window.confirm("비밀번호를 변경을 추천합니다.\n마지막 로그인 : " + lastAccess.toISOString().substring(0,10) + ".")){
                    window.location.href = "/mypage";
                }
            }
            sessionStorage.setItem("dateAlert", true);
        }
    }
    
    if(_.isEmpty(article)){ return <div style={{marginTop: "100px", textAlign: "center"}}> <b style={{fontSize: "30px"}}>Data Not Found</b> </div> }
    else {
        return (
        <>
            {!_.isEqual(sessionStorage.getItem("dateAlert"),"true") && checkUserAccessDate()}
            <div className='div-box'> 
                <b style={{ fontSize: "30px", margin : "10px"}}> Article List </b><br/>
                <ArticleList articleList={Array.from(article).reverse()}/>
            </div>
        </>
        )
    }
}

export default Board;