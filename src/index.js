import React, {Component} from 'react'
import {render} from 'react-dom'
import PropTypes from 'prop-types'

let bookList =[
  {"title": "the sun also rises", "author": "Ernest Heminghway", "pages": 260 },
  {"title": "patas arribas", "author": "Eduardo Galeano", "pages": 260 },
  {"title": "Black tomatoes", "author": "Forest Gardens", "pages": 560 },
]

const Book = ({title= "no title provide", author="no author", pages=0, freeBookmark}) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>by: {author}</p>
      <p>Pages: {pages} pages</p>
      <p>free Bookmark Today: {freeBookmark ? 'yes!' : 'no!' }</p>
    </section>
  )
}
const Hiring = () => 
  <div>
    <p> The library is hiring. Go to www.libray.com/jobs for more. </p>
  </div>

const NotHiring = () => 
  <div>
    <p> The library is not hiring. Check back later for more info. </p>
  </div>
 
class Library extends React.Component{
    static defaultProps ={
      books: [
        {"title": "Tahoe tales", "author": "Chet white", "pages": 1000}
      ]
    }
  
  state = {
    open: true,
    freeBookmark: false,
    hiring: true,
    data: [],
    loading: false
  }
componentDidMount(){  //helpful in fetching data
  this.setState({loading: true})
  fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
    .then(data => data.json())
    .then(data => this.setState({data, loading: false}))
}
componentDidUpdate(){
  console.log("the component is updated it!")
}
  toggleOpenClosed = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }))

  }
  render(){
    const {books} = this.props
    return (
      <div>
        {this.state.hiring ? <Hiring /> : < NotHiring />}
        {this.state.loading
          ? "loading..."
        : <div> 
            {this.state.data.map(product => {
                return (
                  <div key ={product.id}>
                    <h3> Library Product of the Week!</h3>
                    <h4>{product.name}</h4>
                    <img alt = {product.name} src= {product.image} height = {100}/>
                  </div>
                )
            })}
         </div>
       }
        <h1>The Library is {this.state.open ? 'open' : 'closed'}</h1>
        <button onClick={this.toggleOpenClosed}>Change</button>
         {books.map(
           (book, i)=> 
            < Book 
              key = {i}
              title={book.title} 
              author={book.author}
              pages={book.pages} 
              freeBookmark={this.state.freeBookmark}/>
        )}


      </div>
    )
  }
}

Library.propTypes = {
  books: PropTypes.array
}
Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  pages: PropTypes.number,
  freeBookmark: PropTypes.bool
}

render (
  < Library books={bookList} />,
document.getElementById('root')
)
