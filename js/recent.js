$(function (){

   let currentPage = 0;
   const pageNumLength = $(".numBtns button.pageNum").length;

   function getData(page){
      let getDatas = [];
      $.ajax({
         url:'https://yts.mx/api/v2/list_movies.json?sort_by=download_count&order_by=desc&limit=10&page=' + page,
         success:function(data){
            // console.log(data.data.movies[0].title);
            for(let i = 0; i < data.data.movies.length; i++){
               if(data.data.movies[i].title == ''){
                  data.data.movies[i].title = 'No Title';
               }
               let popularHTML = `<div class="Download-movies">
                                    <a href="${data.data.movies[i].url} " class="movie-link-D">
                                       <figure>
                                          <img src="${data.data.movies[i].medium_cover_image}" alt="" width="210" height="300">
                                          <figcaption class="hidden">
                                             <span class="rating">
                                             <i class="fa fa-star"></i>
                                             ${data.data.movies[i].rating} / 10
                                             </span>
                                             <h4>${data.data.movies[i].genres[1]}</h4>
                                             <h4>${data.data.movies[i].genres[2]}</h4>
                                             <span class="detailBtn">View Detail</span>
                                          </figcaption>
                                       </figure>
                                       <h3>${data.data.movies[i].title}</h3>
                                    </a>
                                 </div>`;
                                 getDatas += popularHTML;
            }
            $(".Download-movie-wrap").append(getDatas);
         }
      });
     currentPage = page;
     //console.log(typeof(page));
   }
   $(".numBtns button.pageNum").click(function(){
      let btnValue = Number($(this).attr('value'));
      //console.log(btnValue);
      $(".Download-movies").remove();
      $(".loading").show();
      getData(btnValue);

      let btnIdx = $(this).index();

      $(".numBtns button").removeClass("active");
      $(".numBtns button").eq(btnIdx).addClass("active");
   });

   function goToPrevNext(a,b){
      if(currentPage == a){
         return false;
      } else {
         $(".Download-movies").remove();
         getData(b);
         $(".loading").show();
         $(".numBtns button").removeClass("active");
         $(".numBtns button").eq(currentPage).addClass("active");
      }

   }

   $(".numBtns button.prev").click(function(){
      goToPrevNext(1, currentPage - 1);
   });

   $(".numBtns button.next").click(function(){
      goToPrevNext(pageNumLength, currentPage + 1);
   });

   // getData(1);
   $(".numBtns button").eq(1).trigger("click");

   $(document).ajaxComplete(function(){
      $(".loading").hide();
   })
});