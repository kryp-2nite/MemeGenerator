import React, { Component } from 'react'
import "./style.css";

 class index extends Component {

    constructor() {
        super()
        this.state = {
           topText: "",
           bottomText: "",
           randomImage: "http://i.imgflip.com/1bij.jpg",
           allMemeImages: [],
        }
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({allMemeImages: memes})
        })
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNumber = Math.floor(Math.random() * this.state.allMemeImages.length)
        const randMemeImage = this.state.allMemeImages[randNumber].url
        this.setState({randomImage: randMemeImage})
    }

    render() {
        return (
            <div className="meme__container">
                <form className="meme__form" onSubmit={this.handleSubmit}>

                <input  className="form__text" 
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={this.state.topText}
                    onChange={this.handleChange}
                />
                <input   className="form__text" 
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={this.state.bottomText}
                    onChange={this.handleChange}
                />

                <button className="button">Generate</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImage}/>
                    <h2 className="top" >{this.state.topText}</h2>
                    <h2 className="bottom" >{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}


export default index
