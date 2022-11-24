import axios from "axios";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import "../App.css";

function LoginForm(){
    sessionStorage.setItem("dateAlert", false);
    const remember = document.getElementsByName('remember');
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const inputId = useCallback(e => {
        setId(e.target.value);
    }, []);

    const inputPw = useCallback(e => {
        setPw(e.target.value);
    }, []);
    
    let form = new FormData();
        form.append('username', id);
        form.append('password', pw);

    const userlogin = (e) => {
        e.preventDefault();
        if(remember[0].checked){
            form.append('remember', remember[0].checked);
        }
        if(_.isEmpty(id) || _.isEmpty(pw)){
            alert("입력란을 채워주세요");
            return Error;
        }
        
        axios.post('/login', form)
        .then((res) => {
            sessionStorage.setItem("userinfo", res.data);
            alert("성공적으로 로그인되었습니다.");
            
            if(_.isEqual(res.headers.lastlogin, "true")){
                if(window.confirm("비밀번호 변경을 추천합니다.\n확인을 누르면 마이페이지로 이동합니다.")){
                    sessionStorage.setItem("dateAlert", true);
                    window.location.replace("/mypage");
                }else{
                    alert("게시판 페이지로 이동합니다.");
                    sessionStorage.setItem("dateAlert", true);
                    window.location.replace("/board");
                }
            }else{
                alert("게시판 페이지로 이동합니다.");
                sessionStorage.setItem("dateAlert", true);
                window.location.href = "/board";
            }
        })
        .catch((err) => {
            if(err.response.status === 401){
                alert("잘못된 비밀번호입니다.\n다시 시도하세요.");
            }else if(err.response.status === 404){
                alert("존재하지 않는 아이디입니다.");
            }else {
                alert(err + "\n로그인 실패.");
                // window.location.reload();
            }
        })
    }
    
    const usernameSelected = _.isEmpty(document.getElementById("username")?.value);
    const passwordSelected = _.isEmpty(document.getElementById("password")?.value);

    return (
    <div className="div-box" style={{marginLeft: "10px"}}>
        <br/>
        <form >
            <h2 > App_Board </h2> <hr/>
            <div className="input-group">
                <input type="text" id="username" name="username" className={ usernameSelected ? "input-default" : "input"}
                        onChange={inputId} required autoFocus/>
                <label htmlFor="username" className={ usernameSelected ? "input-label-default" : "input-label"}>
                    ID(Email)</label>
            </div>
            <div className="input-group">
                <input type="password" id="password" name="password" className={ passwordSelected ? "input-default" : "input"}
                       onChange={inputPw} required/>
                <label htmlFor="password" className={ passwordSelected ? "input-label-default" : "input-label"}>
                    Password</label>
            </div>
            <p>
                <input type={'checkbox'} name='remember'/> &nbsp;자동 로그인
            </p>
            <button className="w3-button w3-border w3-round-xlarge w3-small w3-hover-teal" type="submit" 
                    onClick={userlogin} >로그인</button>
            <Link className="none" to="/login/signup">
                <button className="w3-button w3-round-xlarge w3-small w3-hover-deep-purple w3-border">회원가입</button>
            </Link>
        </form> 
    </div>
    )
}

export default LoginForm;