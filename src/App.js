import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import axios from "axios";
import react, { useState, useEffect } from "react";
// const gif = 'api.giphy.com/v1/gifs/trending';
function App() {
  const [giphData, setGiphdata] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectedGif, setSelectedGif] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [comment, setComment] = useState([]);
  const [displayComment, setDisplayComment] = useState([]);
  const [commentedGif, setCommentedGif] = useState([]);

  const giphy = async () => {
    setShowGif(true);
    const datas = await axios({
      method: "GET",
      url: "https://api.giphy.com/v1/gifs/trending",
      params: {
        api_key: "n97xv8NK807chqzsJIbFQbwJzSDSPOXH",
      },
    });
    console.log(datas);
    setGiphdata(datas.data.data);
  };
  // console.log(giphData);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(selectedGif);

  const addGif = () => {
    console.log(selectedGif);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchGif = await axios({
      method: "get",
      url: "https://api.giphy.com/v1/gifs/search",

      params: {
        api_key: "n97xv8NK807chqzsJIbFQbwJzSDSPOXH",
        q: search,
      },
    });
    console.log(searchGif);
    setGiphdata(searchGif.data.data);
  };

  const getGif = (e) => {
    console.log(e.target.elem);
    setSelectedGif(e.target.src);
    // setShowGif(false);
  };

  const handleComment = (e) => {
    // console.log(e.target.value)
    setComment(e.target.value);
  };
  const handlePost = () => {
    console.log(comment);
    let newComment = displayComment;
    newComment.push(comment);
    setDisplayComment([newComment]);

    let newGif = commentedGif;
    newGif.push(selectedGif);
    setCommentedGif([newGif]);
    console.log(commentedGif);
  };

  return (
    <>
      <header>
        <div className="container">
          <ul>
            <li>
              <a className="color-white">
                Home
              </a>
            </li>
            <li>
              <a className="color-white">
                About Us
              </a>
            </li>
            <li>
              <a  className="color-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </header>
      <section className="comments_section">
        <div className="container">
          <div className="in_comments">
            <div className="buttons">
              <a href="#">Comments</a>
            </div>
            <div className="input_area">
              <textarea
                id="comment_area"
                rows="4"
                cols="1000"
                placeholder="Write something..."
                onChange={handleComment}
              ></textarea>
            </div>
            <div className="features_buttons">
              <ul className="right_options">
                <li>
                  <a onClick={giphy} id="gif">
                    GIF
                  </a>
                  {showGif ? (
                    <div id="gif_display">
                      <form>
                        <input
                          type="text"
                          value={search}
                          placeholder="search"
                          onChange={handleSearch}
                        />
                        <button type="submit" onClick={handleSubmit}>
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </form>
                      <ul className="flex_wrapper" id="gif_list">
                        {giphData.map((elem) => {
                          console.log(elem);
                          return (
                            <li key={elem.id}>
                              <img
                                src={elem.images.fixed_height.url}
                                onClick={getGif}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </li>
                <li>
                  <a href="#" id="tag_friends">
                    Tag a friend
                  </a>
                </li>
              </ul>

              <ul className="left_options">
                <li>
                  <a  id="checkIn">
                    Check In
                  </a>
                </li>
                <li>
                  <a  id="events">
                    Events
                  </a>
                </li>
              </ul>
            </div>
            <div className="post_comment">
              <button id="post" onClick={handlePost}>
                Post
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="comments">
        <div className="container">
          <div className="view_comments">
            <ul className="flex_wrapper" id="comment_list">
              {displayComment.map((item, idx) => {
                console.log(item);
                return (
                  <li key={item} scope="col" className="showComment">
                    {item}
                    <div className="flex_wrapper">
                      {<img src={commentedGif} className="gifShown"/>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="in_footer">
            <div className="logo"></div>
            <div className="copyright">
              <p>© 2013 - 2022, Codemancers Technologies Private Limited</p>
            </div>
            <div className="social_media">
              <ul>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
