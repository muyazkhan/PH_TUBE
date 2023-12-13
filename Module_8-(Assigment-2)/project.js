
const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};

const displayData = data => {
  const CategoryContainer = document.getElementById("category");
  CategoryContainer.innerHTML = '';
  data.forEach((categ) => {
      const catMenu = document.createElement("div");
      catMenu.innerHTML = `
          <li class="nav-item btn btn-secondary btn-sm m-2">
          <a class="nav-link text-white" href="#" onclick="displayProduct('${categ.category_id}')">${categ.category}</a>
          </li>
      `;
      CategoryContainer.appendChild(catMenu);
  })
}
loadData()

const displayProduct = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await response.json();
    displayProductDetails(data.data);
    if (!data.status) {
      display404();
    } else {
      displayProductDetails(data.data);
    }
  } catch {
    (error) => {
      console.log(error);
    };
  }
};

displayProduct(1000);



const displayProductDetails = (contentList) => {
  const displayContainer = document.getElementById("display");
  displayContainer.innerHTML = "";

  function formatDuration(seconds) {
    const formattedTime = new Date(seconds * 1000).toISOString().substr(11, 8);
    return formattedTime;
  }

  for (const content of contentList) {
    const cardHtml = `
        <div class="col mt-3">
            <div class="card h-80">
                <img src="${content.thumbnail}" class="card-img-top" style="width: 100%; height: 250px; object-fit: cover;" alt="${content.title}">
                <div class="card-body border-none">
                    <div class="d-flex align-items-center">
                        <img src="${content.authors[0].profile_picture}" style="width: 70px; height: 70px; padding:5px;" class="rounded-circle" alt="${content.authors[0].profile_name}">
                        <div class="card-img-overlay">
                            <div class="d-flex">
                            <h5 class="card-title text-sm fw-normal text-white bg-dark bg-opacity-25" style="display: inline; margin-right: 5px; align-self: flex-end;">${content.others.posted_date !== "" ? formatDuration(content.others.posted_date)+' ago'  : ""}</h5>
                            </div>
                        </div>
                        <div>
                            <h5 class="card-title fw-bold">${content.title}</h5>
                            <div class="d-flex">
                                <p class="card-text fw-light">${content.authors[0].profile_name}</p>
                                <p class=" px-4">${content.authors[0].verified ? '<i class="fa-solid fa-circle-check" style="color: #008000;"></i>' : ""}</p>
                            </div>
                            <p class="card-text">${content.others.views} Views</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = cardHtml;
    displayContainer.appendChild(tempContainer.firstElementChild);
}
};



const display404 =() =>{
  const displayContainer = document.getElementById("display");

  const card = document.createElement("div");
  card.innerHTML = `
          <div class="d-flex align-items-center justify-content-center" style="height: 80vh;">
          <div class="mx-auto text-center" style="width: 10rem;">
              <img src="./image/Icon.png" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title"> Oops!! Sorry,There is no content here</h5>
              </div>
          </div>
      </div>
  `
  displayContainer.appendChild(card);
};



const Sort = async() =>{
  try{
  const url ="https://openapi.programming-hero.com/api/videos/category/1000"
  const res = await fetch(url)
  const data = await res.json();
  
  const Convert = data.data.map(val=>{
           const views = parseFloat(val.others.views.replace('K',''))  * 1000;
           return { ...val, others: { ...val.others,views } }
       })
  const ShortedVideos = Convert.sort((a, b) => b.others.views - a.others.views);
  displayProductDetails(ShortedVideos)
  }
  catch(er){
   console.error(er);
  }
  
}




