import { posts } from "./db.js"; 

let userLike = [];

const container = document.getElementById('container');

posts.forEach( post => container.innerHTML += getPostTemplate(post) )



/************  FUNCTIONS *************/

function getPostTemplate(post){
    const {id, content, media, author, likes, created} = post;
    return `
    <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                       ${author.image ? getAuthorImage(author) :  getAuthorInitials(author)}
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${getDateFormat(created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="${author.name}">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button ${isPostLike(id) ? 'like-button--liked' : ''}" href="#">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    
    `
}

function isPostLike(id){
    return userLike.includes(id);
}

function getDateFormat(date){
    return date.split('-').reverse().join('/');
}

function getAuthorImage(author){
    const {name, image} = author
    return `<img class="profile-pic" src="${image}" alt="${name}"> `
}

function getAuthorInitials(author){
    const { name } = author;

    const letters = name.split(' ').map( (nameSplit) => {
        console.log(nameSplit);
        console.log(nameSplit.charAt(0));
        return nameSplit.charAt(0)
    } );

    console.log(letters);

    const initials = letters.join('');

    return `<div class="profile-pic-default">
                <span>${initials}</span>
            </div>`
}

// prendo tutti i bottoni ed i contatori dei like
const likeButtons = document.querySelectorAll('.js-like-button');
const likeCounters = document.querySelectorAll('.js-likes-counter');

// ciclo per mettere l'eventListener ai bottoni
likeButtons.forEach((btn, index) => {
    btn._id = posts[index].id;
    btn._index = index;
    btn.addEventListener('click', handlerLikeBtn)
})


function handlerLikeBtn(event){

    event.preventDefault();
    this.classList.toggle('like-button--liked');
    const postSelected = posts.find( post => post.id === this._id);

    if(userLike.includes(this._id)){
        userLike = userLike.filter( likeId => likeId !==  this._id);
        postSelected.likes--;
    } else {

        postSelected.likes++;
        userLike.push(this._id);
    }

    likeCounters[this._index].innerText = postSelected.likes;
}