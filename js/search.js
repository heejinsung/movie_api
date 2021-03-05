$(function () {

   let searchValue = document.location.href.split("=")[1];
   let decodeValue = decodeURI(searchValue);
   console.log(decodeValue);

   $.ajax({
      type:"POST",
      url:"/movie_api/data/api.php",
      data : {
         search_value : decodeValue,
      },
      success: function (data) {
         let obj = JSON.parse(data);
         //console.log(obj);
         //console.log(obj.items);

         if(obj.items.length == 0){
            alert("데이터가 없습니다.");
            location.href="/movie_api/index.html";
         }

         let itemContents = [];
         $.each(obj.items, function(i, item){
            console.log(item);
            let itemHTML = `<div class="item">
                              <a href="${item.link}" class="movie-link">
                                 <figure>
                                    <img src="${item.image}" alt="" width="190" height="250" onError="this.src='./img/no-image.png';">
                                    <figcaption class="hidden">
                                       <span class="rating">
                                          <i class="fa fa-star"></i>
                                          ${item.userRating} / 10
                                       </span>
                                       <h4>${item.pubDate}</h4>
                                       <span class="detailBtn">View Detail</span>
                                    </figcaption>
                                 </figure>
                              </a>
                              <div class="movie-bottom">
                                 <a href="#">
                                 ${item.title}
                                 </a>
                              </div>
                           </div>`;
            itemContents.push($(itemHTML).get(0));
         });
         $(".item-sizer").append(itemContents);
      },
   });
});