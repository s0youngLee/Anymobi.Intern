import { useState } from 'react';
import { FetchWithId, Delete, canChange } from '../func';
import _ from 'lodash';
import * as Modal from 'react-modal';
import Comment from "../Comment/Comment";
import Files from './FileForm';
import ArticleEditForm from './ArticleEdit';

function ArticleDeatil({user, isLogin}){
    const articleDetail = FetchWithId("board", 1).data;
    if(!articleDetail) { return <div> Loading .. </div>}
    else { return <ArticleDetailData data={articleDetail} user={user} isLogin={isLogin}/>; }
}

function ArticleDetailData({data, user, isLogin}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {setIsOpen(false);}

    if(!data?.created_id){ return <div> Loading ... </div> }
    else {
        return (
            <><div className='div-box' style={{padding: "10px", overflow: "auto", marginLeft: "20px", textAlign: "left", height: "45vh"}}>
                    <b style={{fontSize: "30px"}}>{data?.title}</b><br/>
                    <span style={{fontSize: "17px", color: "gray"}}> {data?.created_at} </span><br/>
                    <span style={{fontSize: "17px"}}> Posted in <b>{data?.category_name} </b> by <b>{data?.created_id} </b> / visit : <b>{data?.visit_cnt}</b></span>
                    <div className='div-box' style={{overflow: "auto", height: "60%", marginTop: "5px", textAlign: "left"}}>
                        <div className='content-box'> {data?.content} </div> <span style={{fontSize:"17px", color:"gray"}}> Finally edited : {data?.final_edit_date} </span><br/>
                        <b style={{fontSize: "17px"}}> File list </b><br/>
                        <Files files={data?.files} user={user} createdId={data?.id}/>
                        
                    </div>
                    { _.isEqual(data?.created_id, user?.nick_name) &&
                        <button style={{float: "right"}} className="w3-button w3-border w3-round-xlarge w3-small w3-hover-teal"
                                onClick={() => setIsOpen(true)}>Edit</button>
                    }
                    <Modal isOpen={isOpen} onRequestClose={handleClose}>
                        <ArticleEditForm user={user} articleDetail={data} handleClose={handleClose} />
                    </Modal>
                    {canChange(user, data?.created_id) &&
                        <button style={{float: "right"}} className="w3-button w3-border w3-round-xlarge w3-small w3-hover-red" 
                                onClick={() => { Delete("board", data.id) }}>Delete</button>
                    }
                </div><hr/>
                <Comment article={data} user={user} isLogin={isLogin}/>
            </>
        )
    }
}

export default ArticleDeatil;
Modal.setAppElement('#root')