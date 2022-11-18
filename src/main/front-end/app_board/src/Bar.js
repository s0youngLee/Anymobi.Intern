import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'w3-css';
import { FetchWithoutId, ifError, isAdmin } from "./func";
import _ from "lodash";

function Bar() {
    const [categoryList, setCategoryList] = useState();
    const [categoryData, setCategorydata] = useState();

    useEffect(() => {
        if(_.isEmpty(categoryData)){
            FetchWithoutId(categoryData, setCategorydata, "category");
        }else{
            setCategoryList(categoryData.data);
        }
    },[categoryData]);

    function isLogin(){
        if(_.isEqual(sessionStorage.getItem("login"), "true")){
            return true;
        }else{
            return false;
        }
    }
    
    return ( 
        <>
        <div className="bar-top">
            <div className="w3-bar w3-large" style={{backgroundColor:"#cab6ff"}}>
                <div className="bar-left">
                    <Link to={'/'} className="none bar-item-left"><button className="w3-bar-item w3-button w3-hover-deep-purple" >Home</button></Link>
                    <Link to={'/board'} className="none bar-item-left"><button className="w3-bar-item w3-button w3-hover-deep-purple">Board</button></Link>
                        
                    <div className="w3-dropdown-hover">
                        <button className="w3-button w3-hover-deep-purple">Category</button>
                        <div className="w3-dropdown-content w3-bar-block barcontent">
                            {categoryList?.map((category, index) => (
                                <Link className="none" key={index} to={`/board/category/${category.id}`}>
                                    <button className="w3-bar-item w3-button w3-light-gray w3-hover-deep-purple"> {category.name} </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                    {isAdmin() && <Link to={"/category"} className="none bar-item-left">
                        <button className="w3-bar-item w3-button w3-hover-red">Setting</button></Link>}
                </div>
                
                <div>
                    {!isLogin() && <Link to={'/login/signup'} className="none">
                        <button className="w3-bar-item w3-button w3-hover-deep-purple w3-right">Register</button></Link>}
                    {!isLogin() && <Link to={'/login'} className="none">
                        <button className="w3-bar-item w3-button w3-hover-deep-purple w3-right">Login</button></Link>}
                    {isLogin() && <Link to={'/mypage'} className="none">
                        <button className="w3-bar-item w3-button w3-hover-deep-purple w3-right">MyPage</button></Link>}
                    {isLogin() && <button className="w3-bar-item w3-button w3-hover-red w3-right"
                        onClick={() => Logout()}>Logout</button>}
                </div>
            </div>
        </div>
        </>
    );
}

export function Logout() {
    axios.put("/user/lastaccess")
    .then(() => {
        sessionStorage.clear();
        axios.post('/logout');
        // alert("Logout successful. Return to login page.");
        alert("로그아웃되었습니다. 로그인 페이지로 이동합니다.");
        window.location.replace('/login');
    })
    .catch((e) => {
        ifError(e);
    });
};

export default Bar;