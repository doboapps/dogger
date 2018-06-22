import React, { Component } from 'react'
import { Carousel, CarouselItem,  CarouselCaption} from 'reactstrap'
import dog_a from '../../images/carousel/dog-a.jpg'
import dog_b from '../../images/carousel/dog-b.jpg'
import dog_c from '../../images/carousel/dog-c.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss'

const items = [
  { src: dog_a,
    caption: 'Welcome to Dogger' },
  { src: dog_b,
    caption: 'the first social network ...' },
  { src:dog_c,
    caption: '... for your dog'
  }
]

class Landing extends Component {  
  
    state = { activeIndex: 0 }

  onExiting = () =>{
    this.animating = true
  }

  onExited = () => {
    this.animating = false
  }

  next = () => {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous = () => {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex = newIndex => {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render = () => {
    const { activeIndex } = this.state

    const slides = items.map((item) => {
          return (
            <CarouselItem
              onExiting={this.onExiting}
              onExited={this.onExited}
              key={item.src}>
                <img src={item.src} alt={item.altText} className="img-fluid" />
                <CarouselCaption captionText="" captionHeader={item.caption} />
            </CarouselItem>
          )
        })

    return (<div>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          keyboard={false}
          pause={false}
          ride="carousel"
          interval="3000"
          slide={false}
          className="carousel-fade">
          {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> */}
          {slides}
        </Carousel>
      </div>)
  }
}

export default (Landing)

