$(function(){

// $(document).ready(function(){
//    $(document).on('click', '.tabs li', function(){
//      $(".tabCon-movies").remove();  
//      let genArr = ['action', 'animation', 'adventure', 'romance', 'fantasy'];
//      $(".tabs li").removeClass("active");
//      $(this).addClass("active");
//      let genIndex = $(this).index();
//      getGenre(genArr[genIndex],'.' + genArr[genIndex] + '-contents');
//    });
 

   function getGenre(gen, box){
      let getGenres = [];
      $.ajax({
         url: 'https://yts.mx/api/v2/list_movies.json?genre='+gen+'&page=1&limit=15',
         success : function(data){
            console.log(data);
            for(let i = 0; i < data.data.movies.length; i++){
               
               let genreHTML = `<div class="moviebox">
                                    <a href="${data.data.movies[i].url}" class="movie-link-T">
                                       <figure>
                                          <img src="${data.data.movies[i].medium_cover_image}" alt="" onError="this.src='./img/no-image.png';" width="210" height="300">
                                          <figcaption class="hidden">
                                             <span class="rating">
                                             <i class="fa fa-star"></i>
                                             ${data.data.movies[i].rating} / 10
                                             </span>
                                             <h4>${data.data.movies[i].genres[0]}</h4>
                                             <h4>${data.data.movies[i].genres[1]}</h4>
                                             <span class="detailBtn">View Detail</span>
                                          </figcaption>
                                       </figure>
                                       <h3>${data.data.movies[i].title}</h3>
                                    </a>
                                 </div>`;
                                 getGenres += genreHTML;
            }
            $(box).append(getGenres);
            
         }
      });
    
      

   }
   
   getGenre('action', '.action-contents');
   getGenre('animation', '.animation-contents');
   getGenre('comedy', '.comedy-contents');
   getGenre('romance', '.romance-contents');
   getGenre('fantasy', '.fantasy-contents');
   
   //Tab Click 
   $(".tabs li").click(function(){
      $(".tabs li").removeClass("active");
      $(this).addClass("active");
      
      var index = $(this).index();
      
      $(".tabConbox").hide();
      $(".tabConbox").eq(index).show();

      
   });

   $(document).ajaxComplete(function(){
      $(".loading").hide();
   });
});