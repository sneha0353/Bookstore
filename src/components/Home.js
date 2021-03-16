import React from "react"
import {Parallax} from "react-parallax"
import Navbar from "./Navbar"
import b1 from "./images/b1.jpg"
import b2 from "./images/b2.jpg"
import b3 from "./images/b3.jpg"
import b5 from "./images/b5.jpg"
import b7 from "./images/b7.jpg"
import b8 from "./images/b8.jpg"
import b9 from "./images/b9.webp"
import b10 from "./images/b10.jpg"
import c1 from "./images/c1.jpeg"
import dd from "./images/dd.jpg"
import d2 from "./images/d2.jpg"
import h1 from "./images/h1.png"
import h2 from "./images/h2.png"
import y1 from "./images/y1.gif"
import book1 from "./images/book1.jpg"
import book2 from "./images/book2.jpeg"
import book3 from "./images/book3.jpg"
import book4 from "./images/book4.jpg"
import book5 from "./images/book5.jpg"

const Home=()=>{

     //const user=localStorage.getItem("user")
    return (
        <div>
        <Navbar/>
        <h1 className="text-white">hello</h1>
        <h1 className="text-center p-2 mt-3 mb-3" id="dec">In search for the next best book</h1>

        <div id="carouselExampleFade" className="carousel container slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-interval='1000'>
                <img src={b1} style={{width:"50%",height:"600px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval='2000'>
                <img src={b2} style={{width:"100%",height:"600px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval='2000'>
                <img src={b3} style={{width:"100%",height:"600px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval='2000'>
                <img src={b5} style={{width:"100%",height:"600px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval='2000'>
                <img src={b7} style={{width:"100%",height:"600px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval='2000'>
                <img src={b8} style={{width:"100%",height:"600px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval='2000'>
                <img src={b9} style={{width:"100%",height:"600px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" data-interval='2000' >
                <img src={b10} style={{width:"100%",height:"600px"}} className="d-block w-100" alt="..." />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        <br/><br/>
        <h1 className='text-center mb-5' id='font'><u>Sections To Visit</u></h1>
        <Parallax
            bgImage={c1}
            bgImageAlt="the cat"
            strength={500}
            style={{height:"900px",width:"50%",marginLeft:"25%"}}
        >
            <div className="container  ml-3" style={{marginTop:"150px"}}>
            <div className="row d-flex justify-content-around mt-5">
            <div className="col-md-6 mt-2">
                <div className="card bg-warning" style={{width: "18rem"}}>
                    <img className="card-img-top" src={dd} width='100%' alt="Card cap"/>
                    <div className="card-body">
                    <a href="/product/user" className="btn ml-4 pl-3"><b style={{fontSize:"20px"}}>Products Section</b></a>
                </div>
            </div>
            </div>
            <div className="col-md-6 mt-2">
            <div className="card bg-success" style={{width: "18rem"}}>
                    <img className="card-img-top" src={d2} style={{height:'190px'}}  alt="Card cap"/>
                    <div className="card-body">
                    <a href="/order" className="btn ml-4 pl-3"><b style={{fontSize:"20px"}}>Orders Section</b></a>
                </div>
            </div>
            </div>
            </div>
            <div className="row d-flex justify-content-around mt-5">
            <div className="col-md-6 mt-5">
            <div className="card bg-light" style={{width: "18rem"}}>
                    <img className="card-img-top" src={h2} width='70%' style={{height:'175px'}} alt="Card  cap"/>
                    <div className="card-body">
                    <a href="/profile" className="btn ml-4 pl-3"><b style={{fontSize:"20px"}}>Profile Section</b></a>
                </div>
            </div>
            </div>
            <div className="col-md-6 mt-2 mt-5">
            <div className="card bg-dark" style={{width: "18rem"}}>
                    <img className="card-img-top" src={h1} width='100%' style={{height:"177px"}} alt="Card cap"/>
                    <div className="card-body">
                    <a href="/allusers" className="btn ml-4 pl-3"><b className="text-white" style={{fontSize:"20px"}}>Users Section</b></a>
                </div>
            </div>
            </div>
            </div>
            </div>
            <div style={{ height: '200px' }} />
        </Parallax>
        <br/><br/>
        <h1 className="text-white text-center mt-5" id="hue"><u>What I'm Reading Now?</u></h1>
        <br/>
        <Parallax
            bgImage={y1}
            bgImageAlt="the cat"
            strength={900}
            style={{width:'100%',height:"1000px",marginTop:"40px"}}
        >
        <div>
        <p id="write">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div id="carouselExampleIndicators" className="carousel slide mb-3" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div className="carousel-inner container " style={{width:'400px'}}>
          <div className="carousel-item active mt-5 ">
            <img className="d-block w-100" src={book1} alt="First slide" style={{width:"30%",height:'600px'}} />
          </div>
          <div className="carousel-item mt-5 ">
            <img className="d-block w-100" src={book2} alt="Second slide" style={{width:"30%",height:'600px'}} />
          </div>
          <div className="carousel-item mt-5"> 
            <img className="d-block w-100" src={book3} alt="Third slide" style={{width:"30%",height:'600px'}} />
          </div>
          <div className="carousel-item mt-5 ">
            <img className="d-block w-100" src={book4} alt="Third slide" style={{width:"30%",height:'600px'}}/>
          </div>
          <div className="carousel-item mt-5 ">
            <img className="d-block w-100" src={book5} alt="Third slide" style={{width:"30%",height:'600px'}}/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
            <div style={{ height: '200px' }} />
        </Parallax>
        </div>
    )
}

export default Home
