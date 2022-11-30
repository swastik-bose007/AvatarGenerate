import { useState } from "react";


let apiUrl = "https://robohash.org";

const RobotAvatar = () => {
  const [userInput, setuserInput] = useState("");
  const [imagesUrls, setImagesUrls] = useState([]);

  function handleInputChange(evt) {
    let text = evt.target.value;
    setuserInput(text);
  }

  async function fetchImg() {
    let url = `${apiUrl}/${userInput}`;
    let response = await fetch(url);
    let imgBlog = await response.blob();
    let imgUrl = URL.createObjectURL(imgBlog);
    return imgUrl;
  }

  function handleGenerate(evt) {
    fetchImg().then((url) => {
      setImagesUrls([...imagesUrls, { url, userInput }]);
    });
  }
  function removeImg(imageToRemove, index) {
    let filteredImgs = imagesUrls.filter((img, index) => {
      return img.url !== imageToRemove.url;
    });
    setImagesUrls([...filteredImgs]);
  }
  return (
    <>
      <div className="container pb-5">
        <div className="row">
          <div className="col-4">
            <nav class="navbar">
              <div class="container-fluid">
                <span class="navbar-brand mb-0 py-3 h1 font-st">Avatar<span className="G">G</span></span>
              </div>
            </nav>
          </div>
          <div className="col-6 col-md-5 pt-3">
            
            <input
              type="text"
              className="form-control textInputStyle morph"
              onChange={handleInputChange}
              value={userInput}
              placeholder="Enter string"
            />
            
            
          </div>
          <div className="col-2 d-flex justify-content-start align-items-center px-0 mx-0">
          <button
              className="btn adjust-btn d-flex justify-content-center align-items-center"
              onClick={handleGenerate}
            >
              <i class="ri-user-add-line p-1"></i>
            </button>
          </div>
        </div>
        <div className="row bootlist">
          {imagesUrls.map((img, index) => (
            <div
              key={`${img.url + img.userInput}`}
              className="col-6 col-md-4 col-lg-3 proper"
            >
            <figure className="my-4">
                <img src={img.url} width="100%" height="100%" className="botimage" />
                <figcaption className="d-flex justify-content-between align-items-center font-st pt-2">
                    <span>{img.userInput}</span>
                    <span onClick={() => {
                          removeImg(img, index);
                    }} style={{ cursor: "pointer" }}>
                        <i class="ri-delete-bin-5-fill bg-red p-2"></i>
                    </span>
                </figcaption>
            </figure>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default RobotAvatar;
