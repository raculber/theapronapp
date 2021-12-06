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
            profileImage: this.props.image
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
                <div className="label">
                        My Favorite Recipes / Calendar (Missing)
                </div>
                <div className="userBox">
                    <div className="AvatarImage">
                        <Avatar size={140} src={this.getUserImage()}/>
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
        email: state.user.email,
        image: state.user.image
    };
}

function mapDispatchToProps(dispatch){
    return{
        image: dispatch.user.image
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);