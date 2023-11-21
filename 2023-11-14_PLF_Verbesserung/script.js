
const h2Elements = document.querySelectorAll('div.news-articles  h2');
h2Elements.forEach(h2 => {
  h2.addEventListener('click', (e) => {
    //for the clicked article
    let parents = e.target.parentElement;
    let kids = parents.children;
    let clickedHeadLine = kids[0];
    clickedHeadLine.opened = !clickedHeadLine.opened;
    //for all articles
    h2Elements.forEach(newsArticle => {
      let parent = newsArticle.parentElement;
      if(parent != parents){
        let parOfNews = parent.children;
        let HeadLine = parOfNews[0];
        HeadLine.opened = !HeadLine.opened;
        HeadLine.opened = false;
        HeadLine.style.visibility = 'visible';
        HeadLine.style.position = 'static';
        for(let i = parOfNews.length - 1; i > 0; i--){ 
          parOfNews[i].style.visibility = 'hidden';
          parOfNews[i].style.position = 'absolute';
        }
        parent.style.backgroundColor = '#5a8bc4';
        parent.style.color = 'white';
      }
    });
    if(clickedHeadLine.opened==true){
      clickedHeadLine.style.visibility = 'visible';
      clickedHeadLine.style.position = 'static';
      parents.style.backgroundColor = 'white';
      parents.style.color = 'black';  
      for(let i = kids.length - 1; i > 0; i--){
        kids[i].style.visibility = 'visible';
        kids[i].style.position = 'static';
      }
    }
    else if(clickedHeadLine == false){
      parents.style.backgroundColor = '#5a8bc4';
      parents.style.color = 'white';
      for(let i = kids.length - 1; i > 0; i--){
        kids[i].style.visibility = 'hidden';
        kids[i].style.position = 'absolute';
      }
    }
  });
}); 
