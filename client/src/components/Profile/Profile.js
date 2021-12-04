import React, { Component } from 'react'
import { connect } from "react-redux"
import { useState } from "react"
import 'antd/dist/antd.css'
import { Avatar } from 'antd'
import "./Profile.css"
import ImageModal from "./ImageModal.js"

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            //Default image
            profileImage: 'https://th.bing.com/th/id/R.8f185ac6c4a78763aa31acf73ee3e46b?rik=X7w93PUB4j3AXg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_568656.png&ehk=YMUL5OvijifwVr2xWFpqoEf4STb07PZwQdnl0ispWMc%3d&risl=&pid=ImgRaw&r=0'
        }
    }

    //Array of URL images
    imgArray = ['https://images.onlinelabels.com/images/clip-art/GDJ/Female%20Avatar%203-277087.png',
                'https://cdn3.iconfinder.com/data/icons/professions-1-4/132/16-512.png',
                'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Chef-512.png'];

    getUserName(){
        const email = this.props.email;
        const parseEmail = email.split('@');
        const userName = parseEmail[0];
        return userName;
    }
    
    handlerImageChange = (profileImage) => {
        this.setState({
            profileImage
        });
    }

    render(){
        return (
            <div className="profile">
                <div className="userBox">
                    <div className="AvatarImage">
                        <Avatar size={140} src={this.state.profileImage}/>
                    </div>
                    <ImageModal handlerImageChange={this.handlerImageChange} pic1={this.imgArray[0]}
                    pic2={this.imgArray[1]} pic3={this.imgArray[2]}/>
                    <div className="welcomeUser">
                        Welcome {this.getUserName()}!
                    </div>
                </div>
            </div>
    
        );
    }
}

function mapStateToProps(state){
    return{
        email: state.user.email
    };
}

export default connect(mapStateToProps)(Profile);