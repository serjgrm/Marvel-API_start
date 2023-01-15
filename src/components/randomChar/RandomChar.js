import {Component} from 'react'

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {
    constructor(props){
        super(props);
        this.updateChar();
    }
    state = {
        char:{},
        loading: true,
        error: false
    }
    onError = () =>{
        this.setState({
            loading: false,
            error: true
        })
    }

    marvelService = new MarvelService();
    onCharLoaded = (char) => {
        // this.setState({char: char}) 
        this.setState({
            char,
            loading:false
        })
    }
    updateChar = ()=>{
        const id = Math.floor(Math.random() * (1011400-1011000) +1011000);
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }
    render (){

        let {loading,error,char} = this.state;   

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char})=>{

    let {name,description, thumbnail, homepage, wiki} = char;

    if (!description){
        description = 'We dont have description now))) Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo labore deleniti, culpa doloremque beatae porro voluptas debitis modi ullam vel, quae nostrum nesciunt explicabo ad aut! Expedita magnam laboriosam sint!'
    }   if (description.length > 45){
        description = description.slice(0,45) + '...'
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;